# Projet d'étude de Bachelor

Cyna est un projet d’étude visant à concevoir une plateforme e-commerce complète, moderne et sécurisée. Il intègre une API en Symfony pour la gestion des données, un front-end en React.js pour l’interface web et une application mobile en react native. Ce projet propose des fonctionnalités clés comme la gestion de produits, commandes, utilisateurs, paiements via Stripe, notifications par e-mail et un système d'administration.

# Sommaire

- [Installation](#guide-dinstallation)
- [Documentation de l'api](#documentation-de-lapi)
- [Créateurs](#créateurs)
- [Copyright et licence](#copyright-et-licence)

# Guide d'installation

## Prérequis

Assurez-vous d’avoir les outils suivants installés :

| Outil            | Version recommandée |
|------------------|---------------------|
| PHP              | 8.2                 |
| Symfony CLI      | Dernière version    |
| Composer         | 2.7.1               |
| MySQL            | 8.2                 |
| Node.js          | 20.11               |
| npm              | 10.2.4              |
| phpMyAdmin       | Recommandé          |
| Mailhog          | Pour emails en dev  |
| WAMP/MAMP/XAMPP  | Recommandé en dev   |

---

## Étapes d’installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/Christmann-Julian/cyna.git
cd cyna
```

---

### 2. Configuration des variables d’environnement

Créez un fichier `.env.local` ou `.env.prod` dans le dossier `/api` selon votre environnement :

```
STRIPE_PRIVATE_KEY=your_stripe_private_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

---

### 3. Installation des dépendances back-end

```bash
cd ./api
composer install
```

---

### 4. Base de données

#### Créer la base `cyna`

- **Avec phpMyAdmin** :
  - Connectez-vous à `localhost/phpmyadmin`
  - Créez une base de données nommée `cyna`

- **En ligne de commande** :

```bash
mysql -u root -p -e "CREATE DATABASE cyna CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

#### Lancer les migrations

```bash
php bin/console doctrine:migrations:migrate
```

#### (Optionnel) Charger les données de démonstration

```bash
mysql -u root -p cyna < cyna.sql
```

---

### 5. Installation des dépendances front-end

```bash
cd ../front
npm install
```

---

### 6. Lancer les serveurs

#### API

```bash
cd ../api
symfony serve
```

#### Frontend

```bash
cd ../front
npm run dev
```

#### Mailhog (pour le développement)

- **Linux/macOS** :

```bash
mailhog
```

- **Windows** :
  - Téléchargez [Mailhog](https://github.com/mailhog/MailHog/releases)
  - Lancez l’exécutable `MailHog.exe`

> Mailhog est ensuite accessible à l’adresse : http://localhost:8025

---

## Guide spécifique par OS

### Windows

- Utilisez **WAMP** ou **XAMPP** pour configurer MySQL et Apache facilement.
- Lancez Mailhog via l’exécutable.
- Utilisez `cmd`, `PowerShell` ou `Git Bash` pour les commandes.

### macOS

- Utilisez **MAMP** pour un environnement de dev simple.
- Installez PHP/MySQL via Homebrew si vous préférez en ligne de commande.
- Utilisez le Terminal pour toutes les commandes.

### Linux

- Utilisez votre gestionnaire de paquets pour PHP, MySQL, Node.js, etc.
- Exemple avec `apt` (Ubuntu/Debian) :

```bash
sudo apt install php8.2 php8.2-cli mysql-server nodejs npm
```

- Installez Mailhog via Go ou binaire : https://github.com/mailhog/MailHog

---

## Résultat attendu

- API disponible sur : http://localhost:8000
- Frontend disponible sur : http://localhost:5173
- Mailhog : http://localhost:8025

# Documentation de l'API

    Base URL : https://{domain_name}/api

Toutes les routes de l'API supportent le format JSON par défaut et suivent les conventions REST.

## Authentification

| Méthode | Endpoint          | Description                      |
| ------- | ----------------- | -------------------------------- |
| POST    | `/login`          | Connexion                        |
| POST    | `/logout`         | Déconnexion                      |
| POST    | `/token/refresh`  | Rafraîchir un token JWT          |
| POST    | `/token/verify`   | Vérifier un token JWT            |
| POST    | `/two-fa`         | Authentification à deux facteurs |
| POST    | `/users/register` | Inscription                      |

## Utilisateurs

| Méthode | Endpoint                | Description                       |
| ------- | ----------------------- | --------------------------------- |
| GET     | `/users`      | Liste des utilisateurs            |
| GET     | `/users/{id}` | Détails d’un utilisateur          |
| POST    | `/users`      | Créer un utilisateur              |
| PUT     | `/users/{id}` | Modifier un utilisateur (complet) |
| PATCH   | `/users/{id}` | Modifier un utilisateur (partiel) |
| DELETE  | `/users/{id}` | Supprimer un utilisateur          |

## Produits

| Méthode | Endpoint                   | Description          |
| ------- | -------------------------- | -------------------- |
| GET     | `/products`      | Liste des produits   |
| GET     | `/products/{id}` | Détails d’un produit |
| POST    | `/products`      | Créer un produit     |
| PUT     | `/products/{id}` | Modifier un produit  |
| DELETE  | `/products/{id}` | Supprimer un produit |

## Commandes

| Méthode | Endpoint                        | Description                              |
| ------- | ------------------------------- | ---------------------------------------- |
| GET     | `/orders`             | Liste des commandes                      |
| GET     | `/orders/{id}`        | Détails d’une commande                   |
| POST    | `/orders`             | Créer une commande                       |
| PUT     | `/orders/{id}`        | Mettre à jour une commande               |
| GET     | `/order/{locale}/{id}/download` | Télécharger la commande                  |
| GET     | `/order/by-year`                | Commandes par année                      |
| POST    | `/order/subscription/cancel`    | Annuler un abonnement lié à une commande |
| POST    | `/checkout`                     | Finaliser l’achat                        |

## Codes Promotionnels

| Méthode | Endpoint                            | Description                |
| ------- | ----------------------------------- | -------------------------- |
| GET     | `/promotional_codes`      | Liste des codes            |
| GET     | `/promotional_codes/{id}` | Détails d’un code          |
| POST    | `/promotional_codes`      | Créer un code              |
| PUT     | `/promotional_codes/{id}` | Modifier un code           |
| DELETE  | `/promotional_codes/{id}` | Supprimer un code          |
| GET     | `/promotional-code/{name}`          | Rechercher un code par nom |

## Statistiques

| Méthode | Endpoint                     | Description          |
| ------- | ---------------------------- | -------------------- |
| GET     | `/statistics/sales-per-day`  | Ventes par jour      |
| GET     | `/statistics/average-cart`   | Panier moyen         |
| GET     | `/statistics/category-sales` | Ventes par catégorie |

## Mot de passe

| Méthode | Endpoint           | Description                           |
| ------- | ------------------ | ------------------------------------- |
| POST    | `/password-forgot` | Demander un email de réinitialisation |
| POST    | `/password-reset`  | Réinitialiser le mot de passe         |

## Homepage

| Méthode | Endpoint               | Description               |
| ------- | ---------------------- | ------------------------- |
| GET     | `/homepage/{locale}`   | Page d’accueil par langue |
| GET     | `/homepages` | Liste des pages           |
| POST    | `/homepages` | Créer une page d’accueil  |

## Adresses

| Méthode | Endpoint                           | Description                      |
|--------|-------------------------------------|----------------------------------|
| GET    | `/addresses`              | Liste des adresses               |
| GET    | `/addresses/{id}`         | Détails d’une adresse            |
| POST   | `/addresses`              | Créer une adresse                |
| PUT    | `/addresses/{id}`         | Modifier une adresse             |
| DELETE | `/addresses/{id}`         | Supprimer une adresse            |

---

## Catégories

| Méthode | Endpoint                           | Description                      |
|--------|-------------------------------------|----------------------------------|
| GET    | `/categories`             | Liste des catégories             |
| GET    | `/categories/{id}`        | Détails d’une catégorie          |
| POST   | `/categories`             | Créer une catégorie              |
| PUT    | `/categories/{id}`        | Modifier une catégorie           |
| DELETE | `/categories/{id}`        | Supprimer une catégorie          |

---

## Contacts

| Méthode | Endpoint                           | Description                      |
|--------|-------------------------------------|----------------------------------|
| GET    | `/contacts`               | Liste des contacts               |
| GET    | `/contacts/{id}`          | Détails d’un contact             |
| POST   | `/contacts`               | Créer un contact                 |
| PUT    | `/contacts/{id}`          | Modifier un contact              |
| DELETE | `/contacts/{id}`          | Supprimer un contact             |

---

## Fichiers médias

| Méthode | Endpoint                           | Description                      |
|--------|-------------------------------------|----------------------------------|
| POST   | `/media_objects`          | Télécharger un fichier média     |
| GET    | `/media_objects/{id}`     | Détails d’un média               |

---

## Lignes de commande

| Méthode | Endpoint                           | Description                         |
|--------|-------------------------------------|-------------------------------------|
| GET    | `/order_lines`            | Liste des lignes de commande        |
| GET    | `/order_lines/{id}`       | Détails d’une ligne de commande     |
| POST   | `/order_lines`            | Créer une ligne de commande         |
| PUT    | `/order_lines/{id}`       | Modifier une ligne de commande      |
| DELETE | `/order_lines/{id}`       | Supprimer une ligne de commande     |

---

## Images produit

| Méthode | Endpoint                           | Description                      |
|--------|-------------------------------------|----------------------------------|
| GET    | `/product_images`         | Liste des images produit         |
| GET    | `/product_images/{id}`    | Détails d’une image              |
| POST   | `/product_images`         | Créer une image produit          |
| PUT    | `/product_images/{id}`    | Modifier une image               |
| DELETE | `/product_images/{id}`    | Supprimer une image              |

---

## Traductions de produit

| Méthode | Endpoint                                  | Description                           |
|--------|--------------------------------------------|---------------------------------------|
| GET    | `/product_translations`          | Liste des traductions produit         |
| GET    | `/product_translations/{id}`     | Détails d’une traduction              |
| POST   | `/product_translations`          | Créer une traduction                  |
| PUT    | `/product_translations/{id}`     | Modifier une traduction               |
| DELETE | `/product_translations/{id}`     | Supprimer une traduction              |
| GET     | `/product/{locale}/{id}`      | Récupérer une traduction d’un produit             |

---

## Abonnements

| Méthode | Endpoint                                | Description                      |
|--------|------------------------------------------|----------------------------------|
| GET    | `/subscriptions`               | Liste des abonnements            |
| GET    | `/subscriptions/{id}`          | Détails d’un abonnement          |
| POST   | `/subscriptions`               | Créer un abonnement              |
| PUT    | `/subscriptions/{id}`          | Modifier un abonnement           |
| DELETE | `/subscriptions/{id}`          | Supprimer un abonnement          |
| GET     | `/{locale}/subscriptions`     | Traductions des abonnements         |

---

## Caractéristiques d’abonnement

| Méthode | Endpoint                                              | Description                               |
|--------|--------------------------------------------------------|-------------------------------------------|
| GET    | `/subscription_caracteristics`               | Liste des caractéristiques                |
| GET    | `/subscription_caracteristics/{id}`          | Détails d’une caractéristique             |
| POST   | `/subscription_caracteristics`               | Créer une caractéristique                 |
| PUT    | `/subscription_caracteristics/{id}`          | Modifier une caractéristique              |
| DELETE | `/subscription_caracteristics/{id}`          | Supprimer une caractéristique             |

---

## Traductions de catégories

| Méthode | Endpoint                                       | Description                               |
|--------|-------------------------------------------------|-------------------------------------------|
| GET    | `/category_translations`              | Liste des traductions de catégories       |
| GET    | `/category_translations/{id}`         | Détails d’une traduction                  |
| POST   | `/category_translations`              | Créer une traduction                      |
| PUT    | `/category_translations/{id}`         | Modifier une traduction                   |
| DELETE | `/category_translations/{id}`         | Supprimer une traduction                  |
| GET     | `/category/{locale}/{id}`     | Traduction d’une catégorie          |
| GET     | `/{locale}/categories`        | Liste des traductions de catégories |
| GET     | `/{locale}/categories/filter` | Filtres de catégories localisés     |

---

## Logs d’activité

| Méthode | Endpoint                           | Description                        |
|--------|-------------------------------------|------------------------------------|
| GET    | `/log_activities`         | Liste des activités                |
| GET    | `/log_activities/{id}`    | Détails d’une activité             |

---

## Logs de champs

| Méthode | Endpoint                           | Description                        |
|--------|-------------------------------------|------------------------------------|
| GET    | `/log_fields`             | Liste des champs modifiés          |
| GET    | `/log_fields/{id}`        | Détails d’un champ modifié         |

# Créateurs

**Christmann Julian**

- <https://github.com/Christmann-Julian>

**Mohammad Bilal**

- <https://github.com/bilal27095>

**Mohamed ayoub BENAZZA**

- <https://github.com/Mayoub04>

# Copyright et licence

Code et documentation copyright 2024-2025. Le Code du projet est publié sous [Licence MIT ](https://fr.wikipedia.org/wiki/Licence_MIT).