<?php

namespace App\Controller;

use Dompdf\Dompdf;
use Dompdf\Options;
use App\Entity\Order;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class OrderController extends AbstractController
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    #[Route('/api/order/{locale}/{id}/download', name: 'api_order_download', methods: ['GET'])]
    public function downloadOrderPdf(int $id, string $locale): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');

        /** @var Order $order */
        $order = $this->entityManager->getRepository(Order::class)->find($id);

        if (!$order || $order->getUser() !== $this->getUser()) {
            return new JsonResponse(['error' => 'Order not found'], Response::HTTP_NOT_FOUND);
        }

        if ($order->getUser() !== $this->getUser()) {
            return new JsonResponse(['error' => 'Access denied'], Response::HTTP_FORBIDDEN);
        }

        $options = new Options();
        $options->set('defaultFont', 'Arial');
        $dompdf = new Dompdf($options);

        $html = $this->renderView('pdf/' . $locale . '/invoice.html.twig', [
            'order' => $order,
            'user' => $this->getUser(),
        ]);

        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();

        $pdfOutput = $dompdf->output();
        $response = new Response($pdfOutput);

        $response->headers->set('Content-Type', 'application/pdf');
        $response->headers->set('Content-Disposition', 'attachment; filename="invoice_' . $order->getReference() . '.pdf"');

        return $response;
    }

    #[Route('/api/order/by-year', name: 'api_orders_by_year', methods: ['GET'])]
    public function getOrdersGroupedByYear(): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');

        $orders = $this->entityManager->getRepository(Order::class)->findBy(['user' => $this->getUser()], ['date' => 'DESC']);

        if (!$orders) {
            return new JsonResponse(['error' => 'No orders found'], Response::HTTP_NOT_FOUND);
        }

        $groupedOrders = [];
        foreach ($orders as $order) {
            $year = $order->getDate()->format('Y');
            $groupedOrders[$year][] = [
                'id' => $order->getId(),
                'reference' => $order->getReference(),
                'serviceName' => $order->getOrderLines()->first()->getName() ?? 'N/A',
                'date' => $order->getDate()->format('Y-m-d H:i:s'),
                'total' => $order->getTotal(),
                'status' => $order->getStatus(),
            ];
        }

        krsort($groupedOrders);

        return new JsonResponse($groupedOrders, Response::HTTP_OK);
    }
}
