<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\ConfirmEmail;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class ConfirmEmailController extends AbstractController
{
    #[Route('/api/confirm-email', name: 'confirm_email', methods: ['POST'])]
    public function confirmEmail(Request $request, EntityManagerInterface $em, JWTTokenManagerInterface $jwtManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $emailToken = $data['email_token'];

        if (!$emailToken) {
            return new JsonResponse(['message' => 'Email token is required'], 400);
        }

        $confirmEmail = $em->getRepository(ConfirmEmail::class)->findOneBy(['email_token' => $emailToken]);

        if (!$confirmEmail) {
            return new JsonResponse(['message' => 'Invalid email token'], 400);
        }

        if ($confirmEmail->getExpiresAt() < new \DateTimeImmutable()) {
            return new JsonResponse(['message' => 'Email token expired'], 400);
        }

        $user = $em->getRepository(User::class)->findOneBy(['email' => $confirmEmail->getEmail()]);

        if (!$user) {
            return new JsonResponse(['message' => 'User not found'], 404);
        }

        $user->setEmailVerified(true);
        $em->persist($user);
        $em->flush();

        $jwt = $jwtManager->create($user);

        return new JsonResponse([
            'message' => 'Email confirmed',
            'token' => $jwt
        ], 200);
    }
}
