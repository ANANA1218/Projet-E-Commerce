<?php

namespace App\Controller;

use App\Entity\Produit;
use App\Repository\ProduitRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ProduitController extends AbstractController
{
    #[Route('/api/produit', name: 'getAllProduit', methods: ['GET'])]

    public function index(ProduitRepository $produitRepository, SerializerInterface $serializer): JsonResponse
    {
        $produits = $produitRepository->findAll();
        $jsonProduits = $serializer->serialize($produits, 'json');
        return new JsonResponse($jsonProduits, Response::HTTP_OK, [], true);
    }
}
