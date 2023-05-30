<?php

namespace App\Controller;

use App\Entity\Materiel;
use App\Repository\MaterielRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

class MaterielController extends AbstractController
{
    #[Route('/api/materiel', name: 'getAllMateriel', methods: ['GET'])]

    public function index(MaterielRepository $materielRepository, SerializerInterface $serializer): JsonResponse
    {
        $query = $materielRepository->createQueryBuilder('m')
            ->select('m.id_materiel', 'm.nom');

        $materiels = $query->getQuery()->getResult();

        $json = $serializer->serialize($materiels, 'json');

        return new JsonResponse($json, Response::HTTP_OK, [], true);
    }


    #[Route('/api/materiel/{id}', name: 'getOneMateriel', methods: ['GET'])]

    public function getOneMateriel(Materiel $materiel, SerializerInterface $serializer): JsonResponse
    {
        $json = $serializer->serialize($materiel, 'json', [
            'groups' => ['materiel'],
        ]);

        return new JsonResponse($json, Response::HTTP_OK, ['accept' => 'json'], true);
    }



    #[Route('/api/materiel ', name: 'createMateriel', methods: ['POST'])]
    public function createMateriel(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        
        $data = json_decode($request->getContent(), true);

        $materiel = new Materiel();
        $materiel->setNom($data['nom']);
      
        $entityManager->persist($materiel);
        $entityManager->flush();

       
        return new JsonResponse(['message' => 'Catégorie ajoute avec succes'], Response::HTTP_CREATED);
    }


    



}
