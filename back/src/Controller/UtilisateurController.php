<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use App\Repository\UtilisateurRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

class UtilisateurController extends AbstractController
{
    #[Route('/api/utilisateur', name: 'getAllUtilisateur', methods: ['GET'])]

    public function index(UtilisateurRepository $utilisateurRepository, SerializerInterface $serializer): JsonResponse
    {
        $utilisateurs = $utilisateurRepository->findAll();
        $jsonUtilisateurs = $serializer->serialize($utilisateurs, 'json');
        return new JsonResponse($jsonUtilisateurs, Response::HTTP_OK, [], true);
    }


    #[Route('/api/utilisateur/{id}', name: 'getOneUtilisateur', methods: ['GET'])]

    public function getOneUtilisateur(Utilisateur $utilisateur, SerializerInterface $serializer): JsonResponse
    {
        $jsonUtilisateur = $serializer->serialize($utilisateur, 'json');
        return new JsonResponse($jsonUtilisateur, Response::HTTP_OK, ['accept' => 'json'], true);
    }


    #[Route('/api/register', name: 'register', methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $utilisateur = new Utilisateur();
        $utilisateur->setNom($data['nom']);
        $utilisateur->setPrenom($data['prenom']);
        $utilisateur->setEmail($data['email']);
        $utilisateur->setMotDePasse($data['mot_de_passe']);
        $utilisateur->setTelephone($data['telephone']);
        $utilisateur->setIdRole($data['id_role']);

        $entityManager->persist($utilisateur);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Utilisateur enregistré avec succès!'], Response::HTTP_CREATED);
    }



    

}
