<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\SubscriptionRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use Doctrine\Common\Collections\ArrayCollection;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['subscription:read']],
    denormalizationContext: ['groups' => ['subscription:create', 'subscription:update']],
    operations: [
        new GetCollection(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Get(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Post(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Put(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Delete(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
    ],
)]
#[ApiFilter(OrderFilter::class, properties: ['id', 'title', 'subtitle', 'price', 'locale', 'isActive'])]
#[ApiFilter(SearchFilter::class, properties: ['title' => 'partial'])]
#[ORM\Entity(repositoryClass: SubscriptionRepository::class)]
class Subscription
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([
        'subscription:read'
    ])]
    private ?int $id = null;

    #[Groups([
        'subscription:read', 'subscription:create', 'subscription:update'
    ])]
    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[Groups([
        'subscription:read', 'subscription:create', 'subscription:update'
    ])]
    #[ORM\Column(length: 255)]
    private ?string $subtitle = null;

    #[Groups([
        'subscription:read', 'subscription:create', 'subscription:update'
    ])]
    #[ORM\Column]
    private ?float $price = null;

    #[Groups([
        'subscription:read', 'subscription:create', 'subscription:update'
    ])]
    #[ORM\Column]
    private ?bool $isActive = null;

    #[Groups([
        'subscription:read', 'subscription:create', 'subscription:update'
    ])]
    #[ORM\Column(length: 5)]
    private ?string $locale = null;

    /**
     * @var Collection<int, SubscriptionCaracteristic>
     */
    #[Groups([
        'subscription:read', 'subscription:create', 'subscription:update'
    ])]
    #[ORM\OneToMany(targetEntity: SubscriptionCaracteristic::class, mappedBy: 'subscription', orphanRemoval: true, cascade: ['persist'])]
    private Collection $subscriptionCaracteristics;

    #[Groups([
        'subscription:read', 'subscription:create', 'subscription:update'
    ])]
    #[ORM\Column]
    private ?int $duration = null;

    #[Groups([
        'subscription:read', 'subscription:create', 'subscription:update'
    ])]
    #[ORM\Column(nullable: true)]
    private ?int $position = null;

    public function __construct()
    {
        $this->subscriptionCaracteristics = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getSubtitle(): ?string
    {
        return $this->subtitle;
    }

    public function setSubtitle(string $subtitle): static
    {
        $this->subtitle = $subtitle;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->isActive;
    }

    public function getIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): static
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function getLocale(): ?string
    {
        return $this->locale;
    }

    public function setLocale(string $locale): static
    {
        $this->locale = $locale;

        return $this;
    }

    /**
     * @return Collection<int, SubscriptionCaracteristic>
     */
    public function getSubscriptionCaracteristics(): Collection
    {
        return $this->subscriptionCaracteristics;
    }

    public function addSubscriptionCaracteristic(SubscriptionCaracteristic $subscriptionCaracteristic): static
    {
        if (!$this->subscriptionCaracteristics->contains($subscriptionCaracteristic)) {
            $this->subscriptionCaracteristics->add($subscriptionCaracteristic);
            $subscriptionCaracteristic->setSubscription($this);
        }

        return $this;
    }

    public function removeSubscriptionCaracteristic(SubscriptionCaracteristic $subscriptionCaracteristic): static
    {
        if ($this->subscriptionCaracteristics->removeElement($subscriptionCaracteristic)) {
            // set the owning side to null (unless already changed)
            if ($subscriptionCaracteristic->getSubscription() === $this) {
                $subscriptionCaracteristic->setSubscription(null);
            }
        }

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): static
    {
        $this->duration = $duration;

        return $this;
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
}
