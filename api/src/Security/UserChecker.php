<?php

namespace App\Security;

use App\Entity\User;
use App\Service\EmailService;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;

class UserChecker implements UserCheckerInterface
{
    public function __construct(public EmailService $emailService)
    {
    }
    public function checkPreAuth(UserInterface $user): void
    {
        if (!$user instanceof User) {
            return;
        }

        if (!$user->isEmailVerified()) {
            $this->emailService->sendEmailVerificationEmail($user);
            throw new CustomUserMessageAuthenticationException('Email is not verified.');
        }
    }

    public function checkPostAuth(UserInterface $user): void
    {
        // Make other checks
    }
}
