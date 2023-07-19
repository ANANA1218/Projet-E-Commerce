<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use App\Repository\UtilisateurRepository;
use Firebase\JWT\ExpiredException;
use Lcobucci\JWT\Configuration;
use Negotiation\Exception\Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Firebase\JWT\JWT;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;

use Lcobucci\JWT\Parser;
use Lcobucci\JWT\ValidationData;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Token;

   
class UtilisateurController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UtilisateurRepository $utilisateurRepository;

    public function __construct(EntityManagerInterface $entityManager, UtilisateurRepository $utilisateurRepository)
    {
        $this->entityManager = $entityManager;
        $this->utilisateurRepository = $utilisateurRepository;
    }

    #[Route('/api/utilisateur', name: 'index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $query = $this->utilisateurRepository->getAll();

        return new JsonResponse($query, Response::HTTP_OK, []);
    }

    /*
    #[Route('/api/utilisateur', name: 'addUtilisateur', methods: ['POST'])]
    public function addUtilisateur(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if ($this->utilisateurRepository->findOneBy(['email' => $data['email']])) {
            return $this->json(['message' => 'Email existe déjà dans la base'], Response::HTTP_CONFLICT);
        }

        $this->utilisateurRepository->add($data);

        return $this->json(['message' => 'Utilisateur inscrit'], Response::HTTP_OK);
    }
    */

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
    
        // Remplacez cette logique par votre propre logique d'authentification
        $user = $this->utilisateurRepository->login($email, $password);
    
        if (!$user) {
            return $this->json(['message' => 'Identifiants incorrects'], Response::HTTP_UNAUTHORIZED);
        }
    
        // Générer le token
        $tokenPayload = [
            'sub' => $user->getIdUtilisateur(), // Identifiant unique de l'utilisateur
            'email' => $user->getEmail(),
            // Autres données que vous souhaitez inclure dans le token
        ];
    
        $jwtSecretKey = bin2hex(random_bytes(32)); // Clé secrète pour signer le token
        $token = JWT::encode($tokenPayload, $jwtSecretKey, 'HS256');
    
        return $this->json(['token' => $token], Response::HTTP_OK);
    }
    

    
   */


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
    
        // Générer le token
        $tokenPayload = [
            'id_utilisateur' => $user->getIdUtilisateur(),
            'email' => $user->getEmail(),
            // Autres données que vous souhaitez inclure dans le token
        ];
    
        $jwtSecretKey = 'your-secret-key'; // Clé secrète pour signer le token
        $token = JWT::encode($tokenPayload, $jwtSecretKey, 'HS256');
    
        return $this->json(['token' => $token], Response::HTTP_OK);
    }

 
    #[Route('/api/utilisateur/info', name: 'getUserInfo', methods: ['GET'])]
public function getUserInfo(Request $request): JsonResponse
{
    // Récupérez le token d'authentification depuis l'en-tête de la requête
    $token = $request->headers->get('Authorization');

    // Vérifiez que le token existe et commence par "Bearer "
    if (!$token || !str_starts_with($token, 'Bearer ')) {
        return $this->json(['message' => 'Token d\'authentification manquant'], Response::HTTP_UNAUTHORIZED);
    }

    // Extraitz le token du préfixe "Bearer "
    $jwtToken = substr($token, 7);

    try {
        // Décodage du token pour obtenir les informations de l'utilisateur
        $jwtSecretKey = 'your-secret-key'; // Utilisez la même clé secrète que dans la méthode de login
        $tokenPayload = JWT::decode($jwtToken, $jwtSecretKey);

        // Renvoyez les informations de l'utilisateur en tant que réponse
        return $this->json($tokenPayload, Response::HTTP_OK);
    } catch (Exception $e) {
        return $this->json(['message' => 'Token invalide'], Response::HTTP_UNAUTHORIZED);
    }
}

*/

    #[Route('/api/utilisateur/{id}', name: 'updateUtilisateur', methods: ['PUT'])]
    public function updateUtilisateur(Request $request, int $id): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = $this->utilisateurRepository->find($id);

        if (!$user) {
            return $this->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $this->utilisateurRepository->update($user, $data);

        return $this->json(['message' => 'Utilisateur modifié avec succès'], Response::HTTP_OK);
    }

    #[Route('/api/utilisateur/{id}', name: 'deleteUtilisateur', methods: ['DELETE'])]
    public function deleteUtilisateur(int $id): Response
    {
        $user = $this->utilisateurRepository->find($id);

        if ($user) {
            $this->utilisateurRepository->delete($user);
            return $this->json(['message' => 'User supprimé'], Response::HTTP_OK);
        } else {
            throw $this->createNotFoundException('User not found');
        }
    }
}
