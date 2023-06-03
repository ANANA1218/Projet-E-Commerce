<?php

namespace App\Repository;

use App\Entity\Reduction;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Reduction>
 *
 * @method Reduction|null find($id, $lockMode = null, $lockVersion = null)
 * @method Reduction|null findOneBy(array $criteria, array $orderBy = null)
 * @method Reduction[]    findAll()
 * @method Reduction[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ReductionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Reduction::class);
    }

    public function save(Reduction $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Reduction $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function getAll(): array
    {
        return $this->createQueryBuilder('r')
            ->select('r.id_reduction', 'r.code_promo', 'r.pourcentage', 'r.actif', 'r.date_debut', 'r.date_fin')
            ->getQuery()
            ->getResult();
    }

    public function getOne($id): ?Reduction
    {
        $entityManager = $this->getEntityManager();
        $contact = $entityManager->getRepository(Reduction::class)->find($id);

        return $contact;
    }

    public function findByCode(string $code): ?Reduction
    {
        $entityManager = $this->getEntityManager();
        $code = $entityManager->getRepository(Reduction::class)->findOneBy(['code_promo' => $code]);

        return $code;
    }

    public function add(array $data): Reduction
    {
        $reduction = new Reduction();
        $reduction->setCodePromo($data['code_promo']);
        $reduction->setPourcentage($data['pourcentage']);
        $reduction->setActif($data['actif']);
        $reduction->setDateDebut(new \DateTime($data['date_debut']));
        $reduction->setDateFin(new \DateTime($data['date_fin']));

        $entityManager = $this->getEntityManager();
        $entityManager->persist($reduction);
        $entityManager->flush();

        return $reduction;
    }

    public function update(int $id, array $data): void
    {
        $reduction = $this->find($id);

        if (!$reduction) {
            throw new \RuntimeException('No reduction found for ID ' . $id);
        }

        foreach ($data as $key => $value) {
            switch ($key) {
                case 'code_promo':
                    $reduction->setCodePromo($value);
                    break;
                case 'pourcentage':
                    $reduction->setPourcentage($value);
                    break;
                case 'actif':
                    $reduction->setActif($value);
                    break;
                case 'date_debut':
                    $reduction->setDateDebut(new \DateTime($value));
                    break;
                case 'date_fin':
                    $reduction->setDateFin(new \DateTime($value));
                    break;
            }
        }
        $this->getEntityManager()->flush();
    }

    public function delete(int $id): void
    {
        $reduction = $this->find($id);

        if ($reduction) {
            $this->getEntityManager()->remove($reduction);
            $this->getEntityManager()->flush();
        }
    }

    //    /**
    //     * @return Reduction[] Returns an array of Reduction objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('r')
    //            ->andWhere('r.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('r.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Reduction
    //    {
    //        return $this->createQueryBuilder('r')
    //            ->andWhere('r.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
