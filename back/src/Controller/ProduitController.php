<?php

namespace App\Controller;

use App\Entity\Produit;
use App\Entity\Categorie;
use App\Repository\ProduitRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

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

    #[Route('/api/produit/{id}', name: 'getOneProduit', methods: ['GET'])]

    public function getOneProduit(Produit $produit, SerializerInterface $serializer): JsonResponse
    {
        $jsonProduit = $serializer->serialize($produit, 'json');
        return new JsonResponse($jsonProduit, Response::HTTP_OK, ['accept' => 'json'], true);
    }


    #[Route('/api/produit', name: 'addProduit', methods: ['POST'])]
    public function addProduit(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

       
        $produit = new Produit();

        $idCategorie = $data['id_categorie'];
        $nomProduit = $data['nom_produit'];
        $description = $data['description'];
        $stock = $data['stock'];
        $prix = $data['prix'];
        $dateAjout = new \DateTime();


        $categorie = $entityManager->getRepository(Categorie::class)->find($idCategorie);

        $produit->setIdCategorie($categorie);
        $produit->setNomProduit($nomProduit);
        $produit->setDescription($description);
        $produit->setStock($stock);
        $produit->setPrix($prix);
        $produit->setDateAjout($dateAjout);

        
        $entityManager->persist($produit);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Produit ajoute avec succes'], Response::HTTP_CREATED);
    }


}
