<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241123140025 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE locale_cyna (code VARCHAR(5) NOT NULL, PRIMARY KEY(code)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE category_translation ADD locale_id VARCHAR(5) NOT NULL');
        $this->addSql('ALTER TABLE category_translation ADD CONSTRAINT FK_3F20704E559DFD1 FOREIGN KEY (locale_id) REFERENCES locale_cyna (code)');
        $this->addSql('CREATE INDEX IDX_3F20704E559DFD1 ON category_translation (locale_id)');
        $this->addSql('ALTER TABLE product_translation ADD locale_id VARCHAR(5) NOT NULL, ADD description LONGTEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE product_translation ADD CONSTRAINT FK_1846DB70E559DFD1 FOREIGN KEY (locale_id) REFERENCES locale_cyna (code)');
        $this->addSql('CREATE INDEX IDX_1846DB70E559DFD1 ON product_translation (locale_id)');

        $this->addSql('INSERT INTO locale_cyna (code) VALUES ("fr-FR"), ("en-GB"), ("ar-SA")');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category_translation DROP FOREIGN KEY FK_3F20704E559DFD1');
        $this->addSql('ALTER TABLE product_translation DROP FOREIGN KEY FK_1846DB70E559DFD1');
        $this->addSql('DROP TABLE locale_cyna');
        $this->addSql('DROP INDEX IDX_3F20704E559DFD1 ON category_translation');
        $this->addSql('ALTER TABLE category_translation DROP locale_id');
        $this->addSql('DROP INDEX IDX_1846DB70E559DFD1 ON product_translation');
        $this->addSql('ALTER TABLE product_translation DROP locale_id, DROP description');
    }
}
