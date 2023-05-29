<?php

namespace App\Controller;

use App\Repository\ReductionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ReductionController extends AbstractController
{
    #[Route('/api/reduction', name: 'getAllReduction', methods: ['GET'])]
    public function index(ReductionRepository $reductionRepository, SerializerInterface $serializer): JsonResponse
    {
        $reductions = $reductionRepository->getAll();

        $jsonReductions = $serializer->serialize($reductions, 'json');

        return new JsonResponse($jsonReductions, Response::HTTP_OK, [], true);
    }

    #[Route('/api/reduction/{id}', name: 'getById', methods: ['GET'])]
    public function getById(ReductionRepository $reductionRepository, int $id): JsonResponse
    {
        $reduction = $reductionRepository->getOne($id);

        $jsonReduction = $reduction->serialize();

        return new JsonResponse($jsonReduction, Response::HTTP_OK, []);
    }

    #[Route('/api/reduction/code/{code}', name: 'getByCode', methods: ['GET'])]
    public function getByCode(string $code, ReductionRepository $reductionRepository): JsonResponse
    {
        $reduction = $reductionRepository->findByCode($code);

        $jsonReduction = $reduction->serialize();

        return new JsonResponse($jsonReduction, Response::HTTP_OK, []);
    }

    #[Route('/api/reduction', name: 'addReduction', methods: ['POST'])]
    public function addReduction(Request $request, ReductionRepository $reductionRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $reductionRepository->add($data);

        return new JsonResponse(['message' => 'Réduction ajoutée avec succès'], Response::HTTP_CREATED);
    }

    #[Route('/api/reduction/{id}', name: 'updateReduction', methods: ['PUT'])]
    public function updateReduction(Request $request, ReductionRepository $reductionRepository, int $id): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $reductionRepository->update($id, $data);

        return new JsonResponse(['message' => 'Réduction modifiée avec succès'], Response::HTTP_OK);
    }
}
