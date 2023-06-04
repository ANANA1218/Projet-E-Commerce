<?php

namespace App\Entity;

use App\Repository\AssoAdresseFacturationUtilisateurRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=AssoAdresseFacturationUtilisateurRepository::class)
 * @ORM\Table(name="asso_adresse_facturation_utilisateur")
 */
class AssoAdresseFacturationUtilisateur
{
    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity=Utilisateur::class, inversedBy="assoAdressesFacturationUtilisateur")
     * @ORM\JoinColumn(name="id_utilisateur", referencedColumnName="id_utilisateur", nullable=false)
     */
    private ?Utilisateur $utilisateur = null;

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity=AdresseFacturation::class)
     * @ORM\JoinColumn(name="id_adresse_facturation", referencedColumnName="id_adresse_facturation", nullable=false)
     */
    private ?AdresseFacturation $adresseFacturation = null;

    // Getters and Setters

    public function getUtilisateur(): ?Utilisateur
    {
        return $this->utilisateur;
    }

    public function setUtilisateur(?Utilisateur $utilisateur): self
    {
        $this->utilisateur = $utilisateur;
        return $this;
    }

    public function getAdresseFacturation(): ?AdresseFacturation
    {
        return $this->adresseFacturation;
    }

    public function setAdresseFacturation(?AdresseFacturation $adresseFacturation): self
    {
        $this->adresseFacturation = $adresseFacturation;
        return $this;
    }
}
