<?php

namespace App\Controller;

use Dompdf\Dompdf;
use Stripe\Stripe;
use Dompdf\Options;
use App\Entity\User;
use App\Entity\Order;
use App\Entity\Address;
use App\Entity\OrderLine;
use Stripe\PaymentIntent;
use App\Service\EmailService;
use App\Entity\PromotionalCode;
use App\Repository\AddressRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\PaymentMethodRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\ProductTranslationRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class PaymentController extends AbstractController
{
    public function __construct(
        private ParameterBagInterface $params,
        private EntityManagerInterface $entityManager,
        private EmailService $emailService
    ) {
    }

    #[Route('/api/payment/stripe', name: 'api_payment_stripe', methods: ['POST'])]
    public function payWithStripe(
        Request $request,
        AddressRepository $addressRepository,
        PaymentMethodRepository $paymentMethodRepository,
        ProductRepository $productRepository,
        ProductTranslationRepository $productTranslationRepository,
    ): JsonResponse {
        $this->denyAccessUnlessGranted('ROLE_USER');

        /** @var User $user */
        $user = $this->getUser();

        $data = json_decode($request->getContent(), true);
        $data = json_decode($data, true);

        $addressId = $data['addressId'] ?? null;
        $paymentMethodId = $data['paymentMethodId'] ?? null;
        $products = $data['products'] ?? null;
        $amount = $data['amount'] ?? null;
        $currency = $data['currency'] ?? 'eur';
        $locale = $data['locale'] ?? 'en-GB';
        $promotionalCodes = $data['promotionalCodes'] ?? [];

        if (!$addressId || !$paymentMethodId || !$amount || !$products) {
            return new JsonResponse(['error' => 'missing data'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $address = $addressRepository->findOneBy(['id' => $addressId, 'user' => $user]);
        if (!$address) {
            return new JsonResponse(['error' => 'invalid address'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $paymentMethod = $paymentMethodRepository->findOneBy(['id' => $paymentMethodId, 'user' => $user]);
        if (!$paymentMethod) {
            return new JsonResponse(['error' => 'invalid paymentMethod'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $verifiedAmount = 0;

        foreach ($products as $product) {
            if (!isset($product['id']) || !isset($product['quantity'])) {
                return new JsonResponse(['error' => 'invalid products'], JsonResponse::HTTP_BAD_REQUEST);
            }

            $productTranslation = $productTranslationRepository->find($product['id']);
            if (!$productTranslation || !$productTranslation->getProduct() || !$productTranslation->getProduct()->isDisponibility()) {
                return new JsonResponse(['error' => 'invalid products'], JsonResponse::HTTP_BAD_REQUEST);
            }

            if ($productTranslation->getProduct()->isPromotionActive()) {
                $verifiedAmount += $productTranslation->getProduct()->getPromotionPrice() * $product['quantity'] * 100;
            } else {
                $verifiedAmount += $productTranslation->getProduct()->getPrice() * $product['quantity'] * 100;
            }
        }

        $discountAmount = 0;
        foreach ($promotionalCodes as $promo) {
            if (!isset($promo['id']) || !isset($promo['isPercent']) || !isset($promo['promotion'])) {
                return new JsonResponse(['error' => 'invalid promotional code'], JsonResponse::HTTP_BAD_REQUEST);
            }

            $promoEntity = $this->entityManager->getRepository(PromotionalCode::class)->find($promo['id']);

            if (!$promoEntity) {
                return new JsonResponse(['error' => 'invalid promotional code'], JsonResponse::HTTP_BAD_REQUEST);
            }

            if (intval($promoEntity->getPromotion()) !== intval($promo['promotion']) || $promoEntity->isPercent() !== $promo['isPercent']) {
                return new JsonResponse(['error' => 'invalid promotional code'], JsonResponse::HTTP_BAD_REQUEST);
            }

            if ($promoEntity->isPercent()) {
                $amountWithPromotion = intval($verifiedAmount - $discountAmount);
                $percent = intval($promoEntity->getPromotion()) / 100;
                $discountAmount += ($amountWithPromotion * $percent);
            } else {
                $discountAmount += $promoEntity->getPromotion() * 100;
            }
        }

        $finalAmount = intval($verifiedAmount - $discountAmount);
        
        if ($finalAmount != round($amount)) {
            return new JsonResponse(['error' => 'invalid amount'], JsonResponse::HTTP_BAD_REQUEST);
        }

        Stripe::setApiKey($this->getParameter('stripe_private_key'));

        try {
            $paymentIntent = PaymentIntent::create([
                'amount' => $amount,
                'currency' => $currency,
                'payment_method' => $paymentMethod->getStripePaymentMethodId(),
                'customer' => $user->getStripeCustomerId(),
                'confirm' => true,
                'automatic_payment_methods' => [
                    'enabled' => true,
                    'allow_redirects' => 'never',
                ],
            ]);

            $order = new Order();
            $order->setReference(uniqid('order_'));
            $order->setDate(new \DateTimeImmutable());
            $order->setStatus('paid');
            $order->setTotal($amount / 100);
            $order->setAddress($address->getAddress1() . ', ' . $address->getPostalCode() . ' ' . $address->getCity() . ', ' . $address->getCountry());
            $order->setCustomerName($user->getLastname() . ' ' . $user->getFirstname());
            $order->setCustomerEmail($user->getEmail());
            $order->setUser($user);
            $order->setPaymentMethod($paymentMethod);

            if ($discountAmount > 0) {
                $order->setPromotion(round($discountAmount / 100, 2));
            }

            foreach ($products as $product) {
                $productTranslation = $productTranslationRepository->find($product['id']);

                $orderLine = new OrderLine();
                $orderLine->setName($productTranslation->getName());
                $orderLine->setQuantity($product['quantity']);
                $orderLine->setPrice($productTranslation->getProduct()->getPrice());

                if ($productTranslation->getProduct()->isPromotionActive()) {
                    $orderLine->setPromotionPrice($productTranslation->getProduct()->getPromotionPrice());
                }

                $orderLine->setOrderRef($order);
                $order->addOrderLine($orderLine);

                $this->entityManager->persist($orderLine);
            }

            $this->entityManager->persist($order);
            $this->entityManager->flush();

            $html = $this->renderView("pdf/$locale/invoice.html.twig", [
                'order' => $order,
                'user' => $user,
            ]);

            $options = new Options();
            $options->set('defaultFont', 'Arial');
            $dompdf = new Dompdf($options);
            $dompdf->loadHtml($html);
            $dompdf->setPaper('A4', 'portrait');
            $dompdf->render();
            $pdfOutput = $dompdf->output();

            $pdfFilePath = sys_get_temp_dir() . '/invoice_' . $order->getReference() . '.pdf';
            file_put_contents($pdfFilePath, $pdfOutput);

            $this->emailService->sendInvoiceEmail($user, $order, $pdfFilePath, $locale);

            unlink($pdfFilePath);

            return new JsonResponse([
                'message' => 'success payment',
                'paymentIntentId' => $paymentIntent->id,
            ]);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
