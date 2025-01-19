<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250119130406 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE slide (id INT AUTO_INCREMENT NOT NULL, image_id INT NOT NULL, homepage_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, INDEX IDX_72EFEE623DA5256D (image_id), INDEX IDX_72EFEE62571EDDA (homepage_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE slide ADD CONSTRAINT FK_72EFEE623DA5256D FOREIGN KEY (image_id) REFERENCES media_object (id)');
        $this->addSql('ALTER TABLE slide ADD CONSTRAINT FK_72EFEE62571EDDA FOREIGN KEY (homepage_id) REFERENCES homepage (id)');
        $this->addSql('ALTER TABLE homepage_media_object DROP FOREIGN KEY FK_68F5EB9D571EDDA');
        $this->addSql('ALTER TABLE homepage_media_object DROP FOREIGN KEY FK_68F5EB9D64DE5A5');
        $this->addSql('DROP TABLE homepage_media_object');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE homepage_media_object (homepage_id INT NOT NULL, media_object_id INT NOT NULL, INDEX IDX_68F5EB9D571EDDA (homepage_id), INDEX IDX_68F5EB9D64DE5A5 (media_object_id), PRIMARY KEY(homepage_id, media_object_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE homepage_media_object ADD CONSTRAINT FK_68F5EB9D571EDDA FOREIGN KEY (homepage_id) REFERENCES homepage (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE homepage_media_object ADD CONSTRAINT FK_68F5EB9D64DE5A5 FOREIGN KEY (media_object_id) REFERENCES media_object (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE slide DROP FOREIGN KEY FK_72EFEE623DA5256D');
        $this->addSql('ALTER TABLE slide DROP FOREIGN KEY FK_72EFEE62571EDDA');
        $this->addSql('DROP TABLE slide');
    }
}
