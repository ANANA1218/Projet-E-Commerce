<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use App\Repository\UtilisateurRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class UtilisateurController extends AbstractController
{
    #[Route('/api/utilisateur', name: 'index', methods: ['GET'])]
    public function index(UtilisateurRepository $utilisateurRepository): JsonResponse
    {
        $query = $utilisateurRepository->getAll();

        return new JsonResponse($query, Response::HTTP_OK, []);
    }

    #[Route('/api/utilisateur/{id}', name: 'getOne', methods: ['GET'])]
    public function getOne(int $id, UtilisateurRepository $utilisateurRepository): JsonResponse
    {
        $user = $utilisateurRepository->getOne($id);

        $jsonUser = $user->serialize();

        return $this->json($jsonUser, Response::HTTP_OK);
    }

    #[Route('/api/utilisateur', name: 'addUtilisateur', methods: ['POST'])]
    public function addUtilisateur(Request $request, UtilisateurRepository $utilisateurRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if ($utilisateurRepository->findOneBy(['email' => $data['email']])) {
            return $this->json(['message' => 'Email existe déjà dans la base'], Response::HTTP_CONFLICT);
        }

        $utilisateurRepository->add($data);

        return $this->json(['message' => 'Utilisateur inscrit'], Response::HTTP_OK);
    }

    #[Route('/api/utilisateur/login', name: 'login', methods: ['POST'])]
    public function login(Request $request, UtilisateurRepository $utilisateurRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        if (!$email || !$password) {
            return $this->json(['message' => 'Email et/ou mot de passe manquant'], Response::HTTP_BAD_REQUEST);
        }

        $user = $utilisateurRepository->login($email, $password);

        if (!$user) {
            return $this->json(['message' => 'Identifiants incorrects'], Response::HTTP_UNAUTHORIZED);
        }

        return $this->json(['message' => 'Identifiants corrects'], Response::HTTP_OK);
    }

    #[Route('/api/utilisateur/{id}', name: 'updateUtilisateur', methods: ['PUT'])]
    public function updateUtilisateur(Request $request, UtilisateurRepository $utilisateurRepository, int $id): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        //Ajouter la vérif de la validité des champs côté serveur, en plus de la vérif en front ?
        $user = $utilisateurRepository->find($id);
        if (!$user) {
            return $this->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $utilisateurRepository->update($user, $data);

        return $this->json(['message' => 'Utilisateur modifié avec succès'], Response::HTTP_OK);
    }

    #[Route('/api/utilisateur/{id}', name: 'deleteUtilisateur', methods: ['DELETE'])]
    public function deleteUtilisateur(UtilisateurRepository $utilisateurRepository, int $id): Response
    {
        $user = $utilisateurRepository->find($id);

        if ($user) {
            $utilisateurRepository->delete($user);
            return $this->json(['message' => 'User supprimé'], Response::HTTP_OK);
        } else {
            throw $this->createNotFoundException('User not found');
        }
    }

  


    #[Route('/api/utilisateur/logged-in', name: 'loggedInUser', methods: ['GET'])]
    public function getLoggedInUser(Request $request, UtilisateurRepository $utilisateurRepository): JsonResponse
    {
       
        $id_utilisateur = (int)$request->get('id_utilisateur');
    
        
        $user = $utilisateurRepository->getLoggedInUser($id_utilisateur);
    
       
        if (!$user) {
            return $this->json(['message' => 'Utilisateur non trouvé'], Response::HTTP_NOT_FOUND);
        }
    
       
        return $this->json($user, Response::HTTP_OK);
    }
    




}
