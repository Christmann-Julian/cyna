<?php

namespace App\Controller;

use App\Repository\OrderRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class StatisticController extends AbstractController
{
    #[Route('/api/statistics/sales-per-day', name: 'statistics_sales_per_day', methods: ['GET'])]
    public function getSalesPerDay(OrderRepository $orderRepository): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $salesData = $orderRepository->getSalesPerDay();
        return new JsonResponse($salesData, Response::HTTP_OK);
    }

    #[Route('/api/statistics/average-cart', name: 'statistics_average_cart', methods: ['GET'])]
    public function getAverageCart(OrderRepository $orderRepository): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $averageCartData = $orderRepository->getAverageCart();
        return new JsonResponse($averageCartData, Response::HTTP_OK);
    }

    #[Route('/api/statistics/category-sales', name: 'statistics_category_sales', methods: ['GET'])]
    public function getCategorySales(OrderRepository $orderRepository): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $categorySalesData = $orderRepository->getCategorySales();
        return new JsonResponse($categorySalesData, Response::HTTP_OK);
    }
}
