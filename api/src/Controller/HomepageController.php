<?php

namespace App\Controller;

use App\Repository\HomepageRepository;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\ProductTranslationRepository;
use App\Repository\CategoryTranslationRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomepageController extends AbstractController
{
    public function __construct(
        private HomepageRepository $homepageRepository,
        private CategoryTranslationRepository $categoryTranslationRepository,
        private ProductTranslationRepository $productTranslationRepository
    ) {
    }

    #[Route('/api/homepage/{locale}', name: 'get_homepage', methods: ['GET'], requirements: ['locale' => '^[a-z]{2}-[A-Z]{2}$'])]
    public function getHomepage(string $locale): JsonResponse
    {
        $homepage = $this->homepageRepository->findOneBy(['locale' => $locale]);

        if (!$homepage) {
            return new JsonResponse(['error' => 'Homepage not found'], 404);
        }

        $categories = $this->categoryTranslationRepository->findBy(['locale' => $locale]);

        $categories = array_map(function ($category) {
            return [
                'id' => $category->getId(),
                'locale' => $category->getLocale()->getCode(),
                'name' => $category->getName(),
                'description' => $category->getDescription(),
                'url_image' => $category->getCategory()->getUrlImage(),
            ];
        }, $categories);

        $topProducts = $this->productTranslationRepository->findTopProduct($locale);

        $topProducts = array_map(function ($product) {
            return [
                'id' => $product->getId(),
                'locale' => $product->getLocale()->getCode(),
                'name' => $product->getName(),
                'price' => $product->getProduct()->getPrice(),
                'url_image' => $product->getProduct()->getUrlImage(),
            ];
        }, $topProducts);

        return new JsonResponse([
            'id' => $homepage->getId(),
            'description' => $homepage->getText(),
            'locale' => $homepage->getLocale(),
            'slides' => array_map(function ($home) {
                return [
                    'id' => $home->getId(),
                    'title' => $home->getText(),
                    'url_image' => $home->getUrlImage()
                ];
            }, $homepage->getImages()->toArray()),
            'categories' => $categories ?? [],
            'topProducts' => $topProducts ?? [],
        ]);
    }
}
