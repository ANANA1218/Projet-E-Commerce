<?php

namespace App\Entity;

use App\Repository\AssoAdresseLivraisonUtilisateurRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AssoAdresseLivraisonUtilisateurRepository::class)]
/**
 * @ORM\Entity(repositoryClass=AssoAdresseLivraisonUtilisateurRepository::class)
 * @ORM\Table(name="asso_adresse_livraison_utilisateur")
 */
class AssoAdresseLivraisonUtilisateur
{
    #[ORM\Id]
    #[ORM\ManyToOne(targetEntity: 'Utilisateur', inversedBy: 'assoAdresseLivraisonUtilisateur')]
    #[ORM\JoinColumn(name: 'id_utilisateur', referencedColumnName: 'id_utilisateur', nullable: false)]
    private ?Utilisateur $id_utilisateur = null;

    #[ORM\Id]
    #[ORM\ManyToOne(targetEntity: 'AdresseLivraison', inversedBy: 'assoAdresseLivraisonUtilisateur')]
    #[ORM\JoinColumn(name: 'id_adresse_livraison', referencedColumnName: 'id_adresse_livraison', nullable: false)]
    private ?AdresseLivraison $id_adresse_livraison = null;

    // Getters and Setters

    public function getUtilisateur(): ?Utilisateur
    {
        return $this->id_utilisateur;
    }

    public function setUtilisateur(?Utilisateur $id_utilisateur): self
    {
        $this->id_utilisateur = $id_utilisateur;
        return $this;
    }

    public function getAdresseLivraison(): ?AdresseLivraison
    {
        return $this->id_adresse_livraison;
    }

    public function setAdresseLivraison(?AdresseLivraison $id_adresse_livraison): self
    {
        $this->id_adresse_livraison = $id_adresse_livraison;
        return $this;
    }
}
