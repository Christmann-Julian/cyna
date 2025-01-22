<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\PasswordReset;
use App\Service\EmailService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class PasswordResetController extends AbstractController
{
    public function __construct(private EmailService $emailService)
    {
    }

    #[Route('/api/password-forgot', name: 'password_forgot_mail', methods: ['POST'])]
    public function passwordForgot(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'];
        $locale = $data['locale'] ?? 'en-GB';

        if (!in_array($locale, ['en-GB', 'fr-FR', 'ar-SA'])) {
            $locale = 'en-GB';
        }

        if (!$email) {
            return new JsonResponse(['message' => 'Email is required'], 400);
        }

        $user = $em->getRepository(User::class)->findOneBy(['email' => $email]);

        if (!$user) {
            return new JsonResponse(['message' => 'User not found'], 404);
        }

        $resetToken = bin2hex(random_bytes(32));
        $timezone = new \DateTimeZone('Europe/Paris');
        $expiresAt = new \DateTimeImmutable('+15 minutes', $timezone);
        $passwordReset = $em->getRepository(PasswordReset::class)->findOneBy(['email' => $email]);

        if ($passwordReset) {
            $passwordReset->setResetToken($resetToken);
            $passwordReset->setExpiresAt($expiresAt);
        } else {
            $passwordReset = new PasswordReset();
            $passwordReset->setEmail($email);
            $passwordReset->setResetToken($resetToken);
            $passwordReset->setExpiresAt($expiresAt);
        }

        $em->persist($passwordReset);
        $em->flush();

        try {
            $this->emailService->sendResetPasswordEmail($locale, $user, $resetToken);
        } catch (\Exception $e) {
            return new JsonResponse(['message' => 'An error occurred while sending the email'], 500);
        }

        return new JsonResponse(['message' => 'Password reset email sent.']);
    }

    #[Route('/api/password-reset', name: 'password_reset', methods: ['POST'])]
    public function reset(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $token = $data['reset_token'];
        $newPassword = $data['password'];

        if (!$token || !$newPassword) {
            return new JsonResponse(['message' => 'Token and password are required'], 400);
        }

        $resetToken = $em->getRepository(PasswordReset::class)->findOneBy(['resetToken' => $token]);

        if (!$resetToken || $resetToken->getExpiresAt() < new \DateTimeImmutable("now", new \DateTimeZone('Europe/Paris'))) {
            return new JsonResponse(['message' => 'Invalid or expired token'], 400);
        }

        $user = $em->getRepository(User::class)->findOneBy(['email' => $resetToken->getEmail()]);

        if (!$user) {
            return new JsonResponse(['message' => 'User not found'], 404);
        }

        $user->setPassword($passwordHasher->hashPassword($user, $newPassword));

        $em->persist($user);
        $em->flush();

        return new JsonResponse(['message' => 'Password successfully reset.']);
    }
}
