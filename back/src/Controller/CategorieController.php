<?php

namespace App\Controller;

use App\Entity\Categorie;
use App\Repository\CategorieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

class CategorieController extends AbstractController
{
    #[Route('/api/categorie', name: 'getAllCategorie', methods: ['GET'])]

    public function index(CategorieRepository $categorieRepository, SerializerInterface $serializer): JsonResponse
    {
        $categories = $categorieRepository->findAll();
        $jsonCategories = $serializer->serialize($categories, 'json');
        return new JsonResponse($jsonCategories, Response::HTTP_OK, [], true);
    }

    #[Route('/api/categorie/{id}', name: 'getOneCategorie', methods: ['GET'])]

    public function getOneCategorie(Categorie $categorie, SerializerInterface $serializer): JsonResponse
    {
        $jsonCategorie = $serializer->serialize($categorie, 'json');
        return new JsonResponse($jsonCategorie, Response::HTTP_OK, ['accept' => 'json'], true);
    }
    


    #[Route('/api/categorie', name: 'createCategorie', methods: ['POST'])]
    public function createCategorie(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        
        $data = json_decode($request->getContent(), true);

        $categorie = new Categorie();
        $categorie->setNomCategorie($data['nom_categorie']);
      
        $entityManager->persist($categorie);
        $entityManager->flush();

       
        return new JsonResponse(['message' => 'Catégorie ajoute avec succes'], Response::HTTP_CREATED);
    }





    
}
