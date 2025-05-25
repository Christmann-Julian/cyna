<?php

namespace App\Repository;

use App\Entity\Order;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Order>
 */
class OrderRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Order::class);
    }

    public function getSalesPerDay(): array
    {
        $qb = $this->createQueryBuilder('o')
            ->select('DATE(o.date) as date, SUM(o.total) as sales')
            ->groupBy('date')
            ->orderBy('date', 'ASC');

        return $qb->getQuery()->getResult();
    }

    public function getAverageCart(): array
    {
        $qb = $this->createQueryBuilder('o')
            ->select('DATE(o.date) as date, MIN(o.total) as cartMin, AVG(o.total) as cartAverage, MAX(o.total) as cartMax')
            ->groupBy('date')
            ->orderBy('date', 'ASC');

        return $qb->getQuery()->getResult();
    }

    public function getCategorySales(): array
    {
        $qb = $this->createQueryBuilder('o')
            ->select('ol.category as category, SUM(ol.quantity * ol.price) as value')
            ->join('o.orderLines', 'ol')
            ->groupBy('category')
            ->orderBy('value', 'DESC');

        return $qb->getQuery()->getResult();
    }
}
