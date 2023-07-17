<?php
// src/Controller/AuthController.php

namespace App\Controller;

use App\Entity\Utilisateur;
use App\Repository\UtilisateurRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface; 
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class AuthController extends AbstractController
{
    private UtilisateurRepository $utilisateurRepository;
    private TokenStorageInterface $tokenStorage;

    public function __construct(UtilisateurRepository $utilisateurRepository, TokenStorageInterface $tokenStorage)
    {
        $this->utilisateurRepository = $utilisateurRepository;
        $this->tokenStorage = $tokenStorage;
    } 

    #[Route('/api/utilisateur/login', name: 'login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        if (!$email || !$password) {
            return $this->json(['message' => 'Email et/ou mot de passe manquant'], Response::HTTP_BAD_REQUEST);
        }

        $user = $this->utilisateurRepository->login($email, $password);

        if (!$user) {
            return $this->json(['message' => 'Identifiants incorrects'], Response::HTTP_UNAUTHORIZED);
        }

        // Perform any other necessary operations with the authenticated user if needed.

        // Return only the necessary user information.
        $userData = [
            'id_utilisateur' => $user->getIdUtilisateur(),
            'nom' => $user->getNom(),
            'prenom' => $user->getPrenom(),
            'email' => $user->getEmail(),
            // You can add more necessary properties here if needed.
        ];

        return $this->json($userData, Response::HTTP_OK);
    }
}
