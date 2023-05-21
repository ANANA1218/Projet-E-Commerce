<?php

namespace App\Controller;

use App\Entity\Adresse;
use App\Repository\AdresseRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class AdresseController extends AbstractController
{
    #[Route('/api/adresse', name: 'getAllAdresse', methods: ['GET'])]

    public function index(AdresseRepository $adresseRepository, SerializerInterface $serializer): JsonResponse
    {
        $query = $adresseRepository->createQueryBuilder('a')
            ->select('a.id_adresse', 'u.id_utilisateur', 'a.type_adresse', 'a.rue', 'a.complement_adresse', 'a.region', 'a.ville', 'a.code_postal', 'a.pays')
            ->join('a.id_client', 'u');

        $produits = $query->getQuery()->getResult();

        $jsonProduits = $serializer->serialize($produits, 'json');

        return new JsonResponse($jsonProduits, Response::HTTP_OK, [], true);
    }

    #[Route('/api/adresse/{id}', name: 'getOneAdresse', methods: ['GET'])]

    public function getOneAdresse(Adresse $adresse, SerializerInterface $serializer): JsonResponse
    {
        $json = $serializer->serialize($adresse, 'json', [
            'groups' => ['default'],
        ]);
        return new JsonResponse($json, Response::HTTP_OK, ['accept' => 'json'], true);
    }
}
