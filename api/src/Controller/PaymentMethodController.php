<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\PaymentMethod;
use App\Service\StripeService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PaymentMethodController extends AbstractController
{
    public function __construct(
        private StripeService $stripeService,
        private EntityManagerInterface $em
    ) {
    }

    #[Route('/api/user/payment_methods', name: 'get_user_payment_methods', methods: ['GET'])]
    public function getUserAddresses(): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');

        $user = $this->getUser();
        $payment_methods = $this->em->getRepository(PaymentMethod::class)->findBy(['user' => $user]);

        return $this->json($payment_methods);
    }

    #[Route('/api/add_payment_method', name: 'add_payment_method', methods: ['POST'])]
    public function addPaymentMethod(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $this->em->getRepository(User::class)->find($data['userId']);

        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }

        $paymentMethodId = $data['paymentMethodId'];
        $customerId = $user->getStripeCustomerId();

        if (!$customerId) {
            $customerId = $this->stripeService->createCustomer($user->getEmail());
            $user->setStripeCustomerId($customerId);
            $this->em->persist($user);
        }

        $this->stripeService->attachPaymentMethod($paymentMethodId, $customerId);
        $details = $this->stripeService->getPaymentMethodDetails($paymentMethodId);

        $paymentMethod = new PaymentMethod();
        $paymentMethod->setStripePaymentMethodId($paymentMethodId);
        $paymentMethod->setUser($user);
        $paymentMethod->setLast4($details['card']['last4']);
        $paymentMethod->setBrand($details['card']['brand']);
        $paymentMethod->setExpiryMonth($details['card']['exp_month']);
        $paymentMethod->setExpiryYear($details['card']['exp_year']);

        $this->em->persist($paymentMethod);
        $this->em->flush();

        return new JsonResponse(['success' => true]);
    }

    #[Route('/api/payment_methods/{id}', name: 'delete_payment_method', methods: ['DELETE'])]
    public function deletePaymentMethod(int $id): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');

        $paymentMethod = $this->em->getRepository(PaymentMethod::class)->find($id);

        if (!$paymentMethod) {
            return new JsonResponse(['message' => 'Payment method not found'], Response::HTTP_NOT_FOUND);
        }

        $user = $this->getUser();
        if ($paymentMethod->getUser() !== $user) {
            return new JsonResponse(['message' => 'You do not have permission to delete this payment method'], Response::HTTP_FORBIDDEN);
        }

        $this->stripeService->detachPaymentMethod($paymentMethod->getStripePaymentMethodId());

        $this->em->remove($paymentMethod);
        $this->em->flush();

        return new JsonResponse(['message' => 'Payment method deleted successfully'], Response::HTTP_NO_CONTENT);
    }
}
