<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use App\Repository\UtilisateurRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Psr\Log\LoggerInterface;
use Symfony\Component\Security\Http\Logout\LogoutSuccessHandlerInterface;

class AuthController extends AbstractController
{
    private UtilisateurRepository $utilisateurRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(UtilisateurRepository $utilisateurRepository, EntityManagerInterface $entityManager)
    {
        $this->utilisateurRepository = $utilisateurRepository;
        $this->entityManager = $entityManager;
    }

    /*
    #[Route('/api/utilisateur', name: 'addUtilisateur', methods: ['POST'])]
    public function addUtilisateur(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if ($this->utilisateurRepository->findOneBy(['email' => $data['email']])) {
            return $this->json(['message' => 'Email existe déjà dans la base'], Response::HTTP_CONFLICT);
        }

        // Generate a random token for the new user
        $token = bin2hex(random_bytes(32));
        $data['token'] = $token;

        // Encode the password before saving
        $data['mdp'] = password_hash($data['mdp'], PASSWORD_BCRYPT);

        $this->utilisateurRepository->add($data);

        return $this->json(['message' => 'Utilisateur inscrit', 'token' => $token], Response::HTTP_OK);
    }
*/

#[Route('/api/utilisateur', name: 'addUtilisateur', methods: ['POST'])]
public function addUtilisateur(Request $request): JsonResponse
{
    $data = json_decode($request->getContent(), true);

    if ($this->utilisateurRepository->findOneBy(['email' => $data['email']])) {
        return $this->json(['message' => 'Email existe déjà dans la base'], Response::HTTP_CONFLICT);
    }

    // Generate a random token for the new user
    $token = bin2hex(random_bytes(32));
    $data['token'] = $token;

    // Note: Commenting out the password hashing since you want to remove it
    // $data['mdp'] = password_hash($data['mdp'], PASSWORD_BCRYPT);

    $this->utilisateurRepository->add($data);

    return $this->json(['message' => 'Utilisateur inscrit', 'token' => $token], Response::HTTP_OK);
}



   /* #[Route('/api/utilisateur/login', name: 'login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        if (!$email || !$password) {
            return $this->json(['message' => 'Email et/ou mot de passe manquant'], Response::HTTP_BAD_REQUEST);
        }

        $user = $this->utilisateurRepository->findOneBy(['email' => $email]);

        if (!$user || !password_verify($password, $user->getMotDePasse())) {
            return $this->json(['message' => 'Identifiants incorrects'], Response::HTTP_UNAUTHORIZED);
        }

        $token = $user->getToken();

        return $this->json(['message' => 'Login successful', 'token' => $token], Response::HTTP_OK);
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

    $id = $user->getIdUtilisateur(); // Assuming the method to get the ID is named 'getId'.

    $token = $user->getToken();

    return $this->json(['message' => 'Login successful', 'id_utilisateur' => $id, 'token' => $token], Response::HTTP_OK);
}*/

#[Route('/api/utilisateur/login', name: 'login', methods: ['POST'])]
public function login(Request $request): JsonResponse
{
    $data = json_decode($request->getContent(), true);

    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (!$email || !$password) {
        return $this->json(['message' => 'Email et/ou mot de passe manquant'], Response::HTTP_BAD_REQUEST);
    }

    // Find the user by email (assuming 'findOneBy' method in the repository)
    $user = $this->utilisateurRepository->findOneBy(['email' => $email]);

    if (!$user) {
        return $this->json(['message' => 'Identifiants incorrects'], Response::HTTP_UNAUTHORIZED);
    }

    // Note: Commenting out the password verification since you want to remove it
    // if (!password_verify($password, $user->getMotDePasse())) {
    //     return $this->json(['message' => 'Identifiants incorrects'], Response::HTTP_UNAUTHORIZED);
    // }

    $id = $user->getIdUtilisateur(); // Assuming the method to get the ID is named 'getId'.

    $token = $user->getToken();

    return $this->json(['message' => 'Login successful', 'id_utilisateur' => $id, 'token' => $token], Response::HTTP_OK);
}



/*
#[Route('/api/utilisateur/loginAdmin', name: 'loginAdmin', methods: ['POST'])]
public function loginAdmin(Request $request): JsonResponse
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

    $idRole = $user->getIdRole()->getId(); // Assuming 'getId' method on the Role entity to get the role ID.

    // Check if the user has the desired role (id_role = 1) to proceed with the login
    if ($idRole !== 1) {
        return $this->json(['message' => 'Access denied.'], Response::HTTP_FORBIDDEN);
    }

    $id = $user->getIdUtilisateur(); // Assuming the method to get the ID is named 'getId'.

    $token = $user->getToken();

    return $this->json(['message' => 'Login successful', 'id_utilisateur' => $id, 'token' => $token], Response::HTTP_OK);
}

*/

#[Route('/api/utilisateur/loginAdmin', name: 'loginAdmin', methods: ['POST'])]
public function loginAdmin(Request $request): JsonResponse
{
    $data = json_decode($request->getContent(), true);

    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (!$email || !$password) {
        return $this->json(['message' => 'Email et/ou mot de passe manquant'], Response::HTTP_BAD_REQUEST);
    }

    // Find the user by email (assuming 'findOneBy' method in the repository)
    $user = $this->utilisateurRepository->findOneBy(['email' => $email]);

    if (!$user) {
        return $this->json(['message' => 'Identifiants incorrects'], Response::HTTP_UNAUTHORIZED);
    }

    // Note: Commenting out the password verification since you want to remove it
    // if (!password_verify($password, $user->getMotDePasse())) {
    //     return $this->json(['message' => 'Identifiants incorrects'], Response::HTTP_UNAUTHORIZED);
    // }

    $idRole = $user->getIdRole()->getId(); // Assuming 'getId' method on the Role entity to get the role ID.

    // Check if the user has the desired role (id_role = 1) to proceed with the login
    if ($idRole !== 1) {
        return $this->json(['message' => 'Access denied.'], Response::HTTP_FORBIDDEN);
    }

    $id = $user->getIdUtilisateur(); // Assuming the method to get the ID is named 'getId'.

    $token = $user->getToken();

    return $this->json(['message' => 'Login successful', 'id_utilisateur' => $id, 'token' => $token], Response::HTTP_OK);
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

    $token = $user->getToken();

    return $this->json(['message' => 'Login successful', 'token' => $token], Response::HTTP_OK);
}

*/



    #[Route('/api/utilisateur/profile', name: 'profile', methods: ['GET'])]
    public function profile(Request $request): JsonResponse
    {
        // Retrieve the authenticated user based on the token passed in the request header
        $token = str_replace('Bearer ', '', $request->headers->get('Authorization'));

        if (!$token) {
            return $this->json(['message' => 'Token non fourni'], Response::HTTP_BAD_REQUEST);
        }

        $user = $this->utilisateurRepository->findOneBy(['token' => $token]);

        if (!$user) {
            return $this->json(['message' => 'Utilisateur non trouvé'], Response::HTTP_NOT_FOUND);
        }

        // Return the user's information
        return $this->json(['user' => $user->serialize()], Response::HTTP_OK);
    }

   
}


