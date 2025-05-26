<?php

namespace App\Controller;

use App\Entity\PromotionalCode;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PromotionalCodeController extends AbstractController
{
    #[Route('/api/promotional-code/{name}', name: 'get_promotional_code_by_name', methods: ['GET'])]
    public function getPromotionalCodeByName(string $name, EntityManagerInterface $entityManager): JsonResponse
    {
        $repository = $entityManager->getRepository(PromotionalCode::class);
        $promotionalCode = $repository->findOneBy(['name' => $name]);

        if (!$promotionalCode) {
            return $this->json(['error' => 'Promotional code not found'], 404);
        }

        return $this->json([
            'id' => $promotionalCode->getId(),
            'name' => $promotionalCode->getName(),
            'promotion' => $promotionalCode->getPromotion(),
            'isPercent' => $promotionalCode->isPercent(),
        ]);
    }
}
