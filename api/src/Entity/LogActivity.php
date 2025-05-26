<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\LogActivityRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use Doctrine\Common\Collections\ArrayCollection;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['logActivity:read']],
    denormalizationContext: ['groups' => ['logActivity:create', 'logActivity:update']],
    operations: [
        new GetCollection(security: "is_granted('ROLE_SUPER_ADMIN')"),
        new Get(security: "is_granted('ROLE_SUPER_ADMIN')"),
        new Post(security: "is_granted('ROLE_SUPER_ADMIN')"),
        new Delete(security: "is_granted('ROLE_SUPER_ADMIN')"),
    ],
)]
#[ApiFilter(OrderFilter::class, properties: ['id', 'user', 'action', 'entityType', 'entityId', 'createdAt'])]
#[ApiFilter(SearchFilter::class, properties: ['user' => 'partial'])]
#[ORM\Entity(repositoryClass: LogActivityRepository::class)]
class LogActivity
{
    #[Groups([
        'logActivity:read'
    ])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups([
        'logActivity:read', 'logActivity:create', 'logActivity:update'
    ])]
    #[ORM\Column(length: 255)]
    private ?string $user = null;

    #[Groups([
        'logActivity:read', 'logActivity:create', 'logActivity:update'
    ])]
    #[ORM\Column(length: 50)]
    private ?string $action = null;

    #[Groups([
        'logActivity:read', 'logActivity:create', 'logActivity:update'
    ])]
    #[ORM\Column(length: 50)]
    private ?string $entityType = null;

    #[Groups([
        'logActivity:read', 'logActivity:create', 'logActivity:update'
    ])]
    #[ORM\Column(nullable: true)]
    private ?int $entityId = null;

    #[Groups([
        'logActivity:read', 'logActivity:create', 'logActivity:update'
    ])]
    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    /**
     * @var Collection<int, LogField>
     */
    #[Groups([
        'logActivity:read'
    ])]
    #[ORM\OneToMany(targetEntity: LogField::class, mappedBy: 'logActivity')]
    private Collection $logFields;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->logFields = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?string
    {
        return $this->user;
    }

    public function setUser(string $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getAction(): ?string
    {
        return $this->action;
    }

    public function setAction(string $action): static
    {
        $this->action = $action;

        return $this;
    }

    public function getEntityType(): ?string
    {
        return $this->entityType;
    }

    public function setEntityType(string $entityType): static
    {
        $this->entityType = $entityType;

        return $this;
    }

    public function getEntityId(): ?int
    {
        return $this->entityId;
    }

    public function setEntityId(?int $entityId): static
    {
        $this->entityId = $entityId;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return Collection<int, LogField>
     */
    public function getLogFields(): Collection
    {
        return $this->logFields;
    }

    public function addLogField(LogField $logField): static
    {
        if (!$this->logFields->contains($logField)) {
            $this->logFields->add($logField);
            $logField->setLogActivity($this);
        }

        return $this;
    }

    public function removeLogField(LogField $logField): static
    {
        if ($this->logFields->removeElement($logField)) {
            // set the owning side to null (unless already changed)
            if ($logField->getLogActivity() === $this) {
                $logField->setLogActivity(null);
            }
        }

        return $this;
    }
}
