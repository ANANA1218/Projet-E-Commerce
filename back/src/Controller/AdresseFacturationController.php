<?php

namespace App\Controller;

use App\Entity\AdresseFacturation;
use App\Entity\AssoAdresseFacturationUtilisateur;
use App\Repository\AdresseFacturationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Utilisateur;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;


class AdresseFacturationController extends AbstractController
{
 
    #[Route('/api/adresses_facturation', name: 'getAdressesFacturation', methods: ['GET'])]
    public function getAdressesFacturation(AdresseFacturationRepository $adresseFacturationRepository, SerializerInterface $serializer): JsonResponse
    {
        $adressesFacturation = $adresseFacturationRepository->findAll();
        $jsonAdressesFacturation = $serializer->serialize($adressesFacturation, 'json', [
            AbstractNormalizer::GROUPS => ['exclude']
        ]);
        return new JsonResponse($jsonAdressesFacturation, Response::HTTP_OK, [], true);
    }

    #[Route('/api/adresses_facturation/{id}', name: 'getAdresseFacturationById', methods: ['GET'])]
    public function getAdresseFacturationById(AdresseFacturation $adresseFacturation, SerializerInterface $serializer): JsonResponse
    {
        $jsonAdresseFacturation = $serializer->serialize($adresseFacturation, 'json', [
            AbstractNormalizer::GROUPS => ['exclude']
        ]);
        return new JsonResponse($jsonAdresseFacturation, Response::HTTP_OK, ['accept' => 'json'], true);
    }


    



#[Route('/api/adresses_facturation', name: 'createAdresseFacturation', methods: ['POST'])]
public function createAdresseFacturation(Request $request, EntityManagerInterface $entityManager): JsonResponse
{
    $data = json_decode($request->getContent(), true);

    $adresseFacturation = new AdresseFacturation();
    $adresseFacturation->setRue($data['rue']);
    $adresseFacturation->setComplementAdresse($data['complement_adresse']);
    $adresseFacturation->setRegion($data['region']);
    $adresseFacturation->setVille($data['ville']);
    $adresseFacturation->setCodePostal($data['code_postal']);
    $adresseFacturation->setPays($data['pays']);

    $entityManager->persist($adresseFacturation);
    $entityManager->flush();

    $assoAdresseUtilisateur = new AssoAdresseFacturationUtilisateur();
    $utilisateur = $entityManager->getRepository(Utilisateur::class)->find($data['id_utilisateur']);
    $assoAdresseUtilisateur->setUtilisateur($utilisateur);
    $assoAdresseUtilisateur->setAdresseFacturation($adresseFacturation);

    $entityManager->persist($assoAdresseUtilisateur);
    $entityManager->flush();

    return new JsonResponse(['message' => 'Adresse de facturation ajoutée avec succès'], Response::HTTP_CREATED);
}


#[Route('/api/adresses_facturation/{id}', name: 'updateAdresseFacturation', methods: ['PUT'])]
public function updateAdresseFacturation(Request $request, EntityManagerInterface $entityManager, AdresseFacturation $adresseFacturation): JsonResponse
{
    $data = json_decode($request->getContent(), true);

    $adresseFacturation->setRue($data['rue']);
    $adresseFacturation->setComplementAdresse($data['complement_adresse']);
    $adresseFacturation->setRegion($data['region']);
    $adresseFacturation->setVille($data['ville']);
    $adresseFacturation->setCodePostal($data['code_postal']);
    $adresseFacturation->setPays($data['pays']);

    $entityManager->flush();

    return new JsonResponse(['message' => 'Adresse de facturation mise à jour avec succès'], Response::HTTP_OK);
}


#[Route('/api/adresses_facturation/{id}', name: 'deleteAdresseFacturation', methods: ['DELETE'])]
public function deleteAdresseFacturation(EntityManagerInterface $entityManager, AdresseFacturation $adresseFacturation): JsonResponse
{
    $entityManager->remove($adresseFacturation);
    $entityManager->flush();

    return new JsonResponse(['message' => 'Adresse de facturation supprimée avec succès'], Response::HTTP_OK);
}



    
}
