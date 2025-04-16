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
use App\Repository\PromotionalCodeRepository;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['promo:read']],
    denormalizationContext: ['groups' => ['promo:create', 'promo:update']],
    operations: [
        new GetCollection(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Get(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Post(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Put(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Delete(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
    ],
)]
#[ApiFilter(OrderFilter::class, properties: ['name', 'promotion', 'isPercent'])]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial'])]
#[ORM\Entity(repositoryClass: PromotionalCodeRepository::class)]
class PromotionalCode
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups([
        'promo:read', 'promo:create', 'promo:update'
    ])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups([
        'promo:read', 'promo:create', 'promo:update'
    ])]
    #[ORM\Column]
    private ?float $promotion = null;

    #[Groups([
        'promo:read', 'promo:create', 'promo:update'
    ])]
    #[ORM\Column]
    private ?bool $isPercent = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getPromotion(): ?float
    {
        return $this->promotion;
    }

    public function setPromotion(float $promotion): static
    {
        $this->promotion = $promotion;

        return $this;
    }

    public function isPercent(): ?bool
    {
        return $this->isPercent;
    }

    public function getIsPercent(): ?bool
    {
        return $this->isPercent;
    }

    public function setIsPercent(bool $isPercent): static
    {
        $this->isPercent = $isPercent;

        return $this;
    }

    public function setPercent(bool $isPercent): static
    {
        $this->isPercent = $isPercent;

        return $this;
    }
}
