<?php

namespace App\Tests\Controller;

use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use App\Controller\CategoryTranslationController;
use Symfony\Component\HttpFoundation\JsonResponse;

class CategoryTranslationControllerTest extends TestCase
{
    public function testGetCategoryTranslationNotFound()
    {
        /** @var \App\Repository\CategoryTranslationRepository&\PHPUnit\Framework\MockObject\MockObject $categoryRepo */
        $categoryRepo = $this->createMock(\App\Repository\CategoryTranslationRepository::class);
        /** @var \App\Repository\ProductTranslationRepository&\PHPUnit\Framework\MockObject\MockObject $productRepo */
        $productRepo = $this->createMock(\App\Repository\ProductTranslationRepository::class);

        $categoryRepo->method('findOneBy')->willReturn(null);

        $controller = new CategoryTranslationController($categoryRepo, $productRepo);

        $request = new Request();
        $response = $controller->getCategoryTranslation('fr-FR', 1, $request);

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(404, $response->getStatusCode());
        $this->assertStringContainsString('Category not found', $response->getContent());
    }

    public function testGetCategoryTranslationSuccess()
    {
        // Mocks pour les entités imbriquées
        $image = $this->createMock(\stdClass::class);
        $image->method('getFilePath')->willReturn('cat.jpg');

        $category = $this->createMock(\stdClass::class);
        $category->method('getId')->willReturn(42);
        $category->method('getImage')->willReturn($image);
        $category->method('getPriority')->willReturn(1);

        $locale = $this->createMock(\stdClass::class);
        $locale->method('getCode')->willReturn('fr-FR');

        $categoryTranslation = $this->createMock(\stdClass::class);
        $categoryTranslation->method('getId')->willReturn(1);
        $categoryTranslation->method('getLocale')->willReturn($locale);
        $categoryTranslation->method('getName')->willReturn('NomCat');
        $categoryTranslation->method('getDescription')->willReturn('DescCat');
        $categoryTranslation->method('getCategory')->willReturn($category);

        // Produit mocké
        $productImage = $this->createMock(\stdClass::class);
        $productImage->method('getFilePath')->willReturn('prod.jpg');

        $product = $this->createMock(\stdClass::class);
        $product->method('getPrice')->willReturn(9.99);
        $product->method('getImage')->willReturn($productImage);
        $product->method('isDisponibility')->willReturn(true);
        $product->method('isPromotionActive')->willReturn(false);
        $product->method('getPromotionLabel')->willReturn(null);
        $product->method('getPromotionPrice')->willReturn(null);

        $productTranslation = $this->createMock(\stdClass::class);
        $productTranslation->method('getId')->willReturn(2);
        $productTranslation->method('getName')->willReturn('NomProd');
        $productTranslation->method('getDescription')->willReturn('DescProd');
        $productTranslation->method('getProduct')->willReturn($product);

        /** @var \App\Repository\CategoryTranslationRepository&\PHPUnit\Framework\MockObject\MockObject $categoryRepo */
        $categoryRepo = $this->createMock(\App\Repository\CategoryTranslationRepository::class);
        $categoryRepo->method('findOneBy')->willReturn($categoryTranslation);

        /** @var \App\Repository\ProductTranslationRepository&\PHPUnit\Framework\MockObject\MockObject $productRepo */
        $productRepo = $this->createMock(\App\Repository\ProductTranslationRepository::class);
        $productRepo->method('findProdyuctByLocaleAndCategory')->willReturn([$productTranslation]);

        $controller = new CategoryTranslationController($categoryRepo, $productRepo);

        $request = new Request([], [], [], [], [], ['HTTP_HOST' => 'localhost']);
        $response = $controller->getCategoryTranslation('fr-FR', 1, $request);

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertEquals('NomCat', $data['name']);
        $this->assertEquals('NomProd', $data['products'][0]['name']);
    }

    public function testGetAllCategoryTranslationNotFound()
    {
        /** @var \App\Repository\CategoryTranslationRepository&\PHPUnit\Framework\MockObject\MockObject $categoryRepo */
        $categoryRepo = $this->createMock(\App\Repository\CategoryTranslationRepository::class);
        /** @var \App\Repository\ProductTranslationRepository&\PHPUnit\Framework\MockObject\MockObject $productRepo */
        $productRepo = $this->createMock(\App\Repository\ProductTranslationRepository::class);

        $categoryRepo->method('findBy')->willReturn([]);

        $controller = new CategoryTranslationController($categoryRepo, $productRepo);

        $response = $controller->getAllCategoryTranslation('fr-FR');
        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(404, $response->getStatusCode());
        $this->assertStringContainsString('No categories found', $response->getContent());
    }

    public function testGetAllCategoryTranslationSuccess()
    {
        $category = $this->createMock(\stdClass::class);
        $category->method('getPriority')->willReturn(1);
        $category->method('getId')->willReturn(1);
        $category->method('getImage')->willReturn(null);

        $locale = $this->createMock(\stdClass::class);
        $locale->method('getCode')->willReturn('fr-FR');

        $categoryTranslation = $this->createMock(\stdClass::class);
        $categoryTranslation->method('getId')->willReturn(1);
        $categoryTranslation->method('getLocale')->willReturn($locale);
        $categoryTranslation->method('getName')->willReturn('NomCat');
        $categoryTranslation->method('getDescription')->willReturn('DescCat');
        $categoryTranslation->method('getCategory')->willReturn($category);

        /** @var \App\Repository\CategoryTranslationRepository&\PHPUnit\Framework\MockObject\MockObject $categoryRepo */
        $categoryRepo = $this->createMock(\App\Repository\CategoryTranslationRepository::class);
        $categoryRepo->method('findBy')->willReturn([$categoryTranslation]);

        /** @var \App\Repository\ProductTranslationRepository&\PHPUnit\Framework\MockObject\MockObject $productRepo */
        $productRepo = $this->createMock(\App\Repository\ProductTranslationRepository::class);

        $controller = new CategoryTranslationController($categoryRepo, $productRepo);

        $response = $controller->getAllCategoryTranslation('fr-FR');
        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertEquals('NomCat', $data[0]['name']);
    }

    public function testGetAllCategoryFilterNotFound()
    {
        /** @var \App\Repository\CategoryTranslationRepository&\PHPUnit\Framework\MockObject\MockObject $categoryRepo */
        $categoryRepo = $this->createMock(\App\Repository\CategoryTranslationRepository::class);
        /** @var \App\Repository\ProductTranslationRepository&\PHPUnit\Framework\MockObject\MockObject $productRepo */
        $productRepo = $this->createMock(\App\Repository\ProductTranslationRepository::class);

        $categoryRepo->method('findBy')->willReturn([]);


        $controller = new CategoryTranslationController($categoryRepo, $productRepo);

        $response = $controller->getAllCategoryFilter('fr-FR');
        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(404, $response->getStatusCode());
        $this->assertStringContainsString('No categories found', $response->getContent());
    }

    public function testGetAllCategoryFilterSuccess()
    {
        $category = $this->createMock(\stdClass::class);
        $category->method('getPriority')->willReturn(1);
        $category->method('getId')->willReturn(1);
        $category->method('getImage')->willReturn(null);

        $locale = $this->createMock(\stdClass::class);
        $locale->method('getCode')->willReturn('fr-FR');

        $categoryTranslation = $this->createMock(\stdClass::class);
        $categoryTranslation->method('getCategory')->willReturn($category);
        $categoryTranslation->method('getLocale')->willReturn($locale);
        $categoryTranslation->method('getName')->willReturn('NomCat');
        $categoryTranslation->method('getDescription')->willReturn('DescCat');

        /** @var \App\Repository\CategoryTranslationRepository&\PHPUnit\Framework\MockObject\MockObject $categoryRepo */
        $categoryRepo = $this->createMock(\App\Repository\CategoryTranslationRepository::class);
        $categoryRepo->method('findBy')->willReturn([$categoryTranslation]);

        /** @var \App\Repository\ProductTranslationRepository&\PHPUnit\Framework\MockObject\MockObject $productRepo */
        $productRepo = $this->createMock(\App\Repository\ProductTranslationRepository::class);

        $controller = new CategoryTranslationController($categoryRepo, $productRepo);

        $response = $controller->getAllCategoryFilter('fr-FR');
        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertEquals('NomCat', $data[0]['name']);
    }
}
