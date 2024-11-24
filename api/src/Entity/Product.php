<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Entity\ProductTranslation;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['product:read']],
    denormalizationContext: ['groups' => ['product:create', 'product:update']],
    operations: [],
)]
#[ORM\Entity(repositoryClass: ProductRepository::class)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([
        'productTranslation:read'
    ])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups([
        'productTranslation:read'
    ])]
    private ?float $price = null;

    #[ORM\Column(nullable: true)]
    #[Groups([
        'productTranslation:read'
    ])]
    private ?int $priority = null;

    #[ORM\Column]
    #[Groups([
        'productTranslation:read'
    ])]
    private ?bool $disponibility = null;

    /**
     * @var Collection<int, ProductTranslation>
     */
    #[ORM\OneToMany(targetEntity: ProductTranslation::class, mappedBy: 'product', orphanRemoval: true)]
    private Collection $productTranslations;

    #[ORM\ManyToOne(inversedBy: 'product')]
    #[Groups([
        'productTranslation:read'
    ])]
    private ?TopProduct $topProduct = null;

    #[ORM\ManyToOne(inversedBy: 'product')]
    #[Groups([
        'productTranslation:read'
    ])]
    private ?Category $category = null;

    public function __construct()
    {
        $this->productTranslations = new ArrayCollection();
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

    public function getTopProduct(): ?TopProduct
    {
        return $this->topProduct;
    }

    public function setTopProduct(?TopProduct $topProduct): static
    {
        $this->topProduct = $topProduct;

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
}
