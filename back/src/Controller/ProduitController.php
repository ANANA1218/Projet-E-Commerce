<?php

namespace App\Controller;

use App\Repository\ProduitRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ProduitController extends AbstractController
{
    #[Route('/api/produit', name: 'getAllProduit', methods: ['GET'])]

    public function getAllProduit(ProduitRepository $produitRepository, SerializerInterface $serializer): JsonResponse
    {
        $query = $produitRepository->createQueryBuilder('p')
            ->select('p.id_produit', 'c.nom_categorie', 'p.nom_produit', 'p.description', 'p.stock', 'p.prix', 'p.date_ajout')
            ->join('p.id_categorie', 'c');

        $produits = $query->getQuery()->getResult();

        $jsonProduits = $serializer->serialize($produits, 'json');

        return new JsonResponse($jsonProduits, Response::HTTP_OK, [], true);
    }
}
