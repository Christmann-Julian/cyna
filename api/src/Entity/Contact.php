<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use Doctrine\DBAL\Types\Types;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ContactRepository;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    normalizationContext: ['groups' => ['contact:read']],
    denormalizationContext: ['groups' => ['contact:create', 'contact:update']],
    operations: [
        new GetCollection(security: "is_granted('ROLE_ADMIN')"),
        new Get(security: "is_granted('ROLE_ADMIN')"),
        new Post(),
        new Delete(security: "is_granted('ROLE_ADMIN')"),
    ],
)]
#[ApiFilter(OrderFilter::class, properties: ['id', 'email', 'subject', 'message', 'send_at'])]
#[ApiFilter(SearchFilter::class, properties: ['email' => 'partial'])]
#[ORM\Entity(repositoryClass: ContactRepository::class)]
class Contact
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups([
        'contact:read', 'contact:create', 'contact:update'
    ])]
    #[Assert\NotBlank]
    #[Assert\Email]
    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[Groups([
        'contact:read', 'contact:create', 'contact:update'
    ])]
    #[Assert\NotBlank]
    #[Assert\Length(min: 3, max: 255)]
    #[ORM\Column(length: 255)]
    private ?string $subject = null;

    #[Groups([
        'contact:read', 'contact:create', 'contact:update'
    ])]
    #[Assert\NotBlank]
    #[Assert\Length(min: 3, max: 2000)]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $message = null;

    #[Groups([
        'contact:read'
    ])]
    #[ORM\Column(options: ['default' => 'CURRENT_TIMESTAMP'])]
    private ?\DateTimeImmutable $send_at = null;

    public function __construct()
    {
        $this->send_at = new \DateTimeImmutable('now', new \DateTimeZone('Europe/Paris'));
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getSubject(): ?string
    {
        return $this->subject;
    }

    public function setSubject(string $subject): static
    {
        $this->subject = $subject;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): static
    {
        $this->message = $message;

        return $this;
    }

    public function getSendAt(): ?\DateTimeImmutable
    {
        return $this->send_at;
    }

    public function setSendAt(\DateTimeImmutable $send_at): static
    {
        $this->send_at = $send_at;

        return $this;
    }
}
