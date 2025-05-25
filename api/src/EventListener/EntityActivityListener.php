<?php

namespace App\EventListener;

use App\Service\ActivityLoggerService;
use Doctrine\ORM\Event\PreRemoveEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class EntityActivityListener
{
    private ActivityLoggerService $activityLogger;

    private array $watchedEntities = [
        'Address',
        'Category',
        'CategoryTranslation',
        'Contact',
        'Homepage',
        'MediaObject',
        'PaymentMethod',
        'Product',
        'ProductTranslation',
        'User',
    ];

    private array $watchedTranslations = [
        'CategoryTranslation',
        'ProductTranslation',
    ];

    public function __construct(ActivityLoggerService $activityLogger)
    {
        $this->activityLogger = $activityLogger;
    }

    public function postPersist(LifecycleEventArgs $args): void
    {
        $this->logActivity('create', $args);
    }

    public function preUpdate(PreUpdateEventArgs $args): void
    {
        $this->logActivity('update', $args, $args->getEntityChangeSet());
    }

    public function preRemove(PreRemoveEventArgs $args): void
    {
        $this->logActivity('delete', $args);
    }

    private function logActivity(string $action, LifecycleEventArgs $args, array $changeSet = []): void
    {
        $entity = $args->getObject();

        if ($entity instanceof \App\Entity\LogActivity || $entity instanceof \App\Entity\LogField) {
            return;
        }

        $entityClass = (new \ReflectionClass($entity))->getShortName();

        if (!in_array($entityClass, $this->watchedEntities)) {
            return;
        }

        if (in_array($entityClass, $this->watchedTranslations) && method_exists($entity, 'getLocale')) {
            $entityClass .= "-" . $entity->getLocale()->getCode();
        }

        $entityId = method_exists($entity, 'getId') ? $entity->getId() : null;
        $this->activityLogger->log($action, $entityClass, $entityId, $changeSet);
    }
}
