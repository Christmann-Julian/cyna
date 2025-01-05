<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\ProductTranslation;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductRepository;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use Doctrine\Common\Collections\ArrayCollection;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['product:read']],
    denormalizationContext: ['groups' => ['product:create', 'product:update']],
    operations: [
        new GetCollection(security: "is_granted('ROLE_ADMIN')"),
        new Get(security: "is_granted('ROLE_ADMIN')"),
        new Post(security: "is_granted('ROLE_ADMIN')"),
        new Put(security: "is_granted('ROLE_ADMIN')"),
        new Delete(security: "is_granted('ROLE_ADMIN')"),
    ],
)]
#[ApiFilter(OrderFilter::class, properties: ['id', 'price', 'priority', 'disponibility'])]
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
        'product:read',
    ])]
    private ?TopProduct $topProduct = null;

    #[ORM\ManyToOne(inversedBy: 'product')]
    #[Groups([
        'product:read',
    ])]
    private ?Category $category = null;

    #[Groups([
        'product:read',
    ])]
    #[ORM\Column(length: 255)]
    private ?string $url_image = null;

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

    public function getUrlImage(): ?string
    {
        return $this->url_image;
    }

    public function setUrlImage(string $url_image): static
    {
        $this->url_image = $url_image;

        return $this;
    }
}
