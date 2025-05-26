<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductRepository;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use Doctrine\Common\Collections\ArrayCollection;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    normalizationContext: ['groups' => ['product:read']],
    denormalizationContext: ['groups' => ['product:create', 'product:update']],
    operations: [
        new GetCollection(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Get(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Post(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Put(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Delete(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
    ],
)]
#[ApiFilter(OrderFilter::class, properties: ['id', 'price', 'priority', 'disponibility', 'top_product', 'position', 'promotionActive', 'promotionLabel', 'promotionPrice'])]
#[ApiFilter(SearchFilter::class, properties: ['productTranslations.name' => 'partial'])]
#[ORM\Entity(repositoryClass: ProductRepository::class)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([
        'product:read'
    ])]
    private ?int $id = null;

    #[Assert\NotBlank]
    #[ORM\Column]
    #[Groups([
        'product:read', 'product:create', 'product:update'
    ])]
    private ?float $price = null;

    #[ORM\Column(nullable: true)]
    #[Groups([
        'product:read', 'product:create', 'product:update'
    ])]
    private ?int $priority = null;

    #[ORM\Column]
    #[Groups([
        'product:read', 'product:create', 'product:update'
    ])]
    private ?bool $disponibility = null;

    /**
     * @var Collection<int, ProductTranslation>
     */
    #[Groups([
        'product:read', 'product:create', 'product:update'
    ])]
    #[ORM\OneToMany(targetEntity: ProductTranslation::class, mappedBy: 'product', orphanRemoval: true, cascade: ['persist'])]
    private Collection $productTranslations;

    #[ORM\ManyToOne(inversedBy: 'product')]
    #[Groups([
        'product:read', 'product:create', 'product:update'
    ])]
    private ?Category $category = null;

    #[Groups([
        'product:read', 'product:create', 'product:update'
    ])]
    #[ORM\Column]
    private ?bool $top_product = null;

    #[Groups([
        'product:read', 'product:create', 'product:update'
    ])]
    #[ORM\Column(nullable: true)]
    private ?int $position = null;

    #[Groups([
        'product:read', 'product:create', 'product:update'
    ])]
    #[ORM\ManyToOne(targetEntity: MediaObject::class)]
    private ?MediaObject $image = null;

    #[Groups([
        'product:read', 'product:create', 'product:update'
    ])]
    #[ORM\Column]
    private ?bool $promotionActive = null;

    #[Groups([
        'product:read', 'product:create', 'product:update'
    ])]
    #[ORM\Column(length: 25, nullable: true)]
    private ?string $promotionLabel = null;

    #[Groups([
        'product:read', 'product:create', 'product:update'
    ])]
    #[ORM\Column(nullable: true)]
    private ?float $promotionPrice = null;

    /**
     * @var Collection<int, ProductImage>
     */
    #[Groups([
        'product:read', 'product:create', 'product:update'
    ])]
    #[ORM\OneToMany(targetEntity: ProductImage::class, mappedBy: 'product', orphanRemoval: true, cascade: ['persist'])]
    private Collection $productImages;

    public function __construct()
    {
        $this->productTranslations = new ArrayCollection();
        $this->productImages = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getPriority(): ?int
    {
        return $this->priority;
    }

    public function setPriority(?int $priority): static
    {
        $this->priority = $priority;

        return $this;
    }

    public function isDisponibility(): ?bool
    {
        return $this->disponibility;
    }

    public function setDisponibility(bool $disponibility): static
    {
        $this->disponibility = $disponibility;

        return $this;
    }

    /**
     * @return Collection<int, ProductTranslation>
     */
    public function getProductTranslations(): Collection
    {
        return $this->productTranslations;
    }

    public function addProductTranslation(ProductTranslation $productTranslation): static
    {
        if (!$this->productTranslations->contains($productTranslation)) {
            $this->productTranslations->add($productTranslation);
            $productTranslation->setProduct($this);
        }

        return $this;
    }

    public function removeProductTranslation(ProductTranslation $productTranslation): static
    {
        if ($this->productTranslations->removeElement($productTranslation)) {
            // set the owning side to null (unless already changed)
            if ($productTranslation->getProduct() === $this) {
                $productTranslation->setProduct(null);
            }
        }

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function isTopProduct(): ?bool
    {
        return $this->top_product;
    }

    public function setTopProduct(bool $top_product): static
    {
        $this->top_product = $top_product;

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

    public function getImage(): ?MediaObject
    {
        return $this->image;
    }

    public function setImage(?MediaObject $image): static
    {
        $this->image = $image;

        return $this;
    }

    #[Groups(['product:read'])]
    public function getImageUrl(): ?string
    {
        return $this->image?->getContentUrl();
    }

    public function isPromotionActive(): ?bool
    {
        return $this->promotionActive;
    }

    public function setPromotionActive(bool $promotionActive): static
    {
        $this->promotionActive = $promotionActive;

        return $this;
    }

    public function getPromotionLabel(): ?string
    {
        return $this->promotionLabel;
    }

    public function setPromotionLabel(?string $promotionLabel): static
    {
        $this->promotionLabel = $promotionLabel;

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

    /**
     * @return Collection<int, ProductImage>
     */
    public function getProductImages(): Collection
    {
        return $this->productImages;
    }

    public function addProductImage(ProductImage $productImage): static
    {
        if (!$this->productImages->contains($productImage)) {
            $this->productImages->add($productImage);
            $productImage->setProduct($this);
        }

        return $this;
    }

    public function removeProductImage(ProductImage $productImage): static
    {
        if ($this->productImages->removeElement($productImage)) {
            // set the owning side to null (unless already changed)
            if ($productImage->getProduct() === $this) {
                $productImage->setProduct(null);
            }
        }

        return $this;
    }
}
