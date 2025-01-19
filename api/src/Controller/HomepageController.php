<?php

namespace App\Controller;

use App\Repository\HomepageRepository;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\ProductTranslationRepository;
use App\Repository\CategoryTranslationRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class HomepageController extends AbstractController
{
    public function __construct(
        private HomepageRepository $homepageRepository,
        private CategoryTranslationRepository $categoryTranslationRepository,
        private ProductTranslationRepository $productTranslationRepository
    ) {
    }

    #[Route('/api/homepage/{locale}', name: 'get_homepage', methods: ['GET'], requirements: ['locale' => '^[a-z]{2}-[A-Z]{2}$'])]
    public function getHomepage(string $locale, Request $request): JsonResponse
    {
        $imagePath = $request->getSchemeAndHttpHost() . '/media/';

        $homepage = $this->homepageRepository->findOneBy(['locale' => $locale]);

        if (!$homepage) {
            return new JsonResponse(['error' => 'Homepage not found'], 404);
        }

        $categories = $this->categoryTranslationRepository->findBy(['locale' => $locale]);

        $categories = array_map(function ($category) use ($imagePath) {
            return [
                'id' => $category->getId(),
                'locale' => $category->getLocale()->getCode(),
                'name' => $category->getName(),
                'description' => $category->getDescription(),
                'url_image' => $category->getCategory()->getImage()?->getFilePath() == null ? null : $imagePath . $category->getCategory()->getImage()->getFilePath(),
            ];
        }, $categories);

        $topProducts = $this->productTranslationRepository->findTopProduct($locale);

        $topProducts = array_map(function ($product) use ($imagePath) {
            return [
                'id' => $product->getId(),
                'locale' => $product->getLocale()->getCode(),
                'name' => $product->getName(),
                'price' => $product->getProduct()->getPrice(),
                'url_image' => $product->getProduct()->getImage()?->getFilePath() == null ? null : $imagePath . $product->getProduct()->getImage()->getFilePath(),
            ];
        }, $topProducts);

        return new JsonResponse([
            'id' => $homepage->getId(),
            'description' => $homepage->getText(),
            'locale' => $homepage->getLocale(),
            'slides' => array_map(function ($slide) use ($imagePath) {
                return [
                    'id' => $slide->getId(),
                    'title' => $slide->getTitle(),
                    'url_image' => $slide->getImage()->getFilePath() == null ? null : $imagePath . $slide->getImage()->getFilePath(),
                ];
            }, $homepage->getSlides()->toArray()),
            'categories' => $categories ?? [],
            'topProducts' => $topProducts ?? [],
        ]);
    }
}
