<?php

namespace App\Controller;

use Dompdf\Dompdf;
use Stripe\Stripe;
use Dompdf\Options;
use App\Entity\User;
use App\Entity\Order;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;

class OrderController extends AbstractController
{
    public function __construct(private EntityManagerInterface $entityManager) {}

    #[Route('/api/order/{locale}/{id}/download', name: 'api_order_download', methods: ['GET'])]
    public function downloadOrderPdf(int $id, string $locale, Request $request, JWTEncoderInterface $jwtEncoder): Response
    {
        $token = $request->query->get('token');

        $user = null;

        if (!$token) {
            $this->denyAccessUnlessGranted('ROLE_USER');
        } else {
            try {
                $decodedToken = $jwtEncoder->decode($token);
            } catch (\Exception $e) {
                return new JsonResponse(['error' => 'Invalid token'], Response::HTTP_UNAUTHORIZED);
            }

            $userId = $decodedToken['id'] ?? null;
            $user = $this->entityManager->getRepository(User::class)->find($userId);

            if (!$user) {
                return new JsonResponse(['error' => 'Invalid token'], Response::HTTP_UNAUTHORIZED);
            }
        }

        if (!$user) {
            $user = $this->getUser();
        }

        /** @var Order $order */
        $order = $this->entityManager->getRepository(Order::class)->find($id);

        if (!$order) {
            return new JsonResponse(['error' => 'Order not found'], Response::HTTP_NOT_FOUND);
        }

        if ($order->getUser() !== $user) {
            return new JsonResponse(['error' => 'Access denied'], Response::HTTP_FORBIDDEN);
        }

        $options = new Options();
        $options->set('defaultFont', 'Arial');
        $dompdf = new Dompdf($options);

        $html = $this->renderView('pdf/' . $locale . '/invoice.html.twig', [
            'order' => $order,
            'user' => $user,
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

    #[Route('/api/order/subscription/cancel', name: 'api_subscription_cancel', methods: ['POST'])]
    public function cancelSubscription(Request $request): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');

        /** @var User $user */
        $user = $this->getUser();

        $data = json_decode($request->getContent(), true);
        $data = json_decode($data, true);

        $orderId = $data['orderId'] ?? null;

        if (!$orderId) {
            return new JsonResponse(['error' => 'Order ID is required'], Response::HTTP_BAD_REQUEST);
        }

        $order = $this->entityManager->getRepository(Order::class)->find($orderId);

        if (!$order || $order->getUser() !== $user) {
            return new JsonResponse(['error' => 'Order not found or access denied'], Response::HTTP_NOT_FOUND);
        }

        if (!$user->getSubscriptionId()) {
            return new JsonResponse(['error' => 'No active subscription found'], Response::HTTP_BAD_REQUEST);
        }

        Stripe::setApiKey($this->getParameter('stripe_private_key'));

        try {
            $subscription = \Stripe\Subscription::retrieve($user->getSubscriptionId());
            $subscription->cancel();

            $user->setSubscriptionId(null);
            $user->setIsPrenium(false);
            $this->entityManager->persist($user);

            $order->setStatus('terminated');
            $this->entityManager->flush();

            return new JsonResponse(['message' => 'Subscription canceled successfully'], Response::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
