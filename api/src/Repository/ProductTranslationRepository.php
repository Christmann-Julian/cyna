<?php

namespace App\Repository;

use App\Entity\ProductTranslation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ProductTranslation>
 */
class ProductTranslationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ProductTranslation::class);
    }

    public function findByLocaleAndCategory(string $locale, int $categoryId, int $id, int $limit = 10)
    {
        return $this->createQueryBuilder('pt')
            ->innerJoin('pt.product', 'p')
            ->innerJoin('p.category', 'c')
            ->where('pt.locale = :locale')
            ->andWhere('c.id = :categoryId')
            ->andWhere('pt.id != :id')
            ->setParameter('locale', $locale)
            ->setParameter('categoryId', $categoryId)
            ->setParameter('id', $id)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }

    public function findProdyuctByLocaleAndCategory(string $locale, int $categoryId, int $limit = 10)
    {
        return $this->createQueryBuilder('pt')
            ->innerJoin('pt.product', 'p')
            ->innerJoin('p.category', 'c')
            ->where('pt.locale = :locale')
            ->andWhere('c.id = :categoryId')
            ->setParameter('locale', $locale)
            ->setParameter('categoryId', $categoryId)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }

    public function findByLocale(string $locale, int $id, int $limit = 10)
    {
        return $this->createQueryBuilder('pt')
            ->where('pt.locale = :locale')
            ->andWhere('pt.product != :id')
            ->setParameter('locale', $locale)
            ->setParameter('id', $id)
            ->orderBy('pt.id', 'DESC')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }

    public function findTopProduct(string $locale, int $limit = 6)
    {
        return $this->createQueryBuilder('pt')
            ->innerJoin('pt.product', 'p')
            ->where('pt.locale = :locale')
            ->andWhere('p.top_product = 1')
            ->setParameter('locale', $locale)
            ->orderBy('p.position', 'ASC')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }
}
