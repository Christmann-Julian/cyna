<?php

namespace App\Service;

use Stripe\StripeClient;

class StripeService
{
    private StripeClient $stripe;

    public function __construct()
    {
        $apiKey = getenv('STRIPE_PRIVATE_KEY');
        
        if (!$apiKey) {
            throw new \Exception('Stripe private key not set in environment variables');
        }
        $this->stripe = new StripeClient($apiKey);
    }

    public function createPaymentIntent(string $paymentMethodId, int $amount, string $currency = 'usd')
    {
        return $this->stripe->paymentIntents->create([
            'amount' => $amount,
            'currency' => $currency,
            'payment_method' => $paymentMethodId,
            'confirm' => true,
        ]);
    }

    public function createPaymentMethod(string $cardToken): string
    {
        $paymentMethod = $this->stripe->paymentMethods->create([
            'type' => 'card',
            'card' => ['token' => $cardToken],
        ]);

        return $paymentMethod->id;
    }
}
