<?php

namespace App\DataFixtures;

use App\Entity\Utilisateur;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UtilisateurFixture extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $utilisateurs = [
            [
                'nom' => 'Doe',
                'prenom' => 'John',
                'email' => 'johndoe@example.com',
                'mot_de_passe' => 'password',
                'telephone' => '1234567890',
                'id_role' => 1,
            ],
            [
                'nom' => 'Smith',
                'prenom' => 'Jane',
                'email' => 'janesmith@example.com',
                'mot_de_passe' => 'password123',
                'telephone' => '0987654321',
                'id_role' => 2,
            ],
        ];

        foreach ($utilisateurs as $utilisateurData) {
            $utilisateur = new Utilisateur();
            $utilisateur->setNom($utilisateurData['nom']);
            $utilisateur->setPrenom($utilisateurData['prenom']);
            $utilisateur->setEmail($utilisateurData['email']);
            $utilisateur->setMotDePasse($utilisateurData['mot_de_passe']);
            $utilisateur->setTelephone($utilisateurData['telephone']);
            $utilisateur->setIdRole($utilisateurData['id_role']);

            $manager->persist($utilisateur);
        }

        $manager->flush();
    }
}
