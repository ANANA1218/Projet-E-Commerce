<?php

namespace App\Security;

use Lexik\Bundle\JWTAuthenticationBundle\Security\User\JWTUserManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Security\User\JWTUserInterface;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;

class JWTUserManager implements JWTUserManagerInterface
{
    public function loadUserByIdentifier(string $identifier): ?JWTUserInterface
    {
        // Implémentez la logique pour récupérer l'utilisateur à partir de l'identifiant (ex: ID utilisateur)
        // Si l'utilisateur n'est pas trouvé, lancez une exception UserNotFoundException
        throw new UserNotFoundException('User not found.');
    }

    public function refreshUser(JWTUserInterface $user): ?JWTUserInterface
    {
        // Implémentez la logique pour rafraîchir l'utilisateur (si nécessaire)
        // Si l'utilisateur n'est pas trouvé, lancez une exception UserNotFoundException
        throw new UserNotFoundException('User not found.');
    }
}
