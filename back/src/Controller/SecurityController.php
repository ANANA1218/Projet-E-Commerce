<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use App\Entity\Utilisateur;
use Doctrine\ORM\EntityManagerInterface;

class SecurityController extends AbstractController
{
    private JWTEncoderInterface $jwtEncoder;
    private JWTTokenManagerInterface $jwtManager;
    private \Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface $passwordEncoder;
    private EntityManagerInterface $entityManager;

    public function __construct(
        JWTEncoderInterface $jwtEncoder,
        JWTTokenManagerInterface $jwtManager,
        \Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface $passwordEncoder,
        EntityManagerInterface $entityManager
    ) {
        $this->jwtEncoder = $jwtEncoder;
        $this->jwtManager = $jwtManager;
        $this->passwordEncoder = $passwordEncoder;
        $this->entityManager = $entityManager;
    }

    #[Route('/api/utilisateur/login', name: 'login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        $email = $request->request->get('email');
        $password = $request->request->get('password');

        // Rechercher l'utilisateur en utilisant l'email (vous pouvez utiliser votre propre méthode de recherche)
        $user = $this->entityManager->getRepository(Utilisateur::class)->findOneBy(['email' => $email]);

        if (!$user || !$this->passwordEncoder->isPasswordValid($user, $password)) {
            throw new BadCredentialsException('Invalid email or password');
        }

        // Générer un token JWT
        $token = $this->jwtManager->create($user);

        return new JsonResponse(['token' => $token]);
    }

    #[Route('/profile', name: 'profile', methods: ['GET'])]
    public function profile(Request $request): JsonResponse
    {
        $token = $request->headers->get('Authorization');
        $token = str_replace('Bearer ', '', $token);

        try {
            // Décoder le token JWT
            $data = $this->jwtEncoder->decode($token);
        } catch (JWTDecodeFailureException $e) {
            throw new BadCredentialsException('Invalid token');
        }

        // Récupérer l'ID de l'utilisateur à partir des données du token
        $userId = $data['id_utilisateur'];

        // Rechercher l'utilisateur en utilisant l'ID (vous pouvez utiliser votre propre méthode de recherche)
        $user = $this->entityManager->getRepository(Utilisateur::class)->find($userId);

        if (!$user) {
            throw new BadCredentialsException('User not found');
        }

        return new JsonResponse($user->serialize());
    }
}
