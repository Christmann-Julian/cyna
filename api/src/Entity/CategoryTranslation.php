<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use Doctrine\DBAL\Types\Types;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\CategoryTranslationRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    normalizationContext: ['groups' => ['categoryTranslation:read']],
    denormalizationContext: ['groups' => ['categoryTranslation:create', 'categoryTranslation:update']],
    operations: [
        new GetCollection(security: "is_granted('ROLE_ADMIN')"),
        new Get(security: "is_granted('ROLE_ADMIN')"),
        new Get(routeName:"get_category_translation"),
        new Get(routeName:"get_all_category_translation"),
        new Post(security: "is_granted('ROLE_ADMIN')"),
        new Put(security: "is_granted('ROLE_ADMIN')"),
        new Delete(security: "is_granted('ROLE_ADMIN')"),
    ],
)]
#[ORM\Entity(repositoryClass: CategoryTranslationRepository::class)]
class CategoryTranslation
{
    #[Groups([
        'categoryTranslation:read'
    ])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups([
        'categoryTranslation:read', 'categoryTranslation:create', 'categoryTranslation:update',
        'category:read', 'category:create', 'category:update'
    ])]
    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups([
        'categoryTranslation:read', 'categoryTranslation:create', 'categoryTranslation:update',
        'category:read', 'category:create', 'category:update'
    ])]
    #[Assert\NotBlank]
    #[Assert\Length(max: 2000)]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[Groups([
        'categoryTranslation:read', 'categoryTranslation:create', 'categoryTranslation:update'
    ])]
    #[ORM\ManyToOne(inversedBy: 'categoryTranslations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Category $category = null;

    #[Groups([
        'categoryTranslation:read', 'categoryTranslation:create', 'categoryTranslation:update',
        'category:read', 'category:create', 'category:update'
    ])]
    #[ORM\ManyToOne]
    #[ORM\JoinColumn(referencedColumnName:"code", nullable: false)]
    private ?LocaleCyna $locale = null;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

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

    public function getLocale(): ?LocaleCyna
    {
        return $this->locale;
    }

    public function setLocale(?LocaleCyna $locale): static
    {
        $this->locale = $locale;

        return $this;
    }
}
