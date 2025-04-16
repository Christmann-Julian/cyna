<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\LogFieldRepository;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['logField:read']],
    denormalizationContext: ['groups' => ['logField:create', 'logField:update']],
    operations: [
        new GetCollection(security: "is_granted('ROLE_SUPER_ADMIN')"),
        new Get(security: "is_granted('ROLE_SUPER_ADMIN')"),
        new Post(security: "is_granted('ROLE_SUPER_ADMIN')"),
        new Delete(security: "is_granted('ROLE_SUPER_ADMIN')"),
    ],
)]
#[ORM\Entity(repositoryClass: LogFieldRepository::class)]
class LogField
{
    #[Groups([
        'logField:read',
        'logActivity:read',
    ])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups([
        'logField:read',
        'logActivity:read',
    ])]
    #[ORM\Column(length: 255)]
    private ?string $field = null;

    #[Groups([
        'logField:read',
    ])]
    #[ORM\ManyToOne(inversedBy: 'logFields')]
    private ?LogActivity $logActivity = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getField(): ?string
    {
        return $this->field;
    }

    public function setField(string $field): static
    {
        $this->field = $field;

        return $this;
    }

    public function getLogActivity(): ?LogActivity
    {
        return $this->logActivity;
    }

    public function setLogActivity(?LogActivity $logActivity): static
    {
        $this->logActivity = $logActivity;

        return $this;
    }
}
