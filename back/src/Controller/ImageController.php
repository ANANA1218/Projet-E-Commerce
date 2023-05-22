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


    #[Route('/api/image/{id}', name: 'getOneImage', methods: ['GET'])]

    public function getOneImage(Image $image, SerializerInterface $serializer): JsonResponse
    {
        $jsonImage = $serializer->serialize($image, 'json');
        return new JsonResponse($jsonImage, Response::HTTP_OK, ['accept' => 'json'], true);
    }
}
