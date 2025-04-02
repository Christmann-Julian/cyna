<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\OrderLineRepository;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['orderline:read']],
    denormalizationContext: ['groups' => ['orderline:create', 'orderline:update']],
    operations: [
        new GetCollection(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Get(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Post(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Put(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Delete(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
    ],
)]
#[ORM\Entity(repositoryClass: OrderLineRepository::class)]
class OrderLine
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups([
        'promo:read', 'promo:create', 'promo:update',
        'orderline:read',
    ])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups([
        'promo:read', 'promo:create', 'promo:update',
        'orderline:read',
    ])]
    #[ORM\Column]
    private ?int $quantity = null;

    #[Groups([
        'promo:read', 'promo:create', 'promo:update',
        'orderline:read',
    ])]
    #[ORM\Column]
    private ?float $price = null;

    #[Groups([
        'promo:read', 'promo:create', 'promo:update',
        'orderline:read',
    ])]
    #[ORM\Column(nullable: true)]
    private ?float $promotionPrice = null;

    #[ORM\ManyToOne(inversedBy: 'orderLines')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Order $orderRef = null;

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

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): static
    {
        $this->quantity = $quantity;

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

    public function getPromotionPrice(): ?float
    {
        return $this->promotionPrice;
    }

    public function setPromotionPrice(?float $promotionPrice): static
    {
        $this->promotionPrice = $promotionPrice;

        return $this;
    }

    public function getOrderRef(): ?Order
    {
        return $this->orderRef;
    }

    public function setOrderRef(?Order $orderRef): static
    {
        $this->orderRef = $orderRef;

        return $this;
    }
}
