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

class AdresseFacturationController extends AbstractController
{
    #[Route('/api/adresses_facturation', name: 'getAdressesFacturation', methods: ['GET'])]
    public function getAdressesFacturation(AdresseFacturationRepository $adresseFacturationRepository, SerializerInterface $serializer): JsonResponse
    {
        $query = $adresseFacturationRepository->createQueryBuilder('a')
            ->select('a.id_adresse_facturation', 'a.rue', 'a.complement_adresse', 'a.region', 'a.ville', 'a.code_postal', 'a.pays');

        $adressesFacturation = $query->getQuery()->getResult();

        $json = $serializer->serialize($adressesFacturation, 'json');

        return new JsonResponse($json, JsonResponse::HTTP_OK, ['Content-Type' => 'application/json'], true);
    }

    #[Route('/api/adresses_facturation/{id}', name: 'getAdresseFacturationById', methods: ['GET'])]
    public function getAdresseFacturationById(int $id, AdresseFacturationRepository $adresseFacturationRepository, SerializerInterface $serializer): JsonResponse
    {
        $queryBuilder = $adresseFacturationRepository->createQueryBuilder('a')
            ->select('a.id_adresse_facturation', 'a.rue', 'a.complement_adresse', 'a.region', 'a.ville', 'a.code_postal', 'a.pays')
            ->andWhere('a.id_adresse_facturation = :id')
            ->setParameter('id', $id)
            ->getQuery();

        $adresseFacturation = $queryBuilder->getOneOrNullResult();
        $jsonAdresseFacturation = $serializer->serialize($adresseFacturation, 'json');

        return new JsonResponse($jsonAdresseFacturation, JsonResponse::HTTP_OK, ['Content-Type' => 'application/json'], true);
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
        $adresseFacturation->setCarnetAdresse($data['carnet_adresse']);

        $entityManager->persist($adresseFacturation);
        $entityManager->flush();

        $utilisateur = $entityManager->getRepository(Utilisateur::class)->find($data['id_utilisateur']);
        $utilisateur->addAdressesFacturation($adresseFacturation);
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
        $adresseFacturation->setCarnetAdresse($data['carnet_adresse']);

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
