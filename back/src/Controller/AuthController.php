<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use Doctrine\ORM\EntityManagerInterface;
use Firebase\JWT\JWT;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class AuthController extends AbstractController
{
    #[Route('/api/utilisateur/login', name: 'login', methods: ['POST'])]
    public function login(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Vérifier les informations d'identification (email et mot de passe) ici
        $email = $data['email'];
        $password = $data['password'];

        // Vérification de l'utilisateur dans la base de données (exemple)
        $utilisateur = $entityManager
            ->getRepository(Utilisateur::class)
            ->findOneBy(['email' => $email]);

        if (!$utilisateur || !password_verify($password, $utilisateur->getMotDePasse())) {
            return new JsonResponse(['message' => 'Identifiants invalides'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        // Générer un secret JWT aléatoire
        $jwtSecret = bin2hex(random_bytes(32)); // Génère une clé de 32 octets (256 bits)

        // Générer un token JWT
        $tokenPayload = [
            'id_utilisateur' => $utilisateur->getIdUtilisateur(),
            'email' => $utilisateur->getEmail(),
            'exp' => time() + 3600, // expiration du token après 1 heure (vous pouvez ajuster cette valeur selon vos besoins)
        ];
        $token = JWT::encode($tokenPayload, $jwtSecret, 'HS256');

        // Enregistrer le token et le secret JWT dans l'entité Utilisateur
        $utilisateur->setToken($token);
        $utilisateur->setJwtSecret($jwtSecret);
        $entityManager->flush();

        return new JsonResponse(['token' => $token]);
    }

    #[Route('/profile', name: 'profile', methods: ['GET'])]
    public function profile(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer l'utilisateur actuel à partir du token JWT
        $token = $request->headers->get('Authorization');

        try {
            $utilisateur = $entityManager
                ->getRepository(Utilisateur::class)
                ->findOneBy(['token' => $token]);
        } catch (\Exception $e) {
            return new JsonResponse(['message' => 'Token invalide'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        if (!$utilisateur) {
            return new JsonResponse(['message' => 'Utilisateur non trouvé'], JsonResponse::HTTP_NOT_FOUND);
        }

        return new JsonResponse($utilisateur->serialize());
    }
}
