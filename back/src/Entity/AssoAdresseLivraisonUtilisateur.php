<?php

namespace App\Entity;

use App\Repository\AssoAdresseLivraisonUtilisateurRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=AssoAdresseLivraisonUtilisateurRepository::class)
 * @ORM\Table(name="asso_adresse_livraison_utilisateur")
 */
class AssoAdresseLivraisonUtilisateur
{
    #[ORM\Id]
    #[ORM\ManyToOne(targetEntity: 'Utilisateur', inversedBy: 'assoAdressesFacturationUtilisateur')]
    #[ORM\JoinColumn(name: 'id_utilisateur', referencedColumnName: 'id_utilisateur', nullable: false)]
    private ?Utilisateur $utilisateur = null;

 
    #[ORM\Id]
    #[ORM\ManyToOne(targetEntity: 'AdresseLivraison', inversedBy: 'assoAdressesFacturationUtilisateur')]
    #[ORM\JoinColumn(name: 'id_adresse_livraison', referencedColumnName: 'id_adresse_livraison', nullable: false)]
    private ?AdresseLivraison $adresseLivraison = null;

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

    public function getAdresseLivraison(): ?AdresseLivraison
    {
        return $this->adresseLivraison;
    }

    public function setAdresseLivraison(?AdresseLivraison $adresseLivraison): self
    {
        $this->adresseLivraison = $adresseLivraison;
        return $this;
    }
}
