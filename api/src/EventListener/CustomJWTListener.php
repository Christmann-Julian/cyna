<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class CustomJWTListener
{
    public function onJWTCreated(JWTCreatedEvent $event): void
    {
        $payload = $event->getData();

        /** @var User $user */
        $user = $event->getUser();

        if ($user) {
            $payload['id'] = $user->getId();
        }

        $event->setData($payload);
    }
}
