<?php

namespace App\Controller;

use App\Entity\Commande;
use App\Repository\CommandeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CommandeController extends AbstractController
{
    #[Route('/api/commande', name: 'getAllCommandes', methods: ['GET'])]

    public function index(CommandeRepository $commandeRepository, SerializerInterface $serializer): JsonResponse
    {
        $query = $commandeRepository->createQueryBuilder('c')
            ->select('c.id_commande', 'u.id_utilisateur', 'c.date_commande', 'c.statut', 'c.prix_total', 'reduc.id_reduction')
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

    #[Route('/api/commande/{id}', name: 'getOneCommande', methods: ['GET'])]

    public function getOneCommande(Commande $commande, SerializerInterface $serializer): JsonResponse
    {
        $jsonCommande = $serializer->serialize($commande, 'json');
        return new JsonResponse($jsonCommande, Response::HTTP_OK, ['accept' => 'json'], true);
    }
}
