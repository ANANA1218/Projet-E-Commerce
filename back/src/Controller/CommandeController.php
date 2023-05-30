<?php

namespace App\Controller;

use App\Entity\AssoCommandeProduit;
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

    #[Route('/api/commande', name: 'createCommande', methods: ['POST'])]
 
    public function createCommande(Request $request, EntityManagerInterface $entityManager): Response

    {
        $data = json_decode($request->getContent(), true);


        $idReduction = $data['id_reduction'];
        $idUtilisateur = $data['id_utilisateur'];
        $dateCommande = $data['date_commande'];
        $prixTotal = $data['prix_total'];

        // Créer une instance de Commande
        $commande = new Commande();
        $commande->setIdReduction($idReduction);
        $commande->setIdUtilisateur($idUtilisateur);
        $commande->setDateCommande($dateCommande);
        $commande->setPrixTotal($prixTotal);

        // Enregistrer la commande dans la base de données

        $entityManager->persist($commande);
        $entityManager->flush();

        return new Response('Commande créée avec succès.', Response::HTTP_CREATED);
    }

}
