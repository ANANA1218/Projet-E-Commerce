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
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

class ProduitController extends AbstractController
{

    #[Route('/api/produits', name: 'getAllProduit', methods: ['GET'])]
    public function getAllProduit(ProduitRepository $produitRepository, SerializerInterface $serializer): JsonResponse
    {
        $query = $produitRepository->createQueryBuilder('p')
            ->select('p.id_produit', 'c.nom_categorie', 'p.nom_produit', 'p.description', 'p.stock', 'p.prix', 'p.date_ajout')
            ->join('p.id_categorie', 'c');

        $produits = $query->getQuery()->getResult();

        $jsonProduits = $serializer->serialize($produits, 'json', [AbstractNormalizer::GROUPS => 'product']);

        return new JsonResponse($jsonProduits, Response::HTTP_OK, [], true);
    }

    #[Route('/api/produits/{id}', name: 'getOneProduit', methods: ['GET'])]
    public function getOneProduit(Produit $produit): JsonResponse
    {
        $produitData = [
            'id_produit' => $produit->getIdProduit(),
            'nom_produit' => $produit->getNomProduit(),
            'description' => $produit->getDescription(),
            'stock' => $produit->getStock(),
            'prix' => $produit->getPrix(),
            'date_ajout' => $produit->getDateAjout(),
        ];

        $categorie = $produit->getIdCategorie();
        $categorieData = [
            'id_categorie' => $categorie->getIdCategorie(),
            'nom_categorie' => $categorie->getNomCategorie(),
        ];

        $produitData['categorie'] = $categorieData;

        $jsonProduit = json_encode($produitData);

        return new JsonResponse($jsonProduit, Response::HTTP_OK, ['Content-Type' => 'application/json'], true);
    }


    #[Route('/api/produits', name: 'addProduit', methods: ['POST'])]
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


    #[Route('/api/produits/{id}', name: 'updateProduit', methods: ['PUT'], requirements: ['id' => '\d+'])]
    public function updateProduit(Request $request, EntityManagerInterface $entityManager, Produit $produit): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $idCategorie = $data['id_categorie'];
        $nomProduit = $data['nom_produit'];
        $description = $data['description'];
        $stock = $data['stock'];
        $prix = $data['prix'];

        $categorie = $entityManager->getRepository(Categorie::class)->find($idCategorie);

        $produit->setIdCategorie($categorie);
        $produit->setNomProduit($nomProduit);
        $produit->setDescription($description);
        $produit->setStock($stock);
        $produit->setPrix($prix);

        $entityManager->flush();

        return new JsonResponse(['message' => 'Produit mis à jour avec succès'], Response::HTTP_OK);
    }


    #[Route('/api/produits', name: 'updateMultipleProduits', methods: ['PUT'])]
    public function updateMultipleProduits(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $productIds = $data['ids'];
        $idCategorie = !empty($data['categorie']) ? $entityManager->getRepository(Categorie::class)->find($data['categorie']) : null;
        $newPrice = !empty($data['prix']) ? floatval($data['prix']) : null;
        $newStock = !empty($data['stock']) ? intval($data['stock']) : null;

        $products = $entityManager->getRepository(Produit::class)->findBy(['id_produit' => $productIds]);

        foreach ($products as $product) {
            if (!is_null($newPrice)) {
                $product->setPrix($newPrice);
            }
            if (!is_null($newStock)) {
                $product->setStock($newStock);
            }
            if (!is_null($idCategorie)) {
                $product->setIdCategorie($idCategorie);
            }
        }

        $entityManager->flush();

        return new JsonResponse(['message' => 'Produits mis à jour avec succès', 'productIds' => $productIds], Response::HTTP_OK);
    }


    #[Route('/api/produits/{id}', name: 'deleteProduit', methods: ['DELETE'], requirements: ['id' => '\d+'])]
    public function deleteProduit(EntityManagerInterface $entityManager, Produit $produit): JsonResponse
    {
        $entityManager->remove($produit);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Produit supprimé avec succès'], Response::HTTP_OK);
    }


    #[Route('/api/produits/multiple/{ids}', name: 'deleteProduits', methods: ['DELETE'])]
    public function deleteProduits(EntityManagerInterface $entityManager, string $ids): JsonResponse
    {
        $productIds = explode(',', $ids);

        $deletedProducts = [];
        foreach ($productIds as $productId) {
            $produit = $entityManager->getRepository(Produit::class)->find($productId);
            if ($produit) {
                $entityManager->remove($produit);
                $deletedProducts[] = $produit->getIdProduit();
            }
        }

        $entityManager->flush();

        return new JsonResponse(['message' => 'Produits supprimés avec succès', 'deletedIds' => $deletedProducts], Response::HTTP_OK);
    }
}
