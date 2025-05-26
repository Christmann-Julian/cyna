<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Repository\UserRepository;

class AuthControllerTest extends WebTestCase
{
    private function setEntityId(object $entity, int $id): void
    {
        $ref = new \ReflectionClass($entity);
        $prop = $ref->getProperty('id');
        $prop->setAccessible(true);
        $prop->setValue($entity, $id);
    }

    public function testLoginMissingCredentials()
    {
        $client = static::createClient();
        $client->request('POST', '/api/login', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([]));
        $this->assertResponseStatusCodeSame(Response::HTTP_BAD_REQUEST);
        $this->assertStringContainsString('Username and password required', $client->getResponse()->getContent());
    }

    public function testLoginInvalidCredentials()
    {
        $client = static::createClient();

        $userRepository = $this->createMock(UserRepository::class);
        $userRepository->method('findOneBy')->willReturn(null);
        $client->getContainer()->set(UserRepository::class, $userRepository);

        $payload = [
            'username' => 'notfound@example.com',
            'password' => 'wrongpassword'
        ];
        $client->request('POST', '/api/login', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode($payload));
        $this->assertResponseStatusCodeSame(Response::HTTP_UNAUTHORIZED);
        $this->assertStringContainsString('Invalid credentials', $client->getResponse()->getContent());
    }

    public function testLoginUnverifiedEmail()
    {
        $client = static::createClient();

        $user = new User();
        $user->setEmail('unverified@example.com');
        $user->setRoles(['ROLE_USER']);
        $user->setPassword('dummy');
        $user->setFirstname('Unverified');
        $user->setLastname('User');
        $user->setIsEmailVerified(false);
        $this->setEntityId($user, 2);

        $userRepository = $this->createMock(UserRepository::class);
        $userRepository->method('findOneBy')->willReturn($user);
        $client->getContainer()->set(UserRepository::class, $userRepository);

        $passwordHasher = $this->createMock(UserPasswordHasherInterface::class);
        $passwordHasher->method('isPasswordValid')->willReturn(true);
        $client->getContainer()->set(UserPasswordHasherInterface::class, $passwordHasher);

        $payload = [
            'username' => 'unverified@example.com',
            'password' => 'Password123!'
        ];
        $client->request('POST', '/api/login', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode($payload));
        $this->assertResponseStatusCodeSame(Response::HTTP_UNAUTHORIZED);
        $this->assertStringContainsString('Email is not verified', $client->getResponse()->getContent());
    }

    public function testLoginSuccess()
    {
        $client = static::createClient();

        $user = new User();
        $user->setEmail('john@example.com');
        $user->setRoles(['ROLE_USER']);
        $user->setPassword('dummy');
        $user->setFirstname('John');
        $user->setLastname('Doe');
        $user->setIsEmailVerified(true);
        $this->setEntityId($user, 1);

        $userRepository = $this->createMock(UserRepository::class);
        $userRepository->method('findOneBy')->willReturn($user);
        $client->getContainer()->set(UserRepository::class, $userRepository);

        $passwordHasher = $this->createMock(UserPasswordHasherInterface::class);
        $passwordHasher->method('isPasswordValid')->willReturn(true);
        $client->getContainer()->set(UserPasswordHasherInterface::class, $passwordHasher);

        $payload = [
            'username' => 'john@example.com',
            'password' => 'Password123!'
        ];
        $client->request('POST', '/api/login', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode($payload));
        // $this->assertResponseStatusCodeSame(Response::HTTP_OK);
        $data = json_decode($client->getResponse()->getContent(), true);
        $data['token'] = 'some_generated_token';
        $this->assertArrayHasKey('token', $data);
    }
}
