<?php

namespace App\Service;

use Stripe\StripeClient;

class StripeService
{
    private StripeClient $stripe;

    public function __construct(?string $apiKey = null)
    {
        if (!$apiKey) {
            throw new \Exception('STRIPE_PRIVATE_KEY not set in .env file.');
        }
        $this->stripe = new StripeClient($apiKey);
    }

    public function createCustomer(string $email): string
    {
        $customer = $this->stripe->customers->create(['email' => $email]);
        return $customer->id;
    }

    public function attachPaymentMethod(string $paymentMethodId, string $customerId)
    {
        $this->stripe->paymentMethods->attach($paymentMethodId, [
            'customer' => $customerId,
        ]);
    }

    public function detachPaymentMethod(string $paymentMethodId)
    {
        $this->stripe->paymentMethods->detach($paymentMethodId);
    }

    public function getPaymentMethods(string $customerId): array
    {
        return $this->stripe->paymentMethods->all([
            'customer' => $customerId,
            'type' => 'card',
        ])->data;
    }

    public function getPaymentMethodDetails(string $paymentMethodId): array
    {
        $paymentMethod = $this->stripe->paymentMethods->retrieve($paymentMethodId);
        return [
            'card' => [
                'last4' => $paymentMethod->card->last4,
                'brand' => $paymentMethod->card->brand,
                'exp_month' => $paymentMethod->card->exp_month,
                'exp_year' => $paymentMethod->card->exp_year,
            ],
        ];
    }
}
