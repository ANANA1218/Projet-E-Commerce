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



class AuthController extends AbstractController
{
    private UtilisateurRepository $utilisateurRepository;
  
    public function __construct(UtilisateurRepository $utilisateurRepository)
    {
        $this->utilisateurRepository = $utilisateurRepository;
        
    } 

    /*
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
*/
/*
    public function login(string $email, string $password): ?Utilisateur
    {
        $user = $this->createQueryBuilder('u')
            ->andWhere('u.email = :email')
            ->setParameter('email', $email)
            ->getQuery()
            ->getOneOrNullResult();

        if (!$user) {
            return null;
        }

        if (!password_verify($password, $user->getMotDePasse())) {
            return null;
        }

        return $user;
    }

    */


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

       
        $userData = [
            'id_utilisateur' => $user->getIdUtilisateur(),
            'nom' => $user->getNom(),
            'prenom' => $user->getPrenom(),
            'email' => $user->getEmail(),
            'id_adresse_facturation' => null,
            'id_adresse_livraison' => null,
            'adresses_facturation' => [],
            'adresses_livraison' => [],
        ];

        
        $adressesFacturation = $user->getAdressesFacturation();
        if (!$adressesFacturation->isEmpty()) {
            $userData['id_adresse_facturation'] = $adressesFacturation->first()->getIdAdresseFacturation();
        }

     
        $adressesLivraison = $user->getAdressesLivraison();
        if (!$adressesLivraison->isEmpty()) {
            $userData['id_adresse_livraison'] = $adressesLivraison->first()->getIdAdresseLivraison();
        }

        
        foreach ($adressesFacturation as $adresseFacturation) {
            $userData['adresses_facturation'][] = [
                'rue' => $adresseFacturation->getRue(),
                'complement_adresse' => $adresseFacturation->getComplementAdresse(),
                'region' => $adresseFacturation->getRegion(),
                'ville' => $adresseFacturation->getVille(),
                'code_postal' => $adresseFacturation->getCodePostal(),
                'pays' => $adresseFacturation->getPays(),
               // 'carnet_adresse' => $adresseFacturation->getCarnetAdresse(),
            ];
        }

      
        foreach ($adressesLivraison as $adresseLivraison) {
            $userData['adresses_livraison'][] = [
                'rue' => $adresseLivraison->getRue(),
                'complement_adresse' => $adresseLivraison->getComplementAdresse(),
                'region' => $adresseLivraison->getRegion(),
                'ville' => $adresseLivraison->getVille(),
                'code_postal' => $adresseLivraison->getCodePostal(),
                'pays' => $adresseLivraison->getPays(),
               // 'carnet_adresse' => $adresseLivraison->getCarnetAdresse(),
            ];
        }

        return $this->json($userData, Response::HTTP_OK);
    }


}
