<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    operations: [
        new Get(
            security: "is_granted('ROLE_USER') and object == user",
            routeName: 'get_user_payment_methods',
        ),
        new Put(security: "is_granted('ROLE_USER') and object == user"),
        new Patch(security: "is_granted('ROLE_USER') and object == user"),
        new Post(security: "is_granted('ROLE_USER') and object == user"),
        new Delete(
            security: "is_granted('ROLE_USER') and object == user",
            routeName: 'delete_payment_method',
        ),
        new Post(
            security: "is_granted('ROLE_USER') and object == user",
            routeName: 'add_payment_method',
        ),
    ],
)]
#[ORM\Entity]
class PaymentMethod
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    private ?string $stripePaymentMethodId = null;

    #[Groups([
        'order:read',
    ])]
    #[ORM\Column(type: 'string', length: 4)]
    #[Assert\NotBlank]
    private ?string $last4 = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    private ?string $brand = null;

    #[ORM\Column(type: 'string', length: 2)]
    #[Assert\NotBlank]
    private ?string $expiryMonth = null;

    #[ORM\Column(type: 'string', length: 4)]
    #[Assert\NotBlank]
    private ?string $expiryYear = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'paymentMethods')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    /**
     * @var Collection<int, Order>
     */
    #[ORM\OneToMany(targetEntity: Order::class, mappedBy: 'paymentMethod')]
    private Collection $orders;

    public function __construct()
    {
        $this->orders = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStripePaymentMethodId(): ?string
    {
        return $this->stripePaymentMethodId;
    }

    public function setStripePaymentMethodId(string $stripePaymentMethodId): self
    {
        $this->stripePaymentMethodId = $stripePaymentMethodId;
        return $this;
    }

    public function getLast4(): ?string
    {
        return $this->last4;
    }

    public function setLast4(string $last4): self
    {
        $this->last4 = $last4;
        return $this;
    }

    public function getBrand(): ?string
    {
        return $this->brand;
    }

    public function setBrand(string $brand): self
    {
        $this->brand = $brand;
        return $this;
    }

    public function getExpiryMonth(): ?string
    {
        return $this->expiryMonth;
    }

    public function setExpiryMonth(string $expiryMonth): self
    {
        $this->expiryMonth = $expiryMonth;
        return $this;
    }

    public function getExpiryYear(): ?string
    {
        return $this->expiryYear;
    }

    public function setExpiryYear(string $expiryYear): self
    {
        $this->expiryYear = $expiryYear;
        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;
        return $this;
    }

    /**
     * @return Collection<int, Order>
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): static
    {
        if (!$this->orders->contains($order)) {
            $this->orders->add($order);
            $order->setPaymentMethod($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): static
    {
        if ($this->orders->removeElement($order)) {
            // set the owning side to null (unless already changed)
            if ($order->getPaymentMethod() === $this) {
                $order->setPaymentMethod(null);
            }
        }

        return $this;
    }
}
