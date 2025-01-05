<?php

namespace App\Controller;

use App\Repository\CategoryTranslationRepository;
use App\Repository\ProductTranslationRepository;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CategoryTranslationController extends AbstractController
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
            'url_image' => $categoryTranslation->getCategory()->getUrlImage(),
            'products' => array_map(function ($product) {
                return [
                    'id' => $product->getId(),
                    'name' => $product->getName(),
                    'description' => $product->getDescription(),
                    'price' => $product->getProduct()->getPrice(),
                    'url_image' => $product->getProduct()->getUrlImage()
                ];
            }, $products)
        ]);
    }

    #[Route('api/{locale}/categories', name: 'get_all_category_translation', methods: ['GET'], requirements: ['locale' => '^[a-z]{2}-[A-Z]{2}$'])]
    public function getAllCategoryTranslation(string $locale): JsonResponse
    {
        $categories = $this->categoryTranslationRepository->findBy(['locale' => $locale]);

        if (!$categories) {
            return new JsonResponse(['error' => 'No categories found for this locale'], 404);
        }

        $categories = array_map(function ($category) {
            return [
                'id' => $category->getId(),
                'locale' => $category->getLocale()->getCode(),
                'name' => $category->getName(),
                'description' => $category->getDescription(),
                'url_image' => $category->getCategory()->getUrlImage(),
            ];
        }, $categories);

        return new JsonResponse($categories);
    }
}
