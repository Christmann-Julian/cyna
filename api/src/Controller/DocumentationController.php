<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DocumentationController extends AbstractController
{
    #[Route('/', name: 'documentation_homepage')]
    public function getProductTranslation(): Response
    {
        return $this->render('documentation/index.html.twig');
    }
}
