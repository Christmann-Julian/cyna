<?php

namespace App\Entity;

use ApiPlatform\Metadata\Post;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\OpenApi\Model\Operation;
use ApiPlatform\OpenApi\Model\RequestBody;
use App\Repository\ConfirmEmailRepository;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    operations: [
        new Post(
            routeName: 'confirm_email',
            openapi: new Operation(
                tags: ['Confirm Email'],
                summary: 'Verify email token',
                description: 'Verify email token',
                requestBody: new RequestBody(
                    content: new \ArrayObject([
                        'application/json' => [
                            'schema' => ['type' => 'object'],
                            'properties' => [
                                'token_email' => ['type' => 'string'],
                            ],
                            'example' => [
                                'token_email' => 'string',
                            ],
                        ],
                    ]),
                ),
                responses: [
                    '200' => [
                        'description' => 'email verified successfully',
                        'content' => [
                            'application/json' => [
                                'schema' => ['type' => 'object'],
                                'example' => [
                                    'message' => 'string',
                                    'token' => 'string',
                                ],
                            ],
                        ],
                    ],
                    '201' => [
                        'description' => 'email verified successfully',
                        'content' => [
                            'application/json' => [
                                'schema' => ['type' => 'object'],
                                'example' => [
                                    'message' => 'string',
                                    'token' => 'string',
                                ],
                            ],
                        ],
                    ],
                ],
            ),
        ),
    ],
)]
#[ORM\Entity(repositoryClass: ConfirmEmailRepository::class)]
class ConfirmEmail
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    #[ORM\Column(length: 255, unique: true)]
    private ?string $email = null;

    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    #[ORM\Column(length: 255)]
    private ?string $email_token = null;

    #[Assert\NotBlank]
    #[Assert\DateTime]
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

    public function getEmailToken(): ?string
    {
        return $this->email_token;
    }

    public function setEmailToken(string $email_token): static
    {
        $this->email_token = $email_token;

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
