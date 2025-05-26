<?php

namespace App\Controller;

use App\Entity\ProductTranslation;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SearchController extends AbstractController
{
    #[Route('/api/search', name: 'api_search', methods: ['GET'])]
    public function search(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $searchTerm = $request->query->get('q', '');
        $locale = $request->query->get('locale', 'en-GB');
        $page = max(1, (int) $request->query->get('page', 1));
        $limit = max(1, (int) $request->query->get('limit', 10));
        $offset = ($page - 1) * $limit;
        $by = $request->query->get('by', 'none');
        $category = $request->query->get('category', null);
        $priceMin = $request->query->get('priceMin', null);
        $priceMax = $request->query->get('priceMax', null);
        $imagePath = $request->getSchemeAndHttpHost() . '/media/';

        if (
            ($priceMin != null && !is_numeric($priceMin))
            || ($priceMax != null && !is_numeric($priceMax))
            || ($category != null && !is_numeric($category))
            || (!is_numeric($limit) || $limit > 50)
            || !is_numeric($page)
            || !is_string($searchTerm) || !is_string($locale) || !is_string($by)
        ) {
            return new JsonResponse([
                'page' => 1,
                'limit' => 8,
                'totalResults' => 0,
                'totalPages' => 1,
                'data' => []
            ]);
        }

        $repository = $em->getRepository(ProductTranslation::class);

        $totalResults = $repository->countSearchResults($locale, $searchTerm);

        $products = $repository->findBySearchTerm(
            $locale,
            $searchTerm,
            $limit,
            $offset,
            $by,
            $category,
            $priceMin,
            $priceMax
        );

        $response = array_map(function ($product) use ($imagePath) {
            return [
                'id' => $product->getId(),
                'locale' => $product->getLocale()->getCode(),
                'name' => $product->getName(),
                'price' => $product->getProduct()->getPrice(),
                'url_image' => $product->getProduct()->getImage()?->getFilePath()
                    ? $imagePath . $product->getProduct()->getImage()->getFilePath()
                    : null,
                'disponibility' => $product->getProduct()->isDisponibility(),
                'promotionActive' => $product->getProduct()->isPromotionActive(),
                'promotionLabel' => $product->getProduct()->getPromotionLabel(),
                'promotionPrice' => $product->getProduct()->getPromotionPrice(),
            ];
        }, $products);

        return new JsonResponse([
            'page' => $page,
            'limit' => $limit,
            'totalResults' => $totalResults,
            'totalPages' => ceil($totalResults / $limit),
            'data' => $response
        ]);
    }
}
