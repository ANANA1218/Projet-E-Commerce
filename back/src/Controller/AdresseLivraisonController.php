<?php

namespace App\Controller;

use App\Entity\AdresseLivraison;
use App\Entity\AssoAdresseLivraisonUtilisateur;
use App\Repository\AdresseLivraisonRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Utilisateur;

class AdresseLivraisonController extends AbstractController
{
    #[Route('/api/adresses_livraison', name: 'getAdressesLivraison', methods: ['GET'])]
    /*public function getAdressesLivraison(AdresseLivraisonRepository $adresseLivraisonRepository, SerializerInterface $serializer): JsonResponse
    {
        $adressesLivraison = $adresseLivraisonRepository->findAll();
        $jsonAdressesLivraison = $serializer->serialize($adressesLivraison, 'json');
        return new JsonResponse($jsonAdressesLivraison, Response::HTTP_OK, [], true);
    }*/


    public function getAdressesLivraison(AdresseLivraisonRepository $adresseLivraisonRepository, SerializerInterface $serializer): JsonResponse
    {
        $query = $adresseLivraisonRepository->createQueryBuilder('a')
            ->select('a.id_adresse_livraison ', 'a.rue', 'a.complement_adresse', 'a.region', 'a.ville', 'a.code_postal', 'a.pays');

        $adressesLivraison = $query->getQuery()->getResult();

        $json = $serializer->serialize($adressesLivraison, 'json');

        return new JsonResponse($json, Response::HTTP_OK, [], true);
    }



    #[Route('/api/adresses_livraison/{id}', name: 'getAdresseLivraisonById', methods: ['GET'])]
    /* public function getAdresseLivraisonById(AdresseLivraison $adresseLivraison, SerializerInterface $serializer): JsonResponse
    {
        $jsonAdresseLivraison = $serializer->serialize($adresseLivraison, 'json');
        return new JsonResponse($jsonAdresseLivraison, Response::HTTP_OK, ['accept' => 'json'], true);
    }
*/

    public function getAdresseLivraisonById(int $id, AdresseLivraisonRepository $adresseLivraisonRepository, SerializerInterface $serializer): JsonResponse
    {
        $queryBuilder = $adresseLivraisonRepository->createQueryBuilder('a')
            ->select('a.id_adresse_livraison', 'a.rue', 'a.complement_adresse', 'a.region', 'a.ville', 'a.code_postal', 'a.pays')
            ->andWhere('a.id_adresse_livraison = :id')
            ->setParameter('id', $id)
            ->getQuery();

        $adresseLivraison = $queryBuilder->getOneOrNullResult();
        $jsonAdresseLivraison = $serializer->serialize($adresseLivraison, 'json');

        return new JsonResponse($jsonAdresseLivraison, JsonResponse::HTTP_OK, ['Content-Type' => 'application/json'], true);
    }




    #[Route('/api/adresses_livraison', name: 'createAdresseLivraison', methods: ['POST'])]
    public function createAdresseLivraison(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $adresseLivraison = new AdresseLivraison();
        $adresseLivraison->setRue($data['rue']);
        $adresseLivraison->setComplementAdresse($data['complement_adresse']);
        $adresseLivraison->setRegion($data['region']);
        $adresseLivraison->setVille($data['ville']);
        $adresseLivraison->setCodePostal($data['code_postal']);
        $adresseLivraison->setPays($data['pays']);
        $adresseLivraison->setCarnetAdresse($data['carnet_adresse']);

        $entityManager->persist($adresseLivraison);
        $entityManager->flush();

        $utilisateur = $entityManager->getRepository(Utilisateur::class)->find($data['id_utilisateur']);
        $utilisateur->addAdressesLivraison($adresseLivraison);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Adresse de livraison ajoutée avec succès'], Response::HTTP_CREATED);
    }

    #[Route('/api/adresses_livraison/{id}', name: 'updateAdresseLivraison', methods: ['PUT'])]
    public function updateAdresseLivraison(Request $request, EntityManagerInterface $entityManager, AdresseLivraison $adresseLivraison): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $adresseLivraison->setRue($data['rue']);
        $adresseLivraison->setComplementAdresse($data['complement_adresse']);
        $adresseLivraison->setRegion($data['region']);
        $adresseLivraison->setVille($data['ville']);
        $adresseLivraison->setCodePostal($data['code_postal']);
        $adresseLivraison->setPays($data['pays']);
        $adresseLivraison->setCarnetAdresse($data['carnet_adresse']);

        $entityManager->flush();

        return new JsonResponse(['message' => 'Adresse de livraison mise à jour avec succès'], Response::HTTP_OK);
    }

    #[Route('/api/adresses_livraison/{id}', name: 'deleteAdresseLivraison', methods: ['DELETE'])]
    public function deleteAdresseLivraison(EntityManagerInterface $entityManager, AdresseLivraison $adresseLivraison): JsonResponse
    {
        $entityManager->remove($adresseLivraison);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Adresse de livraison supprimée avec succès'], Response::HTTP_OK);
    }
}
