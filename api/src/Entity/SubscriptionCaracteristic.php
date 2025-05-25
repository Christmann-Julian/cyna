<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\SubscriptionCaracteristicRepository;

#[ApiResource(
    normalizationContext: ['groups' => ['subscriptionCaracteristic:read']],
    denormalizationContext: ['groups' => ['subscriptionCaracteristic:create', 'subscriptionCaracteristic:update']],
    operations: [
        new GetCollection(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Get(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Post(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Put(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Delete(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
    ],
)]
#[ORM\Entity(repositoryClass: SubscriptionCaracteristicRepository::class)]
class SubscriptionCaracteristic
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[Groups(['subscriptionCaracteristic:read'])]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups([
        'subscriptionCaracteristic:read', 'subscriptionCaracteristic:create', 'subscriptionCaracteristic:update',
        'subscription:read', 'subscription:create', 'subscription:update'
    ])]
    #[ORM\Column(nullable: true)]
    private ?int $position = null;

    #[Groups([
        'subscriptionCaracteristic:read', 'subscriptionCaracteristic:create', 'subscriptionCaracteristic:update',
        'subscription:read', 'subscription:create', 'subscription:update'
    ])]
    #[ORM\Column(length: 255)]
    private ?string $text = null;

    #[ORM\ManyToOne(inversedBy: 'subscriptionCaracteristics')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Subscription $subscription = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPosition(): ?int
    {
        return $this->position;
    }

    public function setPosition(?int $position): static
    {
        $this->position = $position;

        return $this;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text): static
    {
        $this->text = $text;

        return $this;
    }

    public function getSubscription(): ?Subscription
    {
        return $this->subscription;
    }

    public function setSubscription(?Subscription $subscription): static
    {
        $this->subscription = $subscription;

        return $this;
    }
}
