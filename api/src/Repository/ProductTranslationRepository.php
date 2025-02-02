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
            ->orderBy('p.disponibility', 'DESC')
            ->addOrderBy('p.priority', 'ASC')
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
            ->orderBy('p.disponibility', 'DESC')
            ->addOrderBy('p.priority', 'ASC')
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
            ->orderBy('p.disponibility', 'DESC')
            ->addOrderBy('p.priority', 'ASC')
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
            ->orderBy('p.disponibility', 'DESC')
            ->addOrderBy('p.position', 'ASC')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }

    public function findBySearchTerm(
        string $locale,
        string $searchTerm,
        int $limit = 50,
        int $offset = 0,
        string $by = 'none',
        ?int $category = null,
        ?float $priceMin = null,
        ?float $priceMax = null
    ): array {
        $qb = $this->createQueryBuilder('pt')
            ->join('pt.product', 'p')
            ->where('pt.locale = :locale')
            ->setParameter('locale', $locale);

        if ($category !== null) {
            $qb->join('p.category', 'c')
                ->andWhere('c.id = :category')
                ->setParameter('category', $category);
        }

        if ($priceMin !== null) {
            $qb->andWhere('p.price >= :priceMin')
                ->setParameter('priceMin', $priceMin);
        }

        if ($priceMax !== null) {
            $qb->andWhere('p.price <= :priceMax')
                ->setParameter('priceMax', $priceMax);
        }

        $similarTerms = $this->generateSimilarTerms($searchTerm);

        $qb->addSelect('CASE 
                WHEN LOWER(pt.name) = :exactTerm OR LOWER(pt.description) = :exactTerm THEN 1
                WHEN ' . $this->buildSimilarTermsCase($similarTerms) . ' THEN 2
                WHEN pt.name LIKE :startTerm OR pt.description LIKE :startTerm THEN 3
                WHEN pt.name LIKE :containTerm OR pt.description LIKE :containTerm THEN 4
                ELSE 5
            END AS HIDDEN prio')
            ->andWhere('(
                LOWER(pt.name) = :exactTerm OR 
                LOWER(pt.description) = :exactTerm OR
                ' . $this->buildSimilarTermsWhere($similarTerms) . ' OR
                pt.name LIKE :startTerm OR 
                pt.description LIKE :startTerm OR
                pt.name LIKE :containTerm OR 
                pt.description LIKE :containTerm
            )')
            ->setParameter('exactTerm', strtolower($searchTerm))
            ->setParameter('startTerm', $searchTerm . '%')
            ->setParameter('containTerm', '%' . $searchTerm . '%');

        switch ($by) {
            case 'created_at':
                $qb->orderBy('p.createdAt', 'DESC');
                break;
            case 'price-asc':
                $qb->orderBy('p.price', 'ASC');
                break;
            case 'price-desc':
                $qb->orderBy('p.price', 'DESC');
                break;
            case 'disponibility':
                $qb->orderBy('p.disponibility', 'DESC');
                break;
            case 'promotion':
                $qb->orderBy('p.promotionActive', 'DESC')
                    ->addOrderBy('p.promotionPrice', 'ASC');
                break;
            case 'none':
            default:
                $qb->orderBy('prio', 'ASC');
                break;
        }

        $qb->addOrderBy('pt.name', 'ASC')
            ->setMaxResults($limit)
            ->setFirstResult($offset);

        foreach ($similarTerms as $key => $term) {
            $qb->setParameter("similar{$key}", $term);
        }

        return $qb->getQuery()->getResult();
    }

    private function generateSimilarTerms(string $term): array
    {
        $term = strtolower($term);
        $length = strlen($term);
        $similarTerms = [];

        // Génére des variations avec une lettre différente
        for ($i = 0; $i < $length; $i++) {
            // Remplacer chaque caractère par un joker SQL
            $variant = substr($term, 0, $i) . '_' . substr($term, $i + 1);
            $similarTerms[] = $variant;
        }

        // Ajoute une lettre manquante
        for ($i = 0; $i <= $length; $i++) {
            $variant = substr($term, 0, $i) . '_' . substr($term, $i);
            $similarTerms[] = $variant;
        }

        return array_unique($similarTerms);
    }

    private function buildSimilarTermsCase(array $similarTerms): string
    {
        $cases = [];
        foreach ($similarTerms as $key => $term) {
            $cases[] = "LOWER(pt.name) LIKE :similar{$key} OR LOWER(pt.description) LIKE :similar{$key}";
        }
        return '(' . implode(' OR ', $cases) . ')';
    }

    private function buildSimilarTermsWhere(array $similarTerms): string
    {
        $conditions = [];
        foreach ($similarTerms as $key => $term) {
            $conditions[] = "LOWER(pt.name) LIKE :similar{$key} OR LOWER(pt.description) LIKE :similar{$key}";
        }
        return '(' . implode(' OR ', $conditions) . ')';
    }

    public function countSearchResults(string $locale, string $searchTerm): int
    {
        $qb = $this->createQueryBuilder('pt')
            ->select('COUNT(pt.id)')
            ->join('pt.product', 'p')
            ->where('pt.locale = :locale')
            ->setParameter('locale', $locale);

        $similarTerms = $this->generateSimilarTerms($searchTerm);

        $qb->andWhere('(
                LOWER(pt.name) = :exactTerm OR 
                LOWER(pt.description) = :exactTerm OR
                ' . $this->buildSimilarTermsWhere($similarTerms) . ' OR
                pt.name LIKE :startTerm OR 
                pt.description LIKE :startTerm OR
                pt.name LIKE :containTerm OR 
                pt.description LIKE :containTerm
            )')
            ->setParameter('exactTerm', strtolower($searchTerm))
            ->setParameter('startTerm', $searchTerm . '%')
            ->setParameter('containTerm', '%' . $searchTerm . '%');

        foreach ($similarTerms as $key => $term) {
            $qb->setParameter("similar{$key}", $term);
        }

        return $qb->getQuery()->getSingleScalarResult();
    }
}
