<?php

namespace App\Controller;

use App\Repository\CategoryTranslationRepository;
use App\Repository\ProductTranslationRepository;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProductTranslationController extends AbstractController
{
    public function __construct(private CategoryTranslationRepository $categoryTranslationRepository, private ProductTranslationRepository $productTranslationRepository)
    {
    }

    #[Route('api/category/{locale}/{id}', name: 'get_category_translation', methods: ['GET'], requirements: ['locale' => '^[a-z]{2}-[A-Z]{2}$', 'id' => '\d+'])]
    public function getCategoryTranslation(string $locale, int $id): JsonResponse
    {
        $categoryTranslation = $this->categoryTranslationRepository->findOneBy([
            'category' => $id,
            'locale' => $locale
        ]);

        if (!$categoryTranslation) {
            return new JsonResponse(['error' => 'Category not found'], 404);
        }
        
        $products = $this->productTranslationRepository->findProdyuctByLocaleAndCategory($locale, $categoryTranslation->getId());

        return new JsonResponse([
            'id' => $categoryTranslation->getId(),
            'locale' => $categoryTranslation->getLocale()->getCode(),
            'name' => $categoryTranslation->getName(),
            'description' => $categoryTranslation->getDescription(),
            'url_image' =>$categoryTranslation->getCategory()->getUrlImage(),            
        ]);
    }
}
