<?php

namespace App\Controller;

use App\Entity\Categorie;
use App\Repository\CategorieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

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
}