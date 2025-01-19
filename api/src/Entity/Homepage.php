<?php

namespace App\Entity;

use App\Entity\Image;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use Doctrine\DBAL\Types\Types;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\HomepageRepository;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\OpenApi\Model\Operation;
use ApiPlatform\OpenApi\Model\Parameter;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['homepage:read']],
    denormalizationContext: ['groups' => ['homepage:create', 'homepage:update']],
    operations: [
        new GetCollection(security: "is_granted('ROLE_ADMIN')"),
        new Get(security: "is_granted('ROLE_ADMIN')"),
        new Post(security: "is_granted('ROLE_ADMIN')"),
        new Put(security: "is_granted('ROLE_ADMIN')"),
        new Delete(security: "is_granted('ROLE_ADMIN')"),
        new Get(
            routeName: 'get_homepage',
            openapi: new Operation(
                tags: ['Homepage'],
                summary: 'Get a homepage by Locale',
                parameters: [
                    new Parameter(
                        name: 'locale',
                        in: 'path',
                        required: true,
                        schema: ['type' => 'string'],
                        description: 'The code of the locale',
                    ),
                ],
                responses: [
                    '200' => [
                        'description' => 'Product translation retrieved successfully',
                        'content' => [
                            'application/json' => [
                                'schema' => ['type' => 'object'],
                                'example' => [
                                    'id' => 0,
                                    'description' => 'string',
                                    'locale' => 'string',
                                    'slides' => [
                                        [
                                            'id' => 0,
                                            'title' => 'string',
                                            'url_image' => 'string'
                                        ]
                                    ],
                                    'categories' => [
                                        [
                                            'id' => 0,
                                            'name' => 'string',
                                            'url_image' => 'string',
                                        ]
                                    ],
                                    'top_products' => [
                                        [
                                            'id' => 0,
                                            'name' => 'string',
                                            'url_image' => 'string',
                                            'price' => 0.0,
                                        ]
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ),
        ),
    ],
)]
#[ORM\Entity(repositoryClass: HomepageRepository::class)]
class Homepage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([
        'homepage:read'
    ])]
    private ?int $id = null;

    #[Groups([
        'homepage:read', 'homepage:create', 'homepage:update'
    ])]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $text = null;

    #[Groups([
        'homepage:read', 'homepage:create', 'homepage:update'
    ])]
    #[ORM\Column(length: 5)]
    private ?string $locale = null;

    /**
     * @var Collection<int, Slide>
     */
    #[Groups([
        'homepage:read', 'homepage:create', 'homepage:update'
    ])]
    #[ORM\OneToMany(targetEntity: Slide::class, mappedBy: 'homepage', orphanRemoval: true, cascade: ['persist'])]
    private Collection $slides;

    public function __construct()
    {
        $this->slides = new ArrayCollection();
    }

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
     * @return Collection<int, Slide>
     */
    public function getSlides(): Collection
    {
        return $this->slides;
    }

    public function addSlide(Slide $slide): static
    {
        if (!$this->slides->contains($slide)) {
            $this->slides->add($slide);
            $slide->setHomepage($this);
        }

        return $this;
    }

    public function removeSlide(Slide $slide): static
    {
        if ($this->slides->removeElement($slide)) {
            // set the owning side to null (unless already changed)
            if ($slide->getHomepage() === $this) {
                $slide->setHomepage(null);
            }
        }

        return $this;
    }
}
