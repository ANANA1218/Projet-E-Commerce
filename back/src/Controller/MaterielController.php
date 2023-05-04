<?php

namespace App\Controller;

use App\Entity\Materiel;
use App\Repository\MaterielRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class MaterielController extends AbstractController
{
    #[Route('/api/materiel', name: 'getAllMateriel', methods: ['GET'])]

    public function index(MaterielRepository $materielRepository, SerializerInterface $serializer): JsonResponse
    {
        $materielList = $materielRepository->findAll();
        $jsonMaterialList = $serializer->serialize($materielList, 'json');
        return new JsonResponse($jsonMaterialList, Response::HTTP_OK, [], true);
    }


    // #[Route('/api/materiel/getAllMateriel', name: 'getAllMateriel', methods: ['GET'])]

    // public function getAllMateriel(MaterielRepository $materielRepository, SerializerInterface $serializer): JsonResponse
    // {
    //     $materielList = $materielRepository->findAll();
    //     $jsonMaterialList = $serializer->serialize($materielList, 'json');
    //     return new JsonResponse($jsonMaterialList, Response::HTTP_OK, [], true);
    // }

    #[Route('/api/materiel/{id}', name: 'getOneMateriel', methods: ['GET'])]

    public function getOneMateriel(Materiel $materiel, SerializerInterface $serializer): JsonResponse
    {
        $jsonMateriel = $serializer->serialize($materiel, 'json');
        return new JsonResponse($jsonMateriel, Response::HTTP_OK, ['accept' => 'json'], true);
    }
}
