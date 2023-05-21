<?php

namespace App\Controller;

use App\Entity\Commande;
use App\Repository\CommandeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CommandeController extends AbstractController
{
    #[Route('/api/commande', name: 'getAllCommandes', methods: ['GET'])]

    public function index(CommandeRepository $commandeRepository, SerializerInterface $serializer): JsonResponse
    {
        $commandeList = $commandeRepository->findAll();
        $jsonMaterialList = $serializer->serialize($commandeList, 'json');
        return new JsonResponse($jsonMaterialList, Response::HTTP_OK, [], true);
    }
}
