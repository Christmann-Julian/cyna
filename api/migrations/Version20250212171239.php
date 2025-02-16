<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250212171239 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE log_activity (id INT AUTO_INCREMENT NOT NULL, user VARCHAR(255) NOT NULL, action VARCHAR(50) NOT NULL, entity_type VARCHAR(50) NOT NULL, entity_id INT DEFAULT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE log_field (id INT AUTO_INCREMENT NOT NULL, log_activity_id INT DEFAULT NULL, field VARCHAR(255) NOT NULL, INDEX IDX_7B8BAE05DD791C3E (log_activity_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE log_field ADD CONSTRAINT FK_7B8BAE05DD791C3E FOREIGN KEY (log_activity_id) REFERENCES log_activity (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE log_activity');
        $this->addSql('ALTER TABLE log_field DROP FOREIGN KEY FK_7B8BAE05DD791C3E');
        $this->addSql('DROP TABLE log_field');
    }
}
