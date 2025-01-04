<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241215134700 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE confirm_email (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(255) NOT NULL, email_token VARCHAR(255) NOT NULL, expires_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', UNIQUE INDEX UNIQ_106C771EE7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B1017252E7927C74 ON password_reset (email)');
        $this->addSql('ALTER TABLE user ADD is_email_verified TINYINT(1) NOT NULL');
        $this->addSql('UPDATE user SET is_email_verified = 1 WHERE email = "admin@admin.fr"');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE confirm_email');
        $this->addSql('DROP INDEX UNIQ_B1017252E7927C74 ON password_reset');
        $this->addSql('ALTER TABLE `user` DROP is_email_verified');
    }
}
