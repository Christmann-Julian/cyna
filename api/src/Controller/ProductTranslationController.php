<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\ProductTranslationRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProductTranslationController extends AbstractController
{
    public function __construct(private ProductTranslationRepository $productTranslationRepository) {}

    #[Route('api/product/{locale}/{id}', name: 'get_product_translation', methods: ['GET'], requirements: ['locale' => '^[a-z]{2}-[A-Z]{2}$', 'id' => '\d+'])]
    public function getProductTranslation(string $locale, int $id, Request $request): JsonResponse
    {
        $imagePath = $request->getSchemeAndHttpHost() . '/media/';

        $productTranslation = $this->productTranslationRepository->findOneBy([
            'id' => $id,
            'locale' => $locale
        ]);

        if (!$productTranslation) {
            return new JsonResponse(['error' => 'Product not found'], 404);
        }

        $categoryId = $productTranslation->getProduct()->getCategory()?->getId();

        if (!$categoryId) {
            $products = $this->productTranslationRepository->findByLocale($locale, $productTranslation->getId(), 6);
        } else {
            $products = $this->productTranslationRepository->findByLocaleAndCategory($locale, $categoryId, $productTranslation->getId(), 6);
        }

        $similarProducts = [];
        foreach ($products as $similarProduct) {
            $similarProducts[] = [
                'id' => $similarProduct->getId(),
                'locale' => $similarProduct->getLocale()->getCode(),
                'name' => $similarProduct->getName(),
                'price' => $similarProduct->getProduct()->getPrice(),
                'url_image' => $similarProduct->getProduct()->getImage()?->getFilePath() == null ? null : $imagePath . $similarProduct->getProduct()->getImage()->getFilePath(),
                'disponibility' => $similarProduct->getProduct()->isDisponibility(),
                'promotionActive' => $similarProduct->getProduct()->isPromotionActive(),
                'promotionLabel' => $similarProduct->getProduct()->getPromotionLabel(),
                'promotionPrice' => $similarProduct->getProduct()->getPromotionPrice()
            ];
        }

        return new JsonResponse([
            'id' => $productTranslation->getId(),
            'locale' => $productTranslation->getLocale()->getCode(),
            'name' => $productTranslation->getName(),
            'description' => $productTranslation->getDescription(),
            'caracteristic' => $productTranslation->getCaracteristic(),
            'price' => $productTranslation->getProduct()->getPrice(),
            'url_image' => $productTranslation->getProduct()->getImage()?->getFilePath() == null ? null : $imagePath . $productTranslation->getProduct()->getImage()->getFilePath(),
            'slides' => array_map(function ($slide) use ($imagePath) {
                return [
                    'id' => $slide->getId(),
                    'alt' => $slide->getAlt(),
                    'url_image' => $slide->getImage()->getFilePath() == null ? null : $imagePath . $slide->getImage()->getFilePath(),
                ];
            }, $productTranslation->getProduct()->getProductImages()->toArray()),
            'priority' => $productTranslation->getProduct()->getPriority(),
            'disponibility' => $productTranslation->getProduct()->isDisponibility(),
            'promotionActive' => $productTranslation->getProduct()->isPromotionActive(),
            'promotionLabel' => $productTranslation->getProduct()->getPromotionLabel(),
            'promotionPrice' => $productTranslation->getProduct()->getPromotionPrice(),
            'similarProduct' => $similarProducts
        ]);
    }
}
