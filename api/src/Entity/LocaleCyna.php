<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\LocaleCynaRepository;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['locale:read']],
    operations: [
        new Get(),
    ]
)]
#[ORM\Entity(repositoryClass: LocaleCynaRepository::class)]
class LocaleCyna
{
    #[ORM\Id]
    #[ORM\Column(length: 5, nullable: false, unique: true)]
    #[Groups(['locale:read'])]
    private ?string $code = null;

    public function getCode(): ?string
    {
        return $this->code;
    }
}
