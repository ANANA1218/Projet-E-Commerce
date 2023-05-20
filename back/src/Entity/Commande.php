<?php

namespace App\Entity;

use App\Repository\CommandeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: CommandeRepository::class)]
class Commande
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id_commande = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date_commande = null;

    #[ORM\Column(type: 'string')]
    #[Assert\Choice(choices: ['en attente de confirmation', 'en cours', 'expedie', 'livre', 'annule', 'retour'])]
    private $statut = null;

    #[ORM\Column]
    private ?float $prix_total = null;

    #[ORM\ManyToOne(inversedBy: 'commandes')]
    #[ORM\JoinColumn(name: 'id_reduction', referencedColumnName: 'id_reduction', nullable: true)]
    private ?Reduction $id_reduction = null;

    #[ORM\ManyToOne(inversedBy: 'commandes')]
    #[ORM\JoinColumn(name: 'id_utilisateur', referencedColumnName: 'id_utilisateur', nullable: false)]
    private ?Utilisateur $id_utilisateur = null;

    #[ORM\ManyToMany(targetEntity: Adresse::class, inversedBy: 'commandes')]
    #[ORM\JoinTable(name: 'commande_adresse')]
    #[ORM\JoinColumn(name: 'id_commande', referencedColumnName: 'id_commande')]
    #[ORM\InverseJoinColumn(name: 'id_adresse', referencedColumnName: 'id_adresse')]
    private Collection $id_adresse;

    public function __construct()
    {
        $this->id_adresse = new ArrayCollection();
    }

    public function getIdCommande(): ?int
    {
        return $this->id_commande;
    }

    public function getDateCommande(): ?\DateTimeInterface
    {
        return $this->date_commande;
    }

    public function setDateCommande(\DateTimeInterface $date_commande): self
    {
        $this->date_commande = $date_commande;

        return $this;
    }

    public function getStatut()
    {
        return $this->statut;
    }

    public function setStatut($statut): self
    {
        $this->statut = $statut;

        return $this;
    }

    public function getPrixTotal(): ?float
    {
        return $this->prix_total;
    }

    public function setPrixTotal(float $prix_total): self
    {
        $this->prix_total = $prix_total;

        return $this;
    }

    public function getIdReduction(): ?Reduction
    {
        return $this->id_reduction;
    }

    public function setIdReduction(?Reduction $id_reduction): self
    {
        $this->id_reduction = $id_reduction;

        return $this;
    }

    public function getIdUtilisateur(): ?Utilisateur
    {
        return $this->id_utilisateur;
    }

    public function setIdUtilisateur(?Utilisateur $id_utilisateur): self
    {
        $this->id_utilisateur = $id_utilisateur;

        return $this;
    }

    /**
     * @return Collection<int, Adresse>
     */
    public function getIdAdresse(): Collection
    {
        return $this->id_adresse;
    }

    public function addIdAdresse(Adresse $idAdresse): self
    {
        if (!$this->id_adresse->contains($idAdresse)) {
            $this->id_adresse->add($idAdresse);
        }

        return $this;
    }

    public function removeIdAdresse(Adresse $idAdresse): self
    {
        $this->id_adresse->removeElement($idAdresse);

        return $this;
    }
}
