<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230505181404 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE materiel CHANGE id_materiel id_materiel INT AUTO_INCREMENT NOT NULL, ADD PRIMARY KEY (id_materiel)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE materiel MODIFY id_materiel INT NOT NULL');
        $this->addSql('DROP INDEX `primary` ON materiel');
        $this->addSql('ALTER TABLE materiel CHANGE id_materiel id_materiel INT NOT NULL');
    }
}
