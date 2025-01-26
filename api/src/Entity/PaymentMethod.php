<?php

namespace App\Entity;

use App\Entity\User;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use Symfony\Component\Validator\Constraints as Assert;


#[ApiResource(
    operations: [
        new GetCollection(security: "is_granted('ROLE_ADMIN') or object == user"),
        new Get(security: "is_granted('ROLE_ADMIN') or object == user"),
        new Put(security: "is_granted('ROLE_ADMIN') or object == user"),
        new Patch(security: "is_granted('ROLE_ADMIN') or object == user"),
        new Post(security: "is_granted('ROLE_ADMIN') or object == user"),
        new Delete(security: "is_granted('ROLE_ADMIN') or object == user"),
        new Post(
            security: "is_granted('ROLE_ADMIN') or object == user",
            routeName: 'add_payment_method',
        ),
    ],
)]
#[ORM\Entity]
class PaymentMethod
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    private string $cardHolderName;

    #[ORM\Column(type: 'string', length: 4)]
    #[Assert\NotBlank]
    private string $last4;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    private string $stripePaymentMethodId;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'paymentMethods')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCardHolderName(): string
    {
        return $this->cardHolderName;
    }

    public function setCardHolderName(string $cardHolderName): self
    {
        $this->cardHolderName = $cardHolderName;
        return $this;
    }

    public function getLast4(): string
    {
        return $this->last4;
    }

    public function setLast4(string $last4): self
    {
        $this->last4 = $last4;
        return $this;
    }

    public function getStripePaymentMethodId(): string
    {
        return $this->stripePaymentMethodId;
    }

    public function setStripePaymentMethodId(string $stripePaymentMethodId): self
    {
        $this->stripePaymentMethodId = $stripePaymentMethodId;
        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;
        return $this;
    }
}
