<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\LocaleCynaRepository;

#[ApiResource(
    operations: []
)]
#[ORM\Entity(repositoryClass: LocaleCynaRepository::class)]
class LocaleCyna
{
    #[ORM\Id]
    #[ORM\Column(length: 5, nullable: false, unique: true)]
    private ?string $code = null;

    public function getCode(): ?string
    {
        return $this->code;
    }
}
