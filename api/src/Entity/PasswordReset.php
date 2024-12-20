<?php

namespace App\Entity;

use ApiPlatform\Metadata\Post;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\OpenApi\Model\Operation;
use ApiPlatform\OpenApi\Model\RequestBody;
use App\Repository\PasswordResetRepository;

#[ApiResource(
    normalizationContext: ['groups' => ['productTranslation:read']],
    denormalizationContext: ['groups' => ['productTranslation:create', 'productTranslation:update']],
    operations: [
        new Post(
            routeName: 'password_forgot_mail',
            openapi: new Operation(
                tags: ['PasswordReset'],
                summary: 'Send an email to reset password',
                description: 'Send an email to reset password',
                requestBody: new RequestBody(
                    content: new \ArrayObject([
                        'application/json' => [
                            'schema' => ['type' => 'object'],
                            'properties' => [
                                'email' => ['type' => 'string'],
                                'locale' => ['type' => 'string'],
                            ],
                            'example' => [
                                'email' => 'string',
                                'locale' => 'string',
                            ],
                        ],
                    ]),
                ),
                responses: [
                    '200' => [
                        'description' => 'email sent successfully',
                        'content' => [
                            'application/json' => [
                                'schema' => ['type' => 'object'],
                                'example' => [
                                    'message' => 'string'
                                ],
                            ],
                        ],
                    ],
                    '201' => [
                        'description' => 'email sent successfully',
                        'content' => [
                            'application/json' => [
                                'schema' => ['type' => 'object'],
                                'example' => [
                                    'message' => 'string'
                                ],
                            ],
                        ],
                    ],
                ],
            ),
        ),
        new Post(
            routeName: 'password_reset',
            openapi: new Operation(
                tags: ['PasswordReset'],
                summary: 'Reset password',
                description: 'Reset password',
                requestBody: new RequestBody(
                    content: new \ArrayObject([
                        'application/json' => [
                            'schema' => ['type' => 'object'],
                            'properties' => [
                                'reset_token' => ['type' => 'string'],
                                'password' => ['type' => 'string'],
                            ],
                            'example' => [
                                'reset_token' => 'string',
                                'password' => 'string',
                            ],
                        ],
                    ]),
                ),
                responses: [
                    '200' => [
                        'description' => 'password reset successfully',
                        'content' => [
                            'application/json' => [
                                'schema' => ['type' => 'object'],
                                'example' => [
                                    'message' => 'string'
                                ],
                            ],
                        ],
                    ],
                    '201' => [
                        'description' => 'password reset successfully',
                        'content' => [
                            'application/json' => [
                                'schema' => ['type' => 'object'],
                                'example' => [
                                    'message' => 'string'
                                ],
                            ],
                        ],
                    ],
                ],
            ),
        ),
    ],
)]
#[ORM\Entity(repositoryClass: PasswordResetRepository::class)]
class PasswordReset
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $resetToken = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $expiresAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getResetToken(): ?string
    {
        return $this->resetToken;
    }

    public function setResetToken(string $resetToken): static
    {
        $this->resetToken = $resetToken;

        return $this;
    }

    public function getExpiresAt(): ?\DateTimeImmutable
    {
        return $this->expiresAt;
    }

    public function setExpiresAt(\DateTimeImmutable $expiresAt): static
    {
        $this->expiresAt = $expiresAt;

        return $this;
    }
}
