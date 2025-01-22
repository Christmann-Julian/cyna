<?php

namespace App\Security;

use App\Entity\User;
use App\Service\EmailService;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;

class UserChecker implements UserCheckerInterface
{
    public function __construct(public EmailService $emailService, private RequestStack $requestStack)
    {
    }

    public function checkPreAuth(UserInterface $user): void
    {
        if (!$user instanceof User) {
            return;
        }

        if (!$user->isEmailVerified()) {
            $request = $this->requestStack->getCurrentRequest();

            $content = json_decode($request->getContent(), true);
            $locale = $content['locale'] ?? null;

            if (!$locale || !in_array($locale, ['en-GB', 'fr-FR', 'ar-SA'])) {
                throw new CustomUserMessageAuthenticationException('Email is not verified.');
            }

            $this->emailService->sendEmailVerificationEmail($user, $locale);
            throw new CustomUserMessageAuthenticationException('Email is not verified.');
        }
    }

    public function checkPostAuth(UserInterface $user): void
    {
        // Make other checks
    }
}
