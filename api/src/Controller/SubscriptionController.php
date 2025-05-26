<?php

namespace App\Controller;

use App\Repository\SubscriptionRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SubscriptionController extends AbstractController
{
    public function __construct(private SubscriptionRepository $subscriptionRepository) {}
    #[Route('api/{locale}/subscriptions', name: 'get_all_subscription', methods: ['GET'], requirements: ['locale' => '^[a-z]{2}-[A-Z]{2}$'])]
    public function getAllSubscription(string $locale): Response
    {
        $subscriptionEntities = $this->subscriptionRepository->findBy(['isActive' => true, 'locale' => $locale], ['position' => 'ASC']);

        if (empty($subscriptionEntities)) {
            return new JsonResponse(['message' => 'No active subscriptions found'], JsonResponse::HTTP_NOT_FOUND);
        }

        $subscriptions = [];

        foreach ($subscriptionEntities as $subscription) {
            $caracteristics = $subscription->getSubscriptionCaracteristics()->toArray();

            usort($caracteristics, function ($a, $b) {
                return $a->getPosition() <=> $b->getPosition();
            });

            $subscriptions[] = [
                'id' => $subscription->getId(),
                'title' => $subscription->getTitle(),
                'subtitle' => $subscription->getSubtitle(),
                'price' => $subscription->getPrice(),
                'locale' => $subscription->getLocale(),
                'duration' => $subscription->getDuration(),
                'caracteristics' => array_map(function ($caracteristic) {
                    return [
                        'id' => $caracteristic->getId(),
                        'text' => $caracteristic->getText()
                    ];
                }, $caracteristics)
            ];
        }

        return new JsonResponse($subscriptions, JsonResponse::HTTP_OK);
    }
}
