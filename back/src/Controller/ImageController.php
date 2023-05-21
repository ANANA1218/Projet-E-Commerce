<?php

namespace App\Controller;

use App\Entity\Image;
use App\Repository\ImageRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ImageController extends AbstractController
{
    #[Route('/api/image', name: 'getAllImage', methods: ['GET'])]

    public function index(ImageRepository $imageRepository, SerializerInterface $serializer): JsonResponse
    {
        $images = $imageRepository->findAll();
        $jsonImages = $serializer->serialize($images, 'json');
        return new JsonResponse($jsonImages, Response::HTTP_OK, [], true);
    }
}
