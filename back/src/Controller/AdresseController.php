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
        $adresses = $adresseRepository->findAll();
        $jsonAdresses = $serializer->serialize($adresses, 'json');
        return new JsonResponse($jsonAdresses, Response::HTTP_OK, [], true);
    }
}
