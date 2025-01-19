<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\SlideRepository;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['slide:read']],
    denormalizationContext: ['groups' => ['slide:create', 'slide:update']],
    operations: [
        new GetCollection(security: "is_granted('ROLE_ADMIN')"),
        new Get(security: "is_granted('ROLE_ADMIN')"),
        new Post(security: "is_granted('ROLE_ADMIN')"),
        new Put(security: "is_granted('ROLE_ADMIN')"),
        new Delete(security: "is_granted('ROLE_ADMIN')"),
    ],
)]
#[ORM\Entity(repositoryClass: SlideRepository::class)]
class Slide
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups([
        'homepage:read', 'homepage:create', 'homepage:update',
        'slide:read', 'slide:create', 'slide:update'
    ])]
    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[Groups([
        'homepage:read', 'homepage:create', 'homepage:update',
        'slide:read', 'slide:create', 'slide:update'
    ])]
    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?MediaObject $image = null;

    #[Groups(['slide:read'])]
    #[ORM\ManyToOne(inversedBy: 'slides')]
    private ?Homepage $homepage = null;

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

    public function getImage(): ?MediaObject
    {
        return $this->image;
    }

    public function setImage(?MediaObject $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getHomepage(): ?Homepage
    {
        return $this->homepage;
    }

    public function setHomepage(?Homepage $homepage): static
    {
        $this->homepage = $homepage;

        return $this;
    }

    #[Groups(['slide:read', 'homepage:read'])]
    public function getImageUrl(): ?string
    {
        return $this->image?->getContentUrl();
    }
}
