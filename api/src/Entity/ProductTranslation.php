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
use ApiPlatform\OpenApi\Model\Operation;
use ApiPlatform\OpenApi\Model\Parameter;
use App\Repository\ProductTranslationRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    normalizationContext: ['groups' => ['productTranslation:read']],
    denormalizationContext: ['groups' => ['productTranslation:create', 'productTranslation:update']],
    operations: [
        new GetCollection(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Get(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Post(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Put(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Delete(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_SUPER_ADMIN')"),
        new Get(
            routeName: 'get_product_translation',
            openapi: new Operation(
                tags: ['ProductTranslation'],
                summary: 'Get a product translation by idProduct and codeLocale',
                parameters: [
                    new Parameter(
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: ['type' => 'integer'],
                        description: 'The id of the product',
                    ),
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
                                    'locale' => 'string',
                                    'name' => 'string',
                                    'description' => 'string',
                                    'caracteristic' => 'string',
                                    'price' => 0.0,
                                    'priority' => 0,
                                    'disponibility' => true,
                                    'category' => 'string',
                                ]
                            ],
                        ],
                    ],
                ],
            ),
        ),
    ],
)]
#[ORM\Entity(repositoryClass: ProductTranslationRepository::class)]
class ProductTranslation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['productTranslation:read'])]
    private ?int $id = null;

    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    #[ORM\Column(length: 255)]
    #[Groups([
        'productTranslation:read', 'productTranslation:create', 'productTranslation:update',
        'product:read', 'product:create', 'product:update'
    ])]
    private ?string $name = null;

    #[Groups([
        'productTranslation:read', 'productTranslation:create', 'productTranslation:update',
        'product:read', 'product:create', 'product:update'
    ])]
    #[Assert\NotBlank]
    #[Assert\Length(max: 2000)]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;


    #[Assert\Length(max: 3000)]
    #[ORM\Column(type: Types::TEXT)]
    #[Groups([
        'productTranslation:read', 'productTranslation:create', 'productTranslation:update',
        'product:read', 'product:create', 'product:update'
    ])]
    private ?string $caracteristic = null;

    #[ORM\ManyToOne(inversedBy: 'productTranslations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups([
        'productTranslation:read', 'productTranslation:create', 'productTranslation:update',
    ])]
    private ?Product $product = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(referencedColumnName: "code", nullable: false)]
    #[Groups([
        'productTranslation:read', 'productTranslation:create', 'productTranslation:update',
        'product:read', 'product:create', 'product:update'
    ])]
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

    public function getCaracteristic(): ?string
    {
        return $this->caracteristic;
    }

    public function setCaracteristic(string $caracteristic): static
    {
        $this->caracteristic = $caracteristic;

        return $this;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): static
    {
        $this->product = $product;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }
}
