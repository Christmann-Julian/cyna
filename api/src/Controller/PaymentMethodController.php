<?php

namespace App\Controller;

use App\Entity\PaymentMethod;
use App\Service\StripeService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class PaymentMethodController extends AbstractController
{
    public function __construct(
        private StripeService $stripeService,
        private EntityManagerInterface $em
    ) {
    }

    #[Route('/api/add_payment_method', name: 'add_payment_method', methods: ['POST'])]
    public function addPaymentMethod(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $cardToken = $data['cardToken'];
        $cardHolderName = $data['cardHolderName'];

        $stripePaymentMethodId = $this->stripeService->createPaymentMethod($cardToken);

        $paymentMethod = new PaymentMethod();
        $paymentMethod->setCardHolderName($cardHolderName);
        $paymentMethod->setLast4(substr($cardToken, -4));
        $paymentMethod->setStripePaymentMethodId($stripePaymentMethodId);
        $paymentMethod->setUser($this->getUser());

        $this->em->persist($paymentMethod);
        $this->em->flush();

        return $this->json($paymentMethod, 201);
    }
}
