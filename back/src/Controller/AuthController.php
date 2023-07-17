<?php
// src/Controller/AuthController.php

namespace App\Controller;

use App\Entity\Utilisateur;
use App\Repository\UtilisateurRepository;
use Doctrine\ORM\EntityManagerInterface;
use Firebase\JWT\JWT;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface; 
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;// Ajout de l'importation manquante

class AuthController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UtilisateurRepository $utilisateurRepository;

    private TokenStorageInterface $tokenStorage;
    // Inject the EntityManagerInterface through the constructor
    public function __construct(EntityManagerInterface $entityManager, UtilisateurRepository $utilisateurRepository, TokenStorageInterface $tokenStorage)
    {
        $this->entityManager = $entityManager;
        $this->utilisateurRepository = $utilisateurRepository;
        $this->tokenStorage = $tokenStorage;
    }

    #[Route('/api/utilisateur/login', name: 'user_login', methods: ['POST'])]
    public function loginUser(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        if (!$email || !$password) {
            return $this->json(['message' => 'Email et/ou mot de passe manquant'], Response::HTTP_BAD_REQUEST);
        }

        // Replace this logic with your own authentication logic
        $user = $this->utilisateurRepository->login($email, $password);

        if (!$user) {
            return $this->json(['message' => 'Identifiants incorrects'], Response::HTTP_UNAUTHORIZED);
        }

        // Generate a token and set it on the user entity
        $token = $this->generateToken();
        $user->setToken($token);
        $this->entityManager->flush();

        // Return the token in the response
        return $this->json(['token' => $token], Response::HTTP_OK);
    }

    private function generateToken(): string
    {
        // Generate a random token using random_bytes and convert it to hexadecimal
        $length = 32; // Change this value according to your token length requirements
        return bin2hex(random_bytes($length));
    }


    #[Route('/api/utilisateur/me', name: 'getAuthenticatedUser', methods: ['GET'])]
    public function getAuthenticatedUser(): JsonResponse
    {
        $token = $this->tokenStorage->getToken();
        if (!$token) {
            return $this->json(['message' => 'Utilisateur non connecté'], Response::HTTP_UNAUTHORIZED);
        }

        $user = $token->getUser();

        if (!$user instanceof Utilisateur) {
            return $this->json(['message' => 'Utilisateur non valide'], Response::HTTP_UNAUTHORIZED);
        }

        // Return the authenticated user's information
        return $this->json(['user' => [
            'id' => $user->getIdUtilisateur(),
            'username' => $user->getPrenom(),
            // Add other properties you want to expose
        ]], Response::HTTP_OK);
    }


    #[Route('/api/utilisateur/logout', name: 'logoutUser', methods: ['POST'])]
    public function logoutUser(): JsonResponse
    {
        // Get the authenticated token
        $token = $this->tokenStorage->getToken();

        if (!$token) {
            return $this->json(['message' => 'Utilisateur non connecté'], Response::HTTP_UNAUTHORIZED);
        }

        // Get the authenticated user
        $user = $token->getUser();

        if (!$user instanceof Utilisateur) {
            return $this->json(['message' => 'Utilisateur non valide'], Response::HTTP_UNAUTHORIZED);
        }

        // Invalidate the user's token by setting it to null
        $user->setToken(null);
        $this->entityManager->flush();

        return $this->json(['message' => 'Déconnexion réussie'], Response::HTTP_OK);
    }
}