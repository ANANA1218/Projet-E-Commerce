<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use App\Repository\UtilisateurRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AuthController extends AbstractController
{
    private $userRepository;
    private $passwordEncoder;

    public function __construct(UtilisateurRepository $userRepository, UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->userRepository = $userRepository;
        $this->passwordEncoder = $passwordEncoder;
    }

    #[Route('/api/login', name: 'login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        // Récupérer les informations d'authentification depuis la requête
        $email = $request->request->get('email');
        $password = $request->request->get('password');

        // Vérifier l'existence de l'utilisateur dans la base de données
        $user = $this->userRepository->findOneBy(['email' => $email]);
        if (!$user) {
            return new JsonResponse(['message' => 'Utilisateur non trouvé.'], JsonResponse::HTTP_NOT_FOUND);
        }

        // Vérifier si le mot de passe est correct
        if (!$this->passwordEncoder->isPasswordValid($user, $password)) {
            return new JsonResponse(['message' => 'Mot de passe incorrect.'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        // Générer un token JWT (JSON Web Token) pour l'utilisateur (utilisez une bibliothèque JWT comme LexikJWTAuthenticationBundle)
        $token = // Génération du token JWT

        return new JsonResponse(['token' => $token], JsonResponse::HTTP_OK);
    }

    #[Route('/api/register', name: 'register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        // Récupérer les informations d'inscription depuis la requête
        $nom = $request->request->get('nom');
        $prenom = $request->request->get('prenom');
        $email = $request->request->get('email');
        $password = $request->request->get('password');

        // Vérifier si l'utilisateur existe déjà dans la base de données
        $existingUser = $this->userRepository->findOneBy(['email' => $email]);
        if ($existingUser) {
            return new JsonResponse(['message' => 'Un utilisateur avec cet email existe déjà.'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Créer un nouvel utilisateur
        $user = new Utilisateur();
        $user->setNom($nom);
        $user->setPrenom($prenom);
        $user->setEmail($email);
        $user->setMotDePasse($this->passwordEncoder->encodePassword($user, $password));

        // Enregistrer l'utilisateur dans la base de données
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Utilisateur enregistré avec succès.'], JsonResponse::HTTP_CREATED);
    }
}
