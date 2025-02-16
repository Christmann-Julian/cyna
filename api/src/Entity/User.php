<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\State\PasswordHasherStateProcessor;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
#[UniqueEntity(fields: ['email'], message: 'Email is already used.')]
#[ApiResource(
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:create', 'user:update']],
    operations: [
        new GetCollection(security: "is_granted('ROLE_ADMIN')"),
        new Get(security: "is_granted('ROLE_ADMIN') or object == user"),
        new Put(processor: PasswordHasherStateProcessor::class, security: "is_granted('ROLE_ADMIN') or object == user"),
        new Patch(processor: PasswordHasherStateProcessor::class, security: "is_granted('ROLE_ADMIN') or object == user"),
        new Post(processor: PasswordHasherStateProcessor::class, validationContext: ['groups' => ['Default', 'user:create']]),
        new Delete(security: "is_granted('ROLE_ADMIN') or object == user"),
    ],
)]
#[ApiFilter(OrderFilter::class, properties: ['id', 'roles', 'email', 'firstname', 'lastname'])]
#[ApiFilter(SearchFilter::class, properties: ['email' => 'partial'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Assert\NotBlank]
    #[Assert\Length(max: 180)]
    #[Assert\Regex(pattern: '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,5}$/', match: true)]
    #[Groups(['user:read', 'user:create', 'user:update'])]
    private ?string $email = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    #[Assert\Type('array')]
    #[Assert\Choice(choices: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN'], multiple: true)]
    #[Groups(['user:read', 'user:create'])]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[Assert\NotBlank(groups: ['user:create'])]
    #[Assert\Length(min: 8, max: 255)]
    #[Assert\Regex(pattern: '/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/', match: true)]
    #[Groups(['user:create', 'user:update'])]
    private ?string $plainPassword = null;

    #[Assert\NotBlank]
    #[ORM\Column(length: 255)]
    #[Assert\Length(min: 2, max: 50)]
    #[Groups(['user:read', 'user:create', 'user:update'])]
    private ?string $firstname = null;

    #[Assert\NotBlank]
    #[ORM\Column(length: 255)]
    #[Assert\Length(min: 2, max: 50)]
    #[Groups(['user:read', 'user:create', 'user:update'])]
    private ?string $lastname = null;

    #[ORM\Column(type: 'boolean')]
    #[Assert\Type('bool')]
    #[Groups(['user:read', 'user:create', 'user:update'])]
    private bool $isEmailVerified = false;

    /**
     * @var Collection<int, Address>
     */
    #[ORM\OneToMany(targetEntity: Address::class, mappedBy: 'user')]
    private Collection $addresses;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $stripeCustomerId = null;

    #[ORM\Column(length: 10, nullable: true)]
    private ?string $twoFaCode = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $twoFaExpiresAt = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[Groups(['user:read', 'user:create', 'user:update'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $updated_at = null;

    public function __construct()
    {
        $this->created_at = new \DateTimeImmutable();
        $this->updated_at = new \DateTimeImmutable();
        $this->addresses = new ArrayCollection();
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

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * Method used by LexikJWTAuthenticationBundle to get the user identifier
     */
    public function getUsername(): string
    {
        return $this->getUserIdentifier();
    }

    /**
     * @see UserInterface
     *
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function isEmailVerified(): bool
    {
        return $this->isEmailVerified;
    }

    public function setIsEmailVerified(bool $isEmailVerified): static
    {
        $this->isEmailVerified = $isEmailVerified;

        return $this;
    }

    /**
     * @return Collection<int, Address>
     */
    public function getAddresses(): Collection
    {
        return $this->addresses;
    }

    public function addAddress(Address $address): static
    {
        if (!$this->addresses->contains($address)) {
            $this->addresses->add($address);
            $address->setUser($this);
        }

        return $this;
    }

    public function removeAddress(Address $address): static
    {
        if ($this->addresses->removeElement($address)) {
            // set the owning side to null (unless already changed)
            if ($address->getUser() === $this) {
                $address->setUser(null);
            }
        }

        return $this;
    }

    public function getStripeCustomerId(): ?string
    {
        return $this->stripeCustomerId;
    }

    public function setStripeCustomerId(?string $stripeCustomerId): self
    {
        $this->stripeCustomerId = $stripeCustomerId;

        return $this;
    }

    public function getTwoFaCode(): ?string
    {
        return $this->twoFaCode;
    }

    public function setTwoFaCode(?string $twoFaCode): static
    {
        $this->twoFaCode = $twoFaCode;

        return $this;
    }

    public function getTwoFaExpiresAt(): ?\DateTimeImmutable
    {
        return $this->twoFaExpiresAt;
    }

    public function setTwoFaExpiresAt(?\DateTimeImmutable $twoFaExpiresAt): static
    {
        $this->twoFaExpiresAt = $twoFaExpiresAt;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(\DateTimeImmutable $updated_at): static
    {
        $this->updated_at = new \DateTimeImmutable();

        return $this;
    }
}
