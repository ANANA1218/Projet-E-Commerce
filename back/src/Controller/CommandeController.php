<?php

namespace App\Controller;

use App\Entity\AssoCommandeProduit;
use App\Entity\AdresseFacturation;
use App\Entity\AdresseLivraison;
use App\Entity\Commande;
use App\Entity\Utilisateur;
use App\Entity\Reduction;
use App\Repository\CommandeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Produit;


class CommandeController extends AbstractController
{
    #[Route('/api/commande', name: 'getAllCommandes', methods: ['GET'])]

    public function index(CommandeRepository $commandeRepository, SerializerInterface $serializer): JsonResponse
    {
        $query = $commandeRepository->createQueryBuilder('c')
            ->select('c.id_commande', 'u.id_utilisateur', 'c.date_commande', 'c.prix_total', 'reduc.id_reduction')
            ->leftJoin('c.id_reduction', 'reduc')
            ->join('c.id_utilisateur', 'u');

        $commandes = $query->getQuery()->getResult();

        $jsonCommande = $serializer->serialize($commandes, 'json');

        return new JsonResponse($jsonCommande, Response::HTTP_OK, [], true);
    }


    #[Route('/api/commande/{id}', name: 'getOneCommande', methods: ['GET'])]

    public function getOneCommande(Commande $commande, SerializerInterface $serializer): JsonResponse
    {
        $json = $serializer->serialize($commande, 'json', [
            'groups' => ['commande'],
        ]);

        return new JsonResponse($json, Response::HTTP_OK, ['accept' => 'json'], true);
    }

  
 
    /*public function createCommande(Request $request, EntityManagerInterface $entityManager): Response
   
    {
        $data = json_decode($request->getContent(), true);
    
        if (!isset($data['id_utilisateur']) || !isset($data['produits'])) {
            return new Response('Données manquantes', 400);
        }
    
        $commande = new Commande();
        $utilisateur = $entityManager->getRepository(Utilisateur::class)->find($data['id_utilisateur']);
        $commande->setIdUtilisateur($utilisateur);
        $commande->setDateCommande(new \DateTime());
       // $commande->setStatut('En attente');
        $commande->setPrixTotal(0);
    
        $entityManager->persist($commande);
    
        $prixTotal = 0; 
    
        foreach ($data['produits'] as $produitData) {
            if (!isset($produitData['id_produit']) || !isset($produitData['quantite'])) {
                return new Response('Données de produit manquantes', 400);
            }
    
            $assoCommandeProduit = new AssoCommandeProduit();
            $assoCommandeProduit->setIdCommande($commande);
            $produit = $entityManager->getRepository(Produit::class)->find($produitData['id_produit']);
            $assoCommandeProduit->setIdProduit($produit);
            $assoCommandeProduit->setQuantite($produitData['quantite']);
    
            $entityManager->persist($assoCommandeProduit);
    
            $produit->setStock($produit->getStock() - $produitData['quantite']);
    
           
            $prixPartiel = $produit->getPrix() * $produitData['quantite'];
            $prixTotal += $prixPartiel; 
        }
    
        $commande->setPrixTotal($prixTotal); 
    
        $entityManager->flush();
    
        return new Response('Commande ajoutée avec succès', 200);
    }


 #[Route('/api/commande', name: 'createCommande', methods: ['POST'])]
public function createCommande(Request $request, EntityManagerInterface $entityManager): Response
{
    $data = json_decode($request->getContent(), true);

    if (!isset($data['id_utilisateur']) || !isset($data['produits']) || !isset($data['id_adresse_facturation']) || !isset($data['id_adresse_livraison'])) {
        return new Response('Données manquantes', 400);
    }

    $commande = new Commande();
    $utilisateur = $entityManager->getRepository(Utilisateur::class)->find($data['id_utilisateur']);
    $adresseFacturation = $entityManager->getRepository(AdresseFacturation::class)->find($data['id_adresse_facturation']);
    $adresseLivraison = $entityManager->getRepository(AdresseLivraison::class)->find($data['id_adresse_livraison']);
    $commande->setIdUtilisateur($utilisateur);
    $commande->setIdAdresseFacturation($adresseFacturation);
    $commande->setIdAdresseLivraison($adresseLivraison);
    $commande->setDateCommande(new \DateTime());
    $commande->setPrixTotal(0);

    $entityManager->persist($commande);

    $prixTotal = 0;

    foreach ($data['produits'] as $produitData) {
        if (!isset($produitData['id_produit']) || !isset($produitData['quantite'])) {
            return new Response('Données de produit manquantes', 400);
        }

        $assoCommandeProduit = new AssoCommandeProduit();
        $assoCommandeProduit->setIdCommande($commande);
        $produit = $entityManager->getRepository(Produit::class)->find($produitData['id_produit']);
        $assoCommandeProduit->setIdProduit($produit);
        $assoCommandeProduit->setQuantite($produitData['quantite']);

        $entityManager->persist($assoCommandeProduit);

        $produit->setStock($produit->getStock() - $produitData['quantite']);

        $prixPartiel = $produit->getPrix() * $produitData['quantite'];
        $prixTotal += $prixPartiel;
    }

    $commande->setPrixTotal($prixTotal);

    $entityManager->flush();

    return new Response('Commande ajoutée avec succès', 200);
}
*/


#[Route('/api/commande', name: 'createCommande', methods: ['POST'])]
public function createCommande(Request $request, EntityManagerInterface $entityManager): Response
{
    $data = json_decode($request->getContent(), true);

    // Vérifie les données manquantes
    if (!isset($data['id_utilisateur']) || !isset($data['produits']) || !isset($data['id_adresse_facturation']) || !isset($data['id_adresse_livraison'])) {
        return new Response('Données manquantes', 400);
    }

    // Initialise les valeurs par défaut
   // $status = isset($data['status']) ? $data['status'] : 1;
    //$reduction = isset($data['reduction']) ? $data['reduction'] : 1;
    //$modePaiement = isset($data['mode_paiement']) ? $data['mode_paiement'] : 1;

    $commande = new Commande();
    $utilisateur = $entityManager->getRepository(Utilisateur::class)->find($data['id_utilisateur']);
    $adresseFacturation = $entityManager->getRepository(AdresseFacturation::class)->find($data['id_adresse_facturation']);
    $adresseLivraison = $entityManager->getRepository(AdresseLivraison::class)->find($data['id_adresse_livraison']);

    $commande->setIdUtilisateur($utilisateur);
    $commande->setIdAdresseFacturation($adresseFacturation);
    $commande->setIdAdresseLivraison($adresseLivraison);
    $commande->setDateCommande(new \DateTime());
    $commande->setPrixTotal(0);
   // $commande->setStatut($status); // Nouveau champ status
    //$commande->setIdReduction($reduction); // Nouveau champ reduction
   // $commande->setIdModePaiement($modePaiement); // Nouveau champ mode de paiement

    $entityManager->persist($commande);

    $prixTotal = 0;

    foreach ($data['produits'] as $produitData) {
        if (!isset($produitData['id_produit']) || !isset($produitData['quantite'])) {
            return new Response('Données de produit manquantes', 400);
        }

        $assoCommandeProduit = new AssoCommandeProduit();
        $assoCommandeProduit->setIdCommande($commande);
        $produit = $entityManager->getRepository(Produit::class)->find($produitData['id_produit']);
        $assoCommandeProduit->setIdProduit($produit);
        $assoCommandeProduit->setQuantite($produitData['quantite']);

        $entityManager->persist($assoCommandeProduit);

        $produit->setStock($produit->getStock() - $produitData['quantite']);

        $prixPartiel = $produit->getPrix() * $produitData['quantite'];
        $prixTotal += $prixPartiel;
    }

    $commande->setPrixTotal($prixTotal);

    $entityManager->flush();

    return new Response('Commande ajoutée avec succès', 200);
}



}
