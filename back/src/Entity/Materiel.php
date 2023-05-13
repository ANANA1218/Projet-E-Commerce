<?php

namespace App\Entity;

use App\Repository\MaterielRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MaterielRepository::class)]
class Materiel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $id_materiel = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $nom = null;

    public function getIdMateriel(): ?int
    {
        return $this->id_materiel;
    }

    public function setIdMateriel(int $id_materiel): self
    {
        $this->id_materiel = $id_materiel;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;
        $this->nom = $nom;

        return $this;
    }
}
