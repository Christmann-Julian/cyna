<?php

namespace App\Controller;

use App\Repository\AddressRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AddressController extends AbstractController
{
    #[Route('api/user/addresses', name: 'get_user_addresses', methods: ['GET'])]
    public function getUserAddresses(AddressRepository $addressRepository): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');

        $user = $this->getUser();
        $addresses = $addressRepository->findBy(['user' => $user]);

        return $this->json($addresses);
    }
}
