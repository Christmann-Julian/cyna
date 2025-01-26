<?php

namespace App\Controller;

use App\Entity\PaymentMethod;
use App\Entity\Address;
use App\Service\StripeService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class CheckoutController extends AbstractController
{
    public function __construct(
        private StripeService $stripeService,
        private EntityManagerInterface $em
    ) {
    }

    public function checkout(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $paymentMethodId = $data['paymentMethodId'];
        $shippingAddressId = $data['shippingAddressId'];
        $amount = $data['amount'];

        $paymentMethod = $this->em->getRepository(PaymentMethod::class)->find($paymentMethodId);
        $shippingAddress = $this->em->getRepository(Address::class)->find($shippingAddressId);

        if (!$paymentMethod || !$shippingAddress) {
            return $this->json(['error' => 'Invalid payment method or shipping address'], 400);
        }

        $paymentIntent = $this->stripeService->createPaymentIntent($paymentMethod->getStripePaymentMethodId(), $amount);

        return $this->json([
            'paymentIntent' => $paymentIntent,
            'shippingAddress' => $shippingAddress,
        ]);
    }
}
