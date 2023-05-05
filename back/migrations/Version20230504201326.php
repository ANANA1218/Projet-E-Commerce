<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230504201326 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE image DROP FOREIGN KEY image_ibfk_1');
        $this->addSql('ALTER TABLE image DROP FOREIGN KEY image_ibfk_2');
        $this->addSql('ALTER TABLE utilisateur DROP FOREIGN KEY utilisateur_ibfk_1');
        $this->addSql('ALTER TABLE commande DROP FOREIGN KEY commande_ibfk_1');
        $this->addSql('ALTER TABLE commande DROP FOREIGN KEY commande_ibfk_2');
        $this->addSql('ALTER TABLE commande DROP FOREIGN KEY commande_ibfk_3');
        $this->addSql('ALTER TABLE asso_produit_materiel DROP FOREIGN KEY asso_produit_materiel_ibfk_1');
        $this->addSql('ALTER TABLE asso_produit_materiel DROP FOREIGN KEY asso_produit_materiel_ibfk_2');
        $this->addSql('ALTER TABLE produit DROP FOREIGN KEY produit_ibfk_1');
        $this->addSql('ALTER TABLE contact DROP FOREIGN KEY contact_ibfk_1');
        $this->addSql('ALTER TABLE mode_paiement DROP FOREIGN KEY mode_paiement_ibfk_1');
        $this->addSql('DROP TABLE adresse');
       $this->addSql('DROP TABLE statut');
        $this->addSql('DROP TABLE commande');
        $this->addSql('DROP TABLE asso_produit_materiel');
        $this->addSql('DROP TABLE produit');
        $this->addSql('DROP TABLE contact');
        $this->addSql('DROP TABLE mode_paiement');
        $this->addSql('ALTER TABLE materiel ADD id INT AUTO_INCREMENT NOT NULL, CHANGE id_materiel id_materiel INT NOT NULL, DROP PRIMARY KEY, ADD PRIMARY KEY (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE adresse (id_adresse INT AUTO_INCREMENT NOT NULL, id_client INT NOT NULL, rue VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, complement_adresse VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, region VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, ville VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, code_postal INT DEFAULT NULL, pays VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, statut VARCHAR(50) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, INDEX id_client (id_client), PRIMARY KEY(id_adresse)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE image (id_image INT AUTO_INCREMENT NOT NULL, id_categorie INT NOT NULL, id_produit INT NOT NULL, lien_image VARCHAR(50) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, INDEX id_categorie (id_categorie), INDEX id_produit (id_produit), PRIMARY KEY(id_image)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE utilisateur (id_client INT AUTO_INCREMENT NOT NULL, id_role INT NOT NULL, nom VARCHAR(112) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, prenom VARCHAR(150) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, email VARCHAR(150) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, mot_de_passe VARCHAR(100) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, telephone VARCHAR(100) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, INDEX id_role (id_role), PRIMARY KEY(id_client)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE statut (id_statut INT AUTO_INCREMENT NOT NULL, id_commande INT NOT NULL, libelle VARCHAR(100) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_0900_ai_ci`, INDEX id_commande (id_commande), PRIMARY KEY(id_statut)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE commande (id_commande INT AUTO_INCREMENT NOT NULL, id INT DEFAULT NULL, id_adresse INT NOT NULL, id_client INT NOT NULL, date_commande DATE DEFAULT NULL, prix_total NUMERIC(15, 2) DEFAULT NULL, INDEX id (id), INDEX id_adresse (id_adresse), INDEX id_client (id_client), PRIMARY KEY(id_commande)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE role (id_role INT AUTO_INCREMENT NOT NULL, libelle_role VARCHAR(50) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, PRIMARY KEY(id_role)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE asso_produit_materiel (id_produit INT NOT NULL, id_materiel INT NOT NULL, INDEX id_materiel (id_materiel), INDEX IDX_465375E2F7384557 (id_produit), PRIMARY KEY(id_produit, id_materiel)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE categorie (id_categorie INT AUTO_INCREMENT NOT NULL, nom_categorie VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, image_categorie VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, PRIMARY KEY(id_categorie)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE reduction (id INT AUTO_INCREMENT NOT NULL, code_promo VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, pourcentage INT DEFAULT NULL, actif TINYINT(1) DEFAULT NULL, periode DATE DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE produit (id_produit INT AUTO_INCREMENT NOT NULL, id_categorie INT NOT NULL, nom_produit VARCHAR(50) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, description TEXT CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, stock INT DEFAULT NULL, prix NUMERIC(15, 2) DEFAULT NULL, date_ajout DATE DEFAULT NULL, INDEX id_categorie (id_categorie), PRIMARY KEY(id_produit)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE contact (id_contact INT AUTO_INCREMENT NOT NULL, id_client INT DEFAULT NULL, email VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, sujet VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, texte TEXT CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, INDEX id_client (id_client), PRIMARY KEY(id_contact)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE mode_paiement (id_paiement INT AUTO_INCREMENT NOT NULL, id_client INT NOT NULL, libelle_paiement VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, INDEX id_client (id_client), PRIMARY KEY(id_paiement)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE adresse ADD CONSTRAINT adresse_ibfk_1 FOREIGN KEY (id_client) REFERENCES utilisateur (id_client) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE image ADD CONSTRAINT image_ibfk_1 FOREIGN KEY (id_categorie) REFERENCES categorie (id_categorie) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE image ADD CONSTRAINT image_ibfk_2 FOREIGN KEY (id_produit) REFERENCES produit (id_produit) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE utilisateur ADD CONSTRAINT utilisateur_ibfk_1 FOREIGN KEY (id_role) REFERENCES role (id_role) ON UPDATE NO ACTION ON DELETE NO ACTION');
       $this->addSql('ALTER TABLE statut ADD CONSTRAINT statut_ibfk_1 FOREIGN KEY (id_commande) REFERENCES commande (id_commande) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE commande ADD CONSTRAINT commande_ibfk_1 FOREIGN KEY (id) REFERENCES reduction (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE commande ADD CONSTRAINT commande_ibfk_2 FOREIGN KEY (id_adresse) REFERENCES adresse (id_adresse) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE commande ADD CONSTRAINT commande_ibfk_3 FOREIGN KEY (id_client) REFERENCES utilisateur (id_client) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE asso_produit_materiel ADD CONSTRAINT asso_produit_materiel_ibfk_1 FOREIGN KEY (id_produit) REFERENCES produit (id_produit) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE asso_produit_materiel ADD CONSTRAINT asso_produit_materiel_ibfk_2 FOREIGN KEY (id_materiel) REFERENCES materiel (id_materiel) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE produit ADD CONSTRAINT produit_ibfk_1 FOREIGN KEY (id_categorie) REFERENCES categorie (id_categorie) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE contact ADD CONSTRAINT contact_ibfk_1 FOREIGN KEY (id_client) REFERENCES utilisateur (id_client) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE mode_paiement ADD CONSTRAINT mode_paiement_ibfk_1 FOREIGN KEY (id_client) REFERENCES utilisateur (id_client) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE materiel MODIFY id INT NOT NULL');
        $this->addSql('DROP INDEX `PRIMARY` ON materiel');
        $this->addSql('ALTER TABLE materiel DROP id, CHANGE id_materiel id_materiel INT AUTO_INCREMENT NOT NULL');
        $this->addSql('ALTER TABLE materiel ADD PRIMARY KEY (id_materiel)');
    }
}
