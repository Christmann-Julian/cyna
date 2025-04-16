<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250409081204 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE subscription (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, subtitle VARCHAR(255) NOT NULL, price DOUBLE PRECISION NOT NULL, is_active TINYINT(1) NOT NULL, locale VARCHAR(5) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE subscription ADD duration INT NOT NULL, ADD position INT DEFAULT NULL');
        $this->addSql('CREATE TABLE subscription_caracteristic (id INT AUTO_INCREMENT NOT NULL, subscription_id INT NOT NULL, position INT DEFAULT NULL, text VARCHAR(255) NOT NULL, INDEX IDX_F590D3BF9A1887DC (subscription_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE subscription_caracteristic ADD CONSTRAINT FK_F590D3BF9A1887DC FOREIGN KEY (subscription_id) REFERENCES subscription (id)');
        $this->addSql('ALTER TABLE user ADD is_prenium TINYINT(1) NOT NULL, ADD subscription_id VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE subscription_caracteristic DROP FOREIGN KEY FK_F590D3BF9A1887DC');
        $this->addSql('DROP TABLE subscription');
        $this->addSql('DROP TABLE subscription_caracteristic');
        $this->addSql('ALTER TABLE `user` DROP is_prenium, DROP subscription_id');
    }
}
