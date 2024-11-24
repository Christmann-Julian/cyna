<?php

namespace App\Controller;

use Symfony\Component\Routing\Attribute\Route;
use App\Repository\ProductTranslationRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProductTranslationController extends AbstractController
{
    public function __construct(private ProductTranslationRepository $productTranslationRepository)
    {
    }

    #[Route('api/product/{locale}/{id}', name: 'get_product_translation', methods: ['GET'], requirements: ['locale' => '^[a-z]{2}-[A-Z]{2}$', 'id' => '\d+'])]
    public function getProductTranslation(string $locale, int $id): JsonResponse
    {
        $productTranslation = $this->productTranslationRepository->findOneBy([
            'product' => $id,
            'locale' => $locale
        ]);

        if (!$productTranslation) {
            return new JsonResponse(['error' => 'Product not found'], 404);
        }

        return new JsonResponse([
            'id' => $productTranslation->getId(),
            'locale' => $productTranslation->getLocale()->getCode(),
            'name' => $productTranslation->getName(),
            'description' => $productTranslation->getDescription(),
            'caracteristic' => $productTranslation->getCaracteristic(),
            'price' => $productTranslation->getProduct()->getPrice(),
            'priority' => $productTranslation->getProduct()->getPriority(),
            'disponibility' => $productTranslation->getProduct()->isDisponibility(),
            'category' => $productTranslation->getProduct()->getCategory()?->getName()
        ]);
    }
}
