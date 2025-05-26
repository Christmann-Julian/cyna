<?php

namespace App\Service;

use App\Entity\LogField;
use App\Entity\LogActivity;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class ActivityLoggerService
{
    public function __construct(private EntityManagerInterface $em, private TokenStorageInterface $tokenStorage) {}

    public function log(string $action, string $entityType, int $entityId = null, array $changeSet = []): void
    {
        foreach ($changeSet as $field => $changes) {
            if ($field === 'isEmailVerified') {
                $action = 'email-verif';
                break;
            } elseif ($field === 'twoFaCode') {
                $action = 'login-2fa';
                break;
            }
        }

        $token = $this->tokenStorage->getToken();
        $user = $token ? $token->getUser() : null;
        $username = $user instanceof UserInterface ? $user->getUserIdentifier() : 'anonymous';

        $log = new LogActivity();
        $log->setUser($username);
        $log->setAction($action);
        $log->setEntityType($entityType);
        $log->setEntityId($entityId);

        $eventManager = $this->em->getEventManager();
        $entityActivityListener = null;

        foreach ($eventManager->getListeners('preUpdate') as $listener) {
            if ($listener instanceof \App\EventListener\EntityActivityListener) {
                $entityActivityListener = $listener;
                $eventManager->removeEventListener(['preUpdate', 'preRemove', 'postPersist'], $listener);
                break;
            }
        }

        $this->em->persist($log);
        $this->em->flush();

        foreach ($changeSet as $field => $changes) {
            $logField = new LogField();
            $logField->setField($field);
            $logField->setLogActivity($log);

            $this->em->persist($logField);
        }

        $this->em->flush();

        if ($entityActivityListener) {
            $eventManager->addEventListener(['preUpdate', 'preRemove', 'postPersist'], $entityActivityListener);
        }
    }
}
