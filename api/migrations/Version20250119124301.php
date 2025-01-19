<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250119124301 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category ADD image_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE category ADD CONSTRAINT FK_64C19C13DA5256D FOREIGN KEY (image_id) REFERENCES media_object (id)');
        $this->addSql('CREATE INDEX IDX_64C19C13DA5256D ON category (image_id)');
        $this->addSql('CREATE TABLE homepage_media_object (homepage_id INT NOT NULL, media_object_id INT NOT NULL, INDEX IDX_68F5EB9D571EDDA (homepage_id), INDEX IDX_68F5EB9D64DE5A5 (media_object_id), PRIMARY KEY(homepage_id, media_object_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE homepage_media_object ADD CONSTRAINT FK_68F5EB9D571EDDA FOREIGN KEY (homepage_id) REFERENCES homepage (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE homepage_media_object ADD CONSTRAINT FK_68F5EB9D64DE5A5 FOREIGN KEY (media_object_id) REFERENCES media_object (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE image DROP FOREIGN KEY FK_C53D045F571EDDA');
        $this->addSql('DROP TABLE image');
        $this->addSql('ALTER TABLE category DROP url_image');
        $this->addSql('ALTER TABLE product ADD image_id INT DEFAULT NULL, DROP url_image');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD3DA5256D FOREIGN KEY (image_id) REFERENCES media_object (id)');
        $this->addSql('CREATE INDEX IDX_D34A04AD3DA5256D ON product (image_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category DROP FOREIGN KEY FK_64C19C13DA5256D');
        $this->addSql('DROP INDEX IDX_64C19C13DA5256D ON category');
        $this->addSql('ALTER TABLE category DROP image_id');
        $this->addSql('CREATE TABLE image (id INT AUTO_INCREMENT NOT NULL, homepage_id INT DEFAULT NULL, text VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, url_image VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, INDEX IDX_C53D045F571EDDA (homepage_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE image ADD CONSTRAINT FK_C53D045F571EDDA FOREIGN KEY (homepage_id) REFERENCES homepage (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE homepage_media_object DROP FOREIGN KEY FK_68F5EB9D571EDDA');
        $this->addSql('ALTER TABLE homepage_media_object DROP FOREIGN KEY FK_68F5EB9D64DE5A5');
        $this->addSql('DROP TABLE homepage_media_object');
        $this->addSql('ALTER TABLE category ADD url_image VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04AD3DA5256D');
        $this->addSql('DROP INDEX IDX_D34A04AD3DA5256D ON product');
        $this->addSql('ALTER TABLE product ADD url_image VARCHAR(255) NOT NULL, DROP image_id');
    }
}
