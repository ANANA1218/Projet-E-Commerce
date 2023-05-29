<?php

namespace App\Repository;

use App\Entity\Contact;
use App\Entity\Utilisateur;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Contact>
 *
 * @method Contact|null find($id, $lockMode = null, $lockVersion = null)
 * @method Contact|null findOneBy(array $criteria, array $orderBy = null)
 * @method Contact[]    findAll()
 * @method Contact[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ContactRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Contact::class);
    }

    public function save(Contact $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Contact $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function getAll(): array
    {
        return $this->createQueryBuilder('c')
            ->select('c.id_contact', 'u.id_utilisateur', 'c.email', 'c.sujet', 'c.texte')
            ->join('c.id_client', 'u')
            ->getQuery()
            ->getResult();
    }

    public function getOne($id): ?Contact
    {
        $entityManager = $this->getEntityManager();
        $contact = $entityManager->getRepository(Contact::class)->find($id);

        return $contact;
    }

    public function create(array $data, Utilisateur $utilisateur): Contact
    {
        $contact = new Contact();
        $contact->setIdClient($utilisateur);
        $contact->setEmail($data['email']);
        $contact->setSujet($data['sujet']);
        $contact->setTexte($data['texte']);

        $entityManager = $this->getEntityManager();
        $entityManager->persist($contact);
        $entityManager->flush();

        return $contact;
    }

    //    /**
    //     * @return Contact[] Returns an array of Contact objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('c.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Contact
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
