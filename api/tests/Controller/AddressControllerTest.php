<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\User;
use App\Entity\Address;
use App\Repository\AddressRepository;

class AddressControllerTest extends WebTestCase
{
    private function setEntityId(object $entity, int $id): void
    {
        $ref = new \ReflectionClass($entity);
        $prop = $ref->getProperty('id');
        $prop->setAccessible(true);
        $prop->setValue($entity, $id);
    }

    public function testGetUserAddressesRequiresAuthentication()
    {
        $client = static::createClient();
        $client->request('GET', '/api/user/addresses');
        $this->assertSame(Response::HTTP_UNAUTHORIZED, $client->getResponse()->getStatusCode());
    }

    public function testGetUserAddressesReturnsAddressesForAuthenticatedUser()
    {
        $client = static::createClient();

        $user = new User();
        $user->setEmail('john@example.com');
        $user->setRoles(['ROLE_USER']);
        $user->setFirstname('John');
        $user->setLastname('Doe');
        $user->setPassword('dummy');
        $this->setEntityId($user, 1);

        $client->loginUser($user, 'main');

        $address1 = (new Address())
            ->setFirstname('John')
            ->setLastname('Doe')
            ->setAddress1('1 rue de Paris')
            ->setCity('Paris')
            ->setCounty('Ile-de-France')
            ->setPostalCode('75000')
            ->setCountry('France')
            ->setUser($user);
        $this->setEntityId($address1, 1);

        $address2 = (new Address())
            ->setFirstname('Jane')
            ->setLastname('Doe')
            ->setAddress1('2 avenue de Lyon')
            ->setCity('Lyon')
            ->setCounty('Auvergne-Rhône-Alpes')
            ->setPostalCode('69000')
            ->setCountry('France')
            ->setUser($user);
        $this->setEntityId($address2, 2);

        $addressRepository = $this->createMock(AddressRepository::class);
        $addressRepository->method('findBy')->willReturn([$address1, $address2]);

        $client->getContainer()->set(AddressRepository::class, $addressRepository);

        $client->request('GET', '/api/user/addresses');
        $response = $client->getResponse();

        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertIsArray($data);
        $this->assertCount(2, $data);
    }
}
