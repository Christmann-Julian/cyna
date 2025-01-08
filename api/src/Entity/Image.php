<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ImageRepository;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['image:read']],
    denormalizationContext: ['groups' => ['image:create', 'image:update']],
    operations: [
        new GetCollection(security: "is_granted('ROLE_ADMIN')"),
        new Get(security: "is_granted('ROLE_ADMIN')"),
        new Post(security: "is_granted('ROLE_ADMIN')"),
        new Put(security: "is_granted('ROLE_ADMIN')"),
        new Delete(security: "is_granted('ROLE_ADMIN')"),
    ],
)]
#[ORM\Entity(repositoryClass: ImageRepository::class)]
class Image
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups([
        'homepage:read', 'homepage:create', 'homepage:update',
        'image:read', 'image:create', 'image:update'
    ])]
    #[ORM\Column(length: 255)]
    private ?string $text = null;

    #[Groups([
        'homepage:read', 'homepage:create', 'homepage:update',
        'image:read', 'image:create', 'image:update'
    ])]
    #[ORM\Column(length: 255)]
    private ?string $url_image = null;

    #[Groups([
        'image:read'
    ])]
    #[ORM\ManyToOne(inversedBy: 'images')]
    private ?Homepage $homepage = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getUrlImage(): ?string
    {
        return $this->url_image;
    }

    public function setUrlImage(string $url_image): static
    {
        $this->url_image = $url_image;

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
}
