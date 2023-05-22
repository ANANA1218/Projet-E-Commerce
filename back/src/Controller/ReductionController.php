<?php

namespace App\Controller;

use App\Entity\Reduction;
use App\Repository\ReductionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

class ReductionController extends AbstractController
{
    #[Route('/api/reduction', name: 'getAllReduction', methods: ['GET'])]

    public function index(ReductionRepository $reductionRepository, SerializerInterface $serializer): JsonResponse
    {
        $reduction = $reductionRepository->findAll();
        $jsonReduction = $serializer->serialize($reduction, 'json');

        return new JsonResponse($jsonReduction, Response::HTTP_OK, [], true);
    }


    #[Route('/api/reduction/{id}', name: 'getOneReduction', methods: ['GET'])]

    public function getOneReduction(Reduction $reduction, SerializerInterface $serializer): JsonResponse
    {
        $json = $serializer->serialize($reduction, 'json', [
            'groups' => ['reduction'],
        ]);

        return new JsonResponse($json, Response::HTTP_OK, ['accept' => 'json'], true);
    }

  
    #[Route('/api/reduction', name: 'createReduction', methods: ['POST'])]
    public function createReduction(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

      
        $codePromo = $data['code_promo'];
        $pourcentage = $data['pourcentage'];
        $actif = $data['actif'];
        $dateDebut = $data['date_debut'];
        $dateFin = $data['date_fin'];

      
        $reduction = new Reduction();
        $reduction->setCodePromo($codePromo);
        $reduction->setPourcentage($pourcentage);
        $reduction->setActif($actif);
        $reduction->setDateDebut($dateDebut);
        $reduction->setDateFin($dateFin);
      
        $entityManager->persist($reduction);
        $entityManager->flush();

        return new JsonResponse('Réduction créée avec succès.', JsonResponse::HTTP_CREATED);
    }

    
}
