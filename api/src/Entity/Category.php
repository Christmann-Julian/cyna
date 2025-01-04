<?php

namespace App\Entity;

use App\Entity\Product;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\CategoryTranslation;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\CategoryRepository;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['category:read']],
    denormalizationContext: ['groups' => ['category:create', 'category:update']],
    operations: [
        new GetCollection(security: "is_granted('ROLE_ADMIN')"),
        new Get(security: "is_granted('ROLE_ADMIN')"),
        new Post(security: "is_granted('ROLE_ADMIN')"),
        new Put(security: "is_granted('ROLE_ADMIN')"),
        new Delete(security: "is_granted('ROLE_ADMIN')"),
    ],
)]
#[ORM\Entity(repositoryClass: CategoryRepository::class)]
class Category
{
    #[Groups([
        'category:read', 'category:create', 'category:update'
    ])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups([
        'category:read', 'category:create', 'category:update'
    ])]
    #[ORM\Column(length: 255)]
    private ?string $url_image = null;

    /**
     * @var Collection<int, Product>
     */
    #[ORM\OneToMany(targetEntity: Product::class, mappedBy: 'category')]    
    private Collection $product;

    /**
     * @var Collection<int, CategoryTranslation>
     */    
    #[ORM\OneToMany(targetEntity: CategoryTranslation::class, mappedBy: 'category', orphanRemoval: true)]
    private Collection $categoryTranslations;

    public function __construct()
    {
        $this->product = new ArrayCollection();
        $this->categoryTranslations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    /**
     * @return Collection<int, Product>
     */
    public function getProduct(): Collection
    {
        return $this->product;
    }

    public function addProduct(Product $product): static
    {
        if (!$this->product->contains($product)) {
            $this->product->add($product);
            $product->setCategory($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): static
    {
        if ($this->product->removeElement($product)) {
            // set the owning side to null (unless already changed)
            if ($product->getCategory() === $this) {
                $product->setCategory(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, CategoryTranslation>
     */
    public function getCategoryTranslations(): Collection
    {
        return $this->categoryTranslations;
    }

    public function addCategoryTranslation(CategoryTranslation $categoryTranslation): static
    {
        if (!$this->categoryTranslations->contains($categoryTranslation)) {
            $this->categoryTranslations->add($categoryTranslation);
            $categoryTranslation->setCategory($this);
        }

        return $this;
    }

    public function removeCategoryTranslation(CategoryTranslation $categoryTranslation): static
    {
        if ($this->categoryTranslations->removeElement($categoryTranslation)) {
            // set the owning side to null (unless already changed)
            if ($categoryTranslation->getCategory() === $this) {
                $categoryTranslation->setCategory(null);
            }
        }

        return $this;
    }
}
