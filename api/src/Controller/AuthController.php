<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\RefreshToken;
use App\Service\EmailService;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Gesdinet\JWTRefreshTokenBundle\Model\RefreshTokenManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Gesdinet\JWTRefreshTokenBundle\Generator\RefreshTokenGeneratorInterface;

class AuthController extends AbstractController
{
    public function __construct(
        private UserRepository $userRepository,
        private UserPasswordHasherInterface $passwordHasher,
        private JWTTokenManagerInterface $jwtManager,
        private RefreshTokenGeneratorInterface $refreshTokenGenerator,
        private EntityManagerInterface $entityManager,
        private EmailService $emailService
    ) {
    }

    #[Route('/api/login', name: 'api_auth_login', methods: ['POST'])]
    public function authenticate(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $username = $data['username'] ?? null;
        $password = $data['password'] ?? null;
        $locale = $data['locale'] ?? null;

        if (!$username || !$password) {
            return new JsonResponse(
                ['error' => 'Username and password required'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $user = $this->userRepository->findOneBy(['email' => $username]);

        if (!$user) {
            return new JsonResponse(
                ['error' => 'Invalid credentials'],
                JsonResponse::HTTP_UNAUTHORIZED
            );
        }

        if (!$user->isEmailVerified()) {

            if (!$locale || !in_array($locale, ['en-GB', 'fr-FR', 'ar-SA'])) {
                return new JsonResponse(
                    ['message' => 'Email is not verified.'],
                    JsonResponse::HTTP_UNAUTHORIZED
                );
            }

            $this->emailService->sendEmailVerificationEmail($user, $locale);
            return new JsonResponse(
                ['message' => 'Email is not verified.'],
                JsonResponse::HTTP_UNAUTHORIZED
            );
        }

        if (!$this->passwordHasher->isPasswordValid($user, $password)) {
            return new JsonResponse(
                ['error' => 'Invalid credentials'],
                JsonResponse::HTTP_UNAUTHORIZED
            );
        }

        if (in_array('ROLE_ADMIN', $user->getRoles())) {
            $otpCode = random_int(100000, 999999);

            $user->setTwoFaCode($otpCode);
            $user->setTwoFaExpiresAt((new \DateTimeImmutable())->modify('+10 minutes'));

            $this->entityManager->persist($user);
            $this->entityManager->flush();
            
            $this->emailService->send2faCodeEmail($user, $otpCode);

            return new JsonResponse([
                'twofa_required' => true,
                'user_id' => $user->getId()
            ]);
        }

        $token = $this->jwtManager->create($user);
        $refreshToken = $this->refreshTokenGenerator->createForUserWithTtl($user, 86400 * 7); // 7 days

        $refreshTokenEntity = $this->entityManager->getRepository(RefreshToken::class)->findOneBy(['username' => $user->getEmail()]);

        if (!$refreshTokenEntity) {
            $refreshTokenEntity = new RefreshToken();
        }

        $refreshTokenEntity->setRefreshToken($refreshToken->getRefreshToken())
            ->setUsername($user->getEmail())
            ->setValid($refreshToken->getValid());

        $this->entityManager->persist($refreshTokenEntity);
        $this->entityManager->flush();

        return new JsonResponse([
            'token' => $token,
            'refresh_token' => $refreshToken->getRefreshToken(),
        ]);
    }

    #[Route('/api/token/refresh', name: 'api_auth_refresh_token', methods: ['POST'])]
    public function refreshToken(
        Request $request,
        RefreshTokenManagerInterface $refreshTokenManager,
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $refreshTokenStr = $data['refresh_token'] ?? null;

        if (!$refreshTokenStr) {
            return new JsonResponse(['message' => 'Missing refresh token'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $refreshToken = $refreshTokenManager->get($refreshTokenStr);
        if (!$refreshToken) {
            return new JsonResponse(['message' => 'Invalid refresh token'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $refreshToken->getUsername()]);
        if (!$user) {
            return new JsonResponse(['message' => 'User not found'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $newToken = $this->jwtManager->create($user);
        $newRefreshToken = new RefreshToken();
        $newRefreshToken->setRefreshToken()
            ->setUsername($user->getEmail())
            ->setValid((new \DateTime())->modify('+1 week'));

        $refreshTokenManager->delete($refreshToken);
        $refreshTokenManager->save($newRefreshToken);

        return new JsonResponse([
            'token' => $newToken,
            'refresh_token' => $newRefreshToken->getRefreshToken(),
        ]);
    }

    #[Route('/api/two-fa', name: 'api_auth_2fa', methods: ['POST'])]
    public function verify2faAuthentication(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $userId = $data['user_id'] ?? null;
        $otpCode = $data['code'] ?? null;

        if (!$userId || !$otpCode) {
            return new JsonResponse(['message' => 'Missing parameters'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $user = $this->userRepository->findOneBy(['id' => $userId]);

        if (!$user || !$user->getTwoFaCode()) {
            return new JsonResponse(['message' => 'Invalid or expired OTP'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        if ($user->getTwoFaCode() !== $otpCode || new \DateTimeImmutable() > $user->getTwoFaExpiresAt()) {
            return new JsonResponse(['message' => 'Invalid or expired OTP'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $user->setTwoFaCode(null);
        $user->setTwoFaExpiresAt(null);
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $token = $this->jwtManager->create($user);
        $refreshToken = $this->refreshTokenGenerator->createForUserWithTtl($user, 86400 * 7);

        $refreshTokenEntity = new RefreshToken();
        $refreshTokenEntity->setRefreshToken($refreshToken->getRefreshToken())
            ->setUsername($user->getEmail())
            ->setValid($refreshToken->getValid());

        $this->entityManager->persist($refreshTokenEntity);
        $this->entityManager->flush();

        return new JsonResponse([
            'token' => $token,
            'refresh_token' => $refreshToken->getRefreshToken(),
        ]);
    }
}
