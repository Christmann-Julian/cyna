<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250201140247 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product ADD promotion_active TINYINT(1) NOT NULL, ADD promotion_label VARCHAR(25) DEFAULT NULL, ADD promotion_price DOUBLE PRECISION DEFAULT NULL');
        $this->addSql('ALTER TABLE category ADD priority INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product DROP promotion_active, DROP promotion_label, DROP promotion_price');
        $this->addSql('ALTER TABLE category DROP priority');
    }
}
