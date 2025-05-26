<?php

namespace App\Tests\Controller;

use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use App\Controller\HomepageController;
use Symfony\Component\HttpFoundation\JsonResponse;

class HomepageControllerTest extends TestCase
{
    public function testGetHomepageNotFound()
    {
        /** @var \App\Repository\HomepageRepository&\PHPUnit\Framework\MockObject\MockObject $homepageRepo */
        $homepageRepo = $this->createMock(\App\Repository\HomepageRepository::class);
        /** @var \App\Repository\CategoryTranslationRepository&\PHPUnit\Framework\MockObject\MockObject $categoryRepo */
        $categoryRepo = $this->createMock(\App\Repository\CategoryTranslationRepository::class);
        /** @var \App\Repository\ProductTranslationRepository&\PHPUnit\Framework\MockObject\MockObject $productRepo */
        $productRepo = $this->createMock(\App\Repository\ProductTranslationRepository::class);

        $homepageRepo->method('findOneBy')->willReturn(null);

        $controller = new HomepageController($homepageRepo, $categoryRepo, $productRepo);

        $request = new Request([], [], [], [], [], ['HTTP_HOST' => 'localhost']);
        $response = $controller->getHomepage('fr-FR', $request);

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(404, $response->getStatusCode());
        $this->assertStringContainsString('Homepage not found', $response->getContent());
    }

    public function testGetHomepageSuccess()
    {
        // Mock image
        $image = $this->createMock(\stdClass::class);
        $image->method('getFilePath')->willReturn('cat.jpg');

        // Mock category
        $category = $this->createMock(\stdClass::class);
        $category->method('getId')->willReturn(1);
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

        // Mock product
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
        $productTranslation->method('getLocale')->willReturn($locale);
        $productTranslation->method('getName')->willReturn('NomProd');
        $productTranslation->method('getProduct')->willReturn($product);

        // Mock slide
        $slideImage = $this->createMock(\stdClass::class);
        $slideImage->method('getFilePath')->willReturn('slide.jpg');

        $slide = $this->createMock(\stdClass::class);
        $slide->method('getId')->willReturn(10);
        $slide->method('getTitle')->willReturn('TitreSlide');
        $slide->method('getImage')->willReturn($slideImage);

        $slidesArray = [$slide];

        $slidesCollection = $this->createMock(\stdClass::class);
        $slidesCollection->method('toArray')->willReturn($slidesArray);

        // Mock homepage
        $homepage = $this->createMock(\stdClass::class);
        $homepage->method('getId')->willReturn(100);
        $homepage->method('getText')->willReturn('TexteAccueil');
        $homepage->method('getLocale')->willReturn('fr-FR');
        $homepage->method('getSlides')->willReturn($slidesCollection);

        // Repositories
        /** @var \App\Repository\HomepageRepository&\PHPUnit\Framework\MockObject\MockObject */
        $homepageRepo = $this->createMock(\App\Repository\HomepageRepository::class);
        $homepageRepo->method('findOneBy')->willReturn($homepage);

        /** @var \App\Repository\CategoryTranslationRepository&\PHPUnit\Framework\MockObject\MockObject */
        $categoryRepo = $this->createMock(\App\Repository\CategoryTranslationRepository::class);
        $categoryRepo->method('findBy')->willReturn([$categoryTranslation]);

        /** @var \App\Repository\ProductTranslationRepository&\PHPUnit\Framework\MockObject\MockObject */
        $productRepo = $this->createMock(\App\Repository\ProductTranslationRepository::class);
        $productRepo->method('findTopProduct')->willReturn([$productTranslation]);

        $controller = new HomepageController($homepageRepo, $categoryRepo, $productRepo);

        $request = new Request([], [], [], [], [], ['HTTP_HOST' => 'localhost']);
        $response = $controller->getHomepage('fr-FR', $request);

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertEquals(100, $data['id']);
        $this->assertEquals('TexteAccueil', $data['description']);
        $this->assertEquals('fr-FR', $data['locale']);
        $this->assertEquals('TitreSlide', $data['slides'][0]['title']);
        $this->assertEquals('NomCat', $data['categories'][0]['name']);
        $this->assertEquals('NomProd', $data['topProducts'][0]['name']);
    }
}