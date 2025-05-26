<?php

namespace App\Controller;

use Dompdf\Dompdf;
use Stripe\Stripe;
use Dompdf\Options;
use App\Entity\User;
use App\Entity\Order;
use App\Entity\OrderLine;
use Stripe\PaymentIntent;
use App\Entity\Subscription;
use App\Service\EmailService;
use App\Entity\PromotionalCode;
use App\Repository\AddressRepository;
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
    ) {}

    #[Route('/api/payment/stripe', name: 'api_payment_stripe', methods: ['POST'])]
    public function payWithStripe(
        Request $request,
        AddressRepository $addressRepository,
        PaymentMethodRepository $paymentMethodRepository,
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

        if ($user->isPrenium()) {
            $amount = round($amount - ($verifiedAmount * 0.05));
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
                $category = $productTranslation->getProduct()->getCategory();

                if (!$category) {
                    $categoryName = 'no category';
                } else {
                    $categoryTranslation = $category->getCategoryTranslations()->filter(function ($translation) use ($locale) {
                        return $translation->getLocale()->getCode() === $locale;
                    })->first();

                    $categoryName = $categoryTranslation ? $categoryTranslation->getName() : $category->getCategoryTranslations()->first()->getName();
                }

                $orderLine = new OrderLine();
                $orderLine->setName($productTranslation->getName());
                $orderLine->setQuantity($product['quantity']);
                $orderLine->setPrice($productTranslation->getProduct()->getPrice());
                $orderLine->setCategory($categoryName);

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

    #[Route('/api/subscription/stripe', name: 'api_subscription_stripe', methods: ['POST'])]
    public function subscribeWithStripe(
        Request $request,
        AddressRepository $addressRepository,
        PaymentMethodRepository $paymentMethodRepository
    ): JsonResponse {
        $this->denyAccessUnlessGranted('ROLE_USER');

        /** @var User $user */
        $user = $this->getUser();

        $data = json_decode($request->getContent(), true);
        $data = json_decode($data, true);

        $addressId = $data['addressId'] ?? null;
        $paymentMethodId = $data['paymentMethodId'] ?? null;
        $subscription = $data['subscription'] ?? null;
        $currency = $data['currency'] ?? 'eur';
        $locale = $data['locale'] ?? 'en-GB';

        if (!$addressId || !$paymentMethodId || !$subscription) {
            return new JsonResponse(['error' => 'missing data'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $address = $addressRepository->findOneBy(['id' => $addressId, 'user' => $user]);
        if (!$address) {
            return new JsonResponse(['error' => 'invalid address'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $paymentMethod = $paymentMethodRepository->findOneBy(['id' => $paymentMethodId, 'user' => $user]);
        if (!$paymentMethod) {
            return new JsonResponse(['error' => 'invalid payment method'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $subscriptionEntity = $this->entityManager->getRepository(Subscription::class)->find($subscription['id']);
        if ($subscriptionEntity === null || !$subscriptionEntity->isActive() || $subscriptionEntity->getPrice() != $subscription['price']) {
            return new JsonResponse(['error' => 'invalid subscription'], JsonResponse::HTTP_BAD_REQUEST);
        }

        Stripe::setApiKey($this->getParameter('stripe_private_key'));

        try {
            \Stripe\PaymentMethod::retrieve($paymentMethod->getStripePaymentMethodId())->attach([
                'customer' => $user->getStripeCustomerId(),
            ]);

            \Stripe\Customer::update($user->getStripeCustomerId(), [
                'invoice_settings' => [
                    'default_payment_method' => $paymentMethod->getStripePaymentMethodId(),
                ],
            ]);

            $product = null;
            $productName = $subscription['title'];
            $existingProducts = \Stripe\Product::all(['limit' => 30]);
            foreach ($existingProducts->data as $existingProduct) {
                if ($existingProduct->name === $productName) {
                    $product = $existingProduct;
                    break;
                }
            }

            if (!$product) {
                $product = \Stripe\Product::create([
                    'name' => $productName,
                    'description' => 'Subscription: ' . $productName . ' - ' . $locale,
                ]);
            }

            $price = null;
            $existingPrices = \Stripe\Price::all(['product' => $product->id, 'limit' => 50]);
            foreach ($existingPrices->data as $existingPrice) {
                if ($existingPrice->unit_amount === $subscription['price'] * 100 && $existingPrice->currency === $currency) {
                    $price = $existingPrice;
                    break;
                }
            }

            if (!$price) {
                $duration = $subscription['duration'] == 1 ? 'month' : 'year';
                $price = \Stripe\Price::create([
                    'unit_amount' => $subscription['price'] * 100,
                    'currency' => $currency,
                    'recurring' => [
                        'interval' => $duration,
                    ],
                    'product' => $product->id,
                ]);
            }

            $stripeSubscription = \Stripe\Subscription::create([
                'customer' => $user->getStripeCustomerId(),
                'items' => [
                    ['price' => $price->id],
                ],
                'default_payment_method' => $paymentMethod->getStripePaymentMethodId(),
                'expand' => ['latest_invoice.payment_intent'],
            ]);

            $order = new Order();
            $order->setReference(uniqid('sub_'));
            $order->setDate(new \DateTimeImmutable());
            $order->setStatus('active');
            $order->setTotal($stripeSubscription->items->data[0]->price->unit_amount / 100);
            $order->setAddress($address->getAddress1() . ', ' . $address->getPostalCode() . ' ' . $address->getCity() . ', ' . $address->getCountry());
            $order->setCustomerName($user->getLastname() . ' ' . $user->getFirstname());
            $order->setCustomerEmail($user->getEmail());
            $order->setUser($user);
            $order->setPaymentMethod($paymentMethod);

            $orderLine = new OrderLine();
            $orderLine->setName($subscription['title']);
            $orderLine->setCategory('Subscription');
            $orderLine->setQuantity($subscription['duration']);
            $orderLine->setPrice($subscription['price']);
            $orderLine->setOrderRef($order);
            $order->addOrderLine($orderLine);

            $this->entityManager->persist($orderLine);
            $this->entityManager->persist($order);

            $user->setSubscriptionId($stripeSubscription->id);
            $user->setIsPrenium(true);

            $this->entityManager->persist($user);

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
                'message' => 'Subscription created successfully',
                'subscriptionId' => $stripeSubscription->id,
                'clientSecret' => $stripeSubscription->latest_invoice->payment_intent->client_secret,
            ]);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/api/stripe/webhook', name: 'stripe_webhook', methods: ['POST'])]
    public function handleStripeWebhook(Request $request): JsonResponse
    {
        $payload = $request->getContent();
        $sigHeader = $request->headers->get('Stripe-Signature');
        $secret = $this->getParameter($this->getParameter('stripe_webhook_secret'));

        try {
            $event = \Stripe\Webhook::constructEvent($payload, $sigHeader, $secret);

            switch ($event->type) {
                case 'invoice.payment_succeeded':
                    $invoice = $event->data->object;
                    $subscriptionId = $invoice->subscription;

                    $user = $this->entityManager->getRepository(User::class)->findOneBy(['subscriptionId' => $subscriptionId]);
                    if ($user) {
                        $previousOrder = $this->entityManager->getRepository(Order::class)->createQueryBuilder('o')
                            ->where('o.user = :user')
                            ->andWhere('o.status = :status')
                            ->andWhere('o.reference LIKE :referencePrefix')
                            ->setParameter('user', $user)
                            ->setParameter('status', 'active')
                            ->setParameter('referencePrefix', 'sub_%')
                            ->orderBy('o.date', 'DESC')
                            ->setMaxResults(1)
                            ->getQuery()
                            ->getOneOrNullResult();

                        if ($previousOrder) {
                            $newOrder = new Order();
                            $newOrder->setReference(uniqid('sub_'));
                            $newOrder->setDate(new \DateTimeImmutable());
                            $newOrder->setStatus('active');
                            $newOrder->setTotal($previousOrder->getTotal());
                            $newOrder->setAddress($previousOrder->getAddress());
                            $newOrder->setCustomerName($previousOrder->getCustomerName());
                            $newOrder->setCustomerEmail($previousOrder->getCustomerEmail());
                            $newOrder->setUser($user);
                            $newOrder->setPaymentMethod($previousOrder->getPaymentMethod());

                            foreach ($previousOrder->getOrderLines() as $previousOrderLine) {
                                $newOrderLine = new OrderLine();
                                $newOrderLine->setName($previousOrderLine->getName());
                                $newOrderLine->setQuantity($previousOrderLine->getQuantity());
                                $newOrderLine->setPrice($previousOrderLine->getPrice());
                                $newOrderLine->setPromotionPrice($previousOrderLine->getPromotionPrice());
                                $newOrderLine->setOrderRef($newOrder);

                                $newOrder->addOrderLine($newOrderLine);
                                $this->entityManager->persist($newOrderLine);
                            }

                            $this->entityManager->persist($newOrder);

                            $html = $this->renderView("pdf/en-GB/invoice.html.twig", [
                                'order' => $newOrder,
                                'user' => $user,
                            ]);

                            $options = new Options();
                            $options->set('defaultFont', 'Arial');
                            $dompdf = new Dompdf($options);
                            $dompdf->loadHtml($html);
                            $dompdf->setPaper('A4', 'portrait');
                            $dompdf->render();
                            $pdfOutput = $dompdf->output();

                            $pdfFilePath = sys_get_temp_dir() . '/invoice_' . $newOrder->getReference() . '.pdf';
                            file_put_contents($pdfFilePath, $pdfOutput);

                            $this->emailService->sendInvoiceEmail($user, $newOrder, $pdfFilePath, 'en-GB');

                            unlink($pdfFilePath);

                            $user->setIsPrenium(true);
                            $this->entityManager->persist($user);
                            $this->entityManager->flush();
                        }
                    }
                    break;

                case 'invoice.payment_failed':
                    $invoice = $event->data->object;
                    $subscriptionId = $invoice->subscription;

                    $user = $this->entityManager->getRepository(User::class)->findOneBy(['subscriptionId' => $subscriptionId]);
                    if ($user) {
                        $user->setIsPrenium(false);
                        $user->setSubscriptionId(null);
                        $this->entityManager->persist($user);
                        $this->entityManager->flush();
                    }
                    break;
            }

            return new JsonResponse(['status' => 'success']);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}
