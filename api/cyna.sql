-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : lun. 28 avr. 2025 à 15:03
-- Version du serveur : 8.0.35
-- Version de PHP : 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cyna`
--

-- --------------------------------------------------------

--
-- Structure de la table `address`
--

CREATE TABLE `address` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `county` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `id` int NOT NULL,
  `image_id` int DEFAULT NULL,
  `priority` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `image_id`, `priority`) VALUES
(1, 8, 1),
(2, 9, 2),
(3, 10, 3);

-- --------------------------------------------------------

--
-- Structure de la table `category_translation`
--

CREATE TABLE `category_translation` (
  `id` int NOT NULL,
  `category_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `locale_id` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `category_translation`
--

INSERT INTO `category_translation` (`id`, `category_id`, `name`, `description`, `locale_id`) VALUES
(1, 1, 'Prévention', 'La prévention vise à identifier et corriger les vulnérabilités avant qu’un attaquant ne puisse en tirer parti.', 'fr-FR'),
(2, 1, 'Prevention', 'Prevention aims to identify and correct vulnerabilities before an attacker can take advantage of them.', 'en-GB'),
(3, 1, 'وقاية', 'تهدف الوقاية إلى تحديد نقاط الضعف وتصحيحها قبل أن يتمكن المهاجم من الاستفادة منها.', 'ar-SA'),
(4, 2, 'Protection', 'La protection consiste à déployer des dispositifs et des services continus pour repousser les menaces et surveiller votre environnement en temps réel.', 'fr-FR'),
(5, 2, 'Protection', 'Protection involves deploying continuous devices and services to repel threats and monitor your environment in real time.', 'en-GB'),
(6, 2, 'حماية', 'تتضمن الحماية نشر أجهزة وخدمات مستمرة لصد التهديدات ومراقبة بيئتك في الوقت الفعلي.', 'ar-SA'),
(7, 3, 'Réponse', 'La réponse intervient lorsque l’incident est avéré : nous enquêtons, éradiquons la menace et remettons votre environnement en état de fonctionnement sécurisé.', 'fr-FR'),
(8, 3, 'Response', 'The response comes when the incident is confirmed: we investigate, eradicate the threat and restore your environment to a secure operating state.', 'en-GB'),
(9, 3, 'إجابة', 'يأتي الرد عندما يتم تأكيد الحادث: نقوم بالتحقيق والقضاء على التهديد واستعادة بيئتك إلى حالة تشغيل آمنة.', 'ar-SA');

-- --------------------------------------------------------

--
-- Structure de la table `confirm_email`
--

CREATE TABLE `confirm_email` (
  `id` int NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

CREATE TABLE `contact` (
  `id` int NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `send_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8mb3_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20241112154438', '2025-04-28 09:03:34', 18),
('DoctrineMigrations\\Version20241113110042', '2025-04-28 09:03:34', 5),
('DoctrineMigrations\\Version20241113110805', '2025-04-28 09:03:34', 20),
('DoctrineMigrations\\Version20241113140611', '2025-04-28 09:03:34', 72),
('DoctrineMigrations\\Version20241123140025', '2025-04-28 09:03:34', 54),
('DoctrineMigrations\\Version20241208153631', '2025-04-28 09:03:34', 6),
('DoctrineMigrations\\Version20241214102616', '2025-04-28 09:03:34', 4),
('DoctrineMigrations\\Version20241215134700', '2025-04-28 09:03:34', 15),
('DoctrineMigrations\\Version20250104151059', '2025-04-28 09:03:34', 10),
('DoctrineMigrations\\Version20250107080614', '2025-04-28 09:03:34', 5),
('DoctrineMigrations\\Version20250107130330', '2025-04-28 09:03:34', 21),
('DoctrineMigrations\\Version20250108165625', '2025-04-28 09:03:34', 8),
('DoctrineMigrations\\Version20250119124301', '2025-04-28 09:03:34', 92),
('DoctrineMigrations\\Version20250119130406', '2025-04-28 09:03:34', 36),
('DoctrineMigrations\\Version20250120172520', '2025-04-28 09:03:34', 4),
('DoctrineMigrations\\Version20250125143251', '2025-04-28 09:03:34', 16),
('DoctrineMigrations\\Version20250127182851', '2025-04-28 09:03:34', 25),
('DoctrineMigrations\\Version20250201140247', '2025-04-28 09:03:34', 13),
('DoctrineMigrations\\Version20250203143830', '2025-04-28 09:15:21', 19),
('DoctrineMigrations\\Version20250212171239', '2025-04-28 09:15:21', 23),
('DoctrineMigrations\\Version20250217164508', '2025-04-28 09:15:21', 32),
('DoctrineMigrations\\Version20250323150246', '2025-04-28 09:15:21', 79),
('DoctrineMigrations\\Version20250329123026', '2025-04-28 09:15:21', 5),
('DoctrineMigrations\\Version20250409081204', '2025-04-28 09:15:21', 36),
('DoctrineMigrations\\Version20250417174301', '2025-04-28 09:15:21', 5);

-- --------------------------------------------------------

--
-- Structure de la table `homepage`
--

CREATE TABLE `homepage` (
  `id` int NOT NULL,
  `text` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `locale` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `homepage`
--

INSERT INTO `homepage` (`id`, `text`, `locale`) VALUES
(4, 'Bénéficiez d’une expertise reconnue en cybersécurité, alliée à une réactivité immédiate et à un accompagnement de proximité pour garantir une protection optimale et durable de votre système d’information.\nChez Cyna, nous vous aidons à anticiper, détecter et neutraliser les menaces grâce à des solutions sur mesure adaptées à vos enjeux métiers.\nNotre approche intègre le diagnostic, le test d’intrusion, la surveillance en temps réel (SOC, XDR) ainsi que l’investigation et la réponse aux incidents pour assurer la continuité de vos activités.\nAvec Cyna, vous bénéficiez d’une sécurité proactive et d’une équipe d’experts mobilisée à chaque étape pour renforcer la résilience de votre entreprise face aux cybermenaces.', 'fr-FR'),
(5, 'Benefit from recognized cybersecurity expertise, immediate responsiveness, and close support to ensure optimal and lasting protection of your information system.\nAt Cyna, we help you anticipate, detect, and neutralize threats with tailor-made solutions adapted to your business challenges.\nOur approach includes diagnostics, penetration testing, real-time monitoring (SOC, XDR), as well as investigation and incident response to ensure the continuity of your operations.\nWith Cyna, you benefit from proactive security and a team of experts committed at every step to strengthening your company\'s resilience against cyber threats.', 'en-GB'),
(6, 'استفد من خبرة معترف بها في مجال الأمن السيبراني، واستجابة فورية، ودعم قريب لضمان حماية مثلى ودائمة لنظام المعلومات الخاص بك.\nفي Cyna، نساعدك على التنبؤ بالتهديدات واكتشافها وتحليلها والقضاء عليها من خلال حلول مخصصة تتناسب مع تحديات عملك.\nتشمل منهجيتنا التشخيص، واختبار الاختراق، والمراقبة الفورية (SOC، XDR)، بالإضافة إلى التحقيق والاستجابة للحوادث لضمان استمرارية عملياتك.\nمع Cyna، تستفيد من حماية استباقية وفريق خبراء ملتزم بمرافقتك في كل مرحلة لتعزيز مرونة شركتك ضد التهديدات السيبرانية.', 'ar-SA');

-- --------------------------------------------------------

--
-- Structure de la table `locale_cyna`
--

CREATE TABLE `locale_cyna` (
  `code` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `locale_cyna`
--

INSERT INTO `locale_cyna` (`code`) VALUES
('ar-SA'),
('en-GB'),
('fr-FR');

-- --------------------------------------------------------

--
-- Structure de la table `log_activity`
--

CREATE TABLE `log_activity` (
  `id` int NOT NULL,
  `user` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `log_activity`
--

INSERT INTO `log_activity` (`id`, `user`, `action`, `entity_type`, `entity_id`, `created_at`) VALUES
(1, 'anonymous', 'login-2fa', 'User', 1, '2025-04-28 09:16:51'),
(2, 'anonymous', 'login-2fa', 'User', 1, '2025-04-28 09:17:57'),
(3, 'admin@admin.fr', 'create', 'MediaObject', 1, '2025-04-28 09:57:56'),
(4, 'admin@admin.fr', 'create', 'Homepage', 1, '2025-04-28 09:59:21'),
(5, 'admin@admin.fr', 'delete', 'MediaObject', 1, '2025-04-28 10:02:14'),
(6, 'admin@admin.fr', 'delete', 'MediaObject', 1, '2025-04-28 10:02:22'),
(7, 'admin@admin.fr', 'create', 'MediaObject', 2, '2025-04-28 10:02:54'),
(8, 'admin@admin.fr', 'delete', 'MediaObject', 1, '2025-04-28 10:03:08'),
(9, 'admin@admin.fr', 'delete', 'Homepage', 1, '2025-04-28 10:03:28'),
(10, 'admin@admin.fr', 'create', 'Homepage', 2, '2025-04-28 10:03:57'),
(11, 'admin@admin.fr', 'delete', 'MediaObject', 1, '2025-04-28 10:05:53'),
(12, 'admin@admin.fr', 'create', 'MediaObject', 3, '2025-04-28 10:07:09'),
(13, 'admin@admin.fr', 'create', 'Homepage', 3, '2025-04-28 10:07:31'),
(14, 'admin@admin.fr', 'delete', 'Homepage', 3, '2025-04-28 10:08:07'),
(15, 'admin@admin.fr', 'delete', 'Homepage', 2, '2025-04-28 10:10:40'),
(16, 'admin@admin.fr', 'delete', 'MediaObject', 3, '2025-04-28 10:10:49'),
(17, 'admin@admin.fr', 'delete', 'MediaObject', 2, '2025-04-28 10:10:49'),
(18, 'admin@admin.fr', 'create', 'MediaObject', 4, '2025-04-28 10:10:55'),
(19, 'admin@admin.fr', 'create', 'MediaObject', 5, '2025-04-28 10:12:33'),
(20, 'admin@admin.fr', 'create', 'Homepage', 4, '2025-04-28 10:16:44'),
(21, 'admin@admin.fr', 'create', 'MediaObject', 6, '2025-04-28 10:19:03'),
(22, 'admin@admin.fr', 'delete', 'MediaObject', 6, '2025-04-28 10:29:22'),
(23, 'admin@admin.fr', 'delete', 'MediaObject', 6, '2025-04-28 10:29:45'),
(24, 'admin@admin.fr', 'create', 'MediaObject', 7, '2025-04-28 10:29:50'),
(25, 'admin@admin.fr', 'update', 'Homepage', 4, '2025-04-28 10:32:45'),
(26, 'admin@admin.fr', 'create', 'Homepage', 5, '2025-04-28 10:34:31'),
(27, 'admin@admin.fr', 'create', 'Homepage', 6, '2025-04-28 10:37:26'),
(28, 'anonymous', 'login-2fa', 'User', 1, '2025-04-28 11:39:20'),
(29, 'anonymous', 'login-2fa', 'User', 1, '2025-04-28 11:39:49'),
(30, 'anonymous', 'login-2fa', 'User', 1, '2025-04-28 12:55:11'),
(31, 'anonymous', 'login-2fa', 'User', 1, '2025-04-28 12:55:32'),
(32, 'admin@admin.fr', 'create', 'MediaObject', 8, '2025-04-28 13:00:25'),
(33, 'admin@admin.fr', 'create', 'MediaObject', 9, '2025-04-28 13:01:10'),
(34, 'admin@admin.fr', 'create', 'MediaObject', 10, '2025-04-28 13:01:20'),
(35, 'admin@admin.fr', 'create', 'MediaObject', 11, '2025-04-28 13:01:58'),
(36, 'admin@admin.fr', 'create', 'MediaObject', 12, '2025-04-28 13:02:08'),
(37, 'admin@admin.fr', 'create', 'MediaObject', 13, '2025-04-28 13:02:16'),
(38, 'admin@admin.fr', 'create', 'MediaObject', 14, '2025-04-28 13:02:33'),
(39, 'admin@admin.fr', 'delete', 'MediaObject', 14, '2025-04-28 13:02:44'),
(40, 'admin@admin.fr', 'create', 'MediaObject', 15, '2025-04-28 13:02:48'),
(41, 'admin@admin.fr', 'create', 'MediaObject', 16, '2025-04-28 13:03:02'),
(42, 'admin@admin.fr', 'create', 'MediaObject', 17, '2025-04-28 13:03:24'),
(43, 'admin@admin.fr', 'delete', 'MediaObject', 17, '2025-04-28 13:03:43'),
(44, 'admin@admin.fr', 'create', 'MediaObject', 18, '2025-04-28 13:04:01'),
(45, 'admin@admin.fr', 'create', 'MediaObject', 19, '2025-04-28 13:04:09'),
(46, 'admin@admin.fr', 'create', 'MediaObject', 20, '2025-04-28 13:07:05'),
(47, 'admin@admin.fr', 'create', 'MediaObject', 21, '2025-04-28 13:07:19'),
(48, 'admin@admin.fr', 'create', 'MediaObject', 22, '2025-04-28 13:07:26'),
(49, 'admin@admin.fr', 'delete', 'MediaObject', 18, '2025-04-28 13:12:01'),
(50, 'admin@admin.fr', 'delete', 'MediaObject', 19, '2025-04-28 13:12:02'),
(51, 'admin@admin.fr', 'create', 'MediaObject', 23, '2025-04-28 13:12:07'),
(52, 'admin@admin.fr', 'create', 'MediaObject', 24, '2025-04-28 13:12:16'),
(53, 'admin@admin.fr', 'delete', 'MediaObject', 16, '2025-04-28 13:13:08'),
(54, 'admin@admin.fr', 'create', 'MediaObject', 25, '2025-04-28 13:13:12'),
(55, 'admin@admin.fr', 'delete', 'MediaObject', 13, '2025-04-28 13:16:19'),
(56, 'admin@admin.fr', 'create', 'MediaObject', 26, '2025-04-28 13:16:26'),
(57, 'admin@admin.fr', 'delete', 'MediaObject', 25, '2025-04-28 13:19:09'),
(58, 'admin@admin.fr', 'create', 'MediaObject', 27, '2025-04-28 13:19:13'),
(59, 'admin@admin.fr', 'delete', 'MediaObject', 27, '2025-04-28 13:19:21'),
(60, 'admin@admin.fr', 'create', 'MediaObject', 28, '2025-04-28 13:19:38'),
(61, 'admin@admin.fr', 'delete', 'MediaObject', 28, '2025-04-28 13:20:18'),
(62, 'admin@admin.fr', 'create', 'MediaObject', 29, '2025-04-28 13:20:22'),
(63, 'admin@admin.fr', 'delete', 'MediaObject', 29, '2025-04-28 13:20:56'),
(64, 'admin@admin.fr', 'create', 'MediaObject', 30, '2025-04-28 13:21:52'),
(65, 'admin@admin.fr', 'delete', 'MediaObject', 15, '2025-04-28 13:28:49'),
(66, 'admin@admin.fr', 'create', 'MediaObject', 31, '2025-04-28 13:28:59'),
(67, 'admin@admin.fr', 'create', 'Category', 1, '2025-04-28 13:30:42'),
(68, 'admin@admin.fr', 'create', 'CategoryTranslation-fr-FR', 1, '2025-04-28 13:34:19'),
(69, 'admin@admin.fr', 'create', 'CategoryTranslation-en-GB', 2, '2025-04-28 13:35:51'),
(70, 'admin@admin.fr', 'create', 'CategoryTranslation-ar-SA', 3, '2025-04-28 13:35:51'),
(71, 'admin@admin.fr', 'create', 'Category', 2, '2025-04-28 13:37:19'),
(72, 'admin@admin.fr', 'create', 'CategoryTranslation-fr-FR', 4, '2025-04-28 13:37:19'),
(73, 'admin@admin.fr', 'create', 'CategoryTranslation-en-GB', 5, '2025-04-28 13:37:19'),
(74, 'admin@admin.fr', 'create', 'CategoryTranslation-ar-SA', 6, '2025-04-28 13:37:19'),
(75, 'admin@admin.fr', 'create', 'Category', 3, '2025-04-28 13:41:37'),
(76, 'admin@admin.fr', 'create', 'CategoryTranslation-fr-FR', 7, '2025-04-28 13:41:37'),
(77, 'admin@admin.fr', 'create', 'CategoryTranslation-en-GB', 8, '2025-04-28 13:41:37'),
(78, 'admin@admin.fr', 'create', 'CategoryTranslation-ar-SA', 9, '2025-04-28 13:41:37'),
(79, 'admin@admin.fr', 'create', 'MediaObject', 32, '2025-04-28 13:50:06'),
(80, 'admin@admin.fr', 'create', 'Product', 1, '2025-04-28 14:01:58'),
(81, 'admin@admin.fr', 'create', 'ProductTranslation-fr-FR', 1, '2025-04-28 14:01:58'),
(82, 'admin@admin.fr', 'create', 'ProductTranslation-en-GB', 2, '2025-04-28 14:01:58'),
(83, 'admin@admin.fr', 'create', 'ProductTranslation-ar-SA', 3, '2025-04-28 14:01:58'),
(84, 'admin@admin.fr', 'create', 'Product', 2, '2025-04-28 14:06:57'),
(85, 'admin@admin.fr', 'create', 'ProductTranslation-fr-FR', 4, '2025-04-28 14:06:57'),
(86, 'admin@admin.fr', 'create', 'ProductTranslation-en-GB', 5, '2025-04-28 14:06:57'),
(87, 'admin@admin.fr', 'create', 'ProductTranslation-ar-SA', 6, '2025-04-28 14:06:57'),
(88, 'admin@admin.fr', 'create', 'Product', 3, '2025-04-28 14:11:19'),
(89, 'admin@admin.fr', 'create', 'ProductTranslation-fr-FR', 7, '2025-04-28 14:11:19'),
(90, 'admin@admin.fr', 'create', 'ProductTranslation-en-GB', 8, '2025-04-28 14:11:19'),
(91, 'admin@admin.fr', 'create', 'ProductTranslation-ar-SA', 9, '2025-04-28 14:11:19'),
(92, 'admin@admin.fr', 'create', 'Product', 4, '2025-04-28 14:16:00'),
(93, 'admin@admin.fr', 'create', 'ProductTranslation-fr-FR', 10, '2025-04-28 14:16:00'),
(94, 'admin@admin.fr', 'create', 'ProductTranslation-en-GB', 11, '2025-04-28 14:16:00'),
(95, 'admin@admin.fr', 'create', 'ProductTranslation-ar-SA', 12, '2025-04-28 14:16:00'),
(96, 'admin@admin.fr', 'create', 'Product', 5, '2025-04-28 14:29:51'),
(97, 'admin@admin.fr', 'create', 'ProductTranslation-fr-FR', 13, '2025-04-28 14:29:51'),
(98, 'admin@admin.fr', 'create', 'ProductTranslation-en-GB', 14, '2025-04-28 14:29:51'),
(99, 'admin@admin.fr', 'create', 'ProductTranslation-ar-SA', 15, '2025-04-28 14:29:51'),
(100, 'admin@admin.fr', 'create', 'Product', 6, '2025-04-28 14:32:19'),
(101, 'admin@admin.fr', 'create', 'ProductTranslation-fr-FR', 16, '2025-04-28 14:32:19'),
(102, 'admin@admin.fr', 'create', 'ProductTranslation-en-GB', 17, '2025-04-28 14:32:19'),
(103, 'admin@admin.fr', 'create', 'ProductTranslation-ar-SA', 18, '2025-04-28 14:32:19'),
(104, 'admin@admin.fr', 'create', 'Product', 7, '2025-04-28 14:35:39'),
(105, 'admin@admin.fr', 'create', 'ProductTranslation-fr-FR', 19, '2025-04-28 14:35:39'),
(106, 'admin@admin.fr', 'create', 'ProductTranslation-en-GB', 20, '2025-04-28 14:35:39'),
(107, 'admin@admin.fr', 'create', 'ProductTranslation-ar-SA', 21, '2025-04-28 14:35:39'),
(108, 'admin@admin.fr', 'create', 'Product', 8, '2025-04-28 14:38:40'),
(109, 'admin@admin.fr', 'create', 'ProductTranslation-fr-FR', 22, '2025-04-28 14:38:40'),
(110, 'admin@admin.fr', 'create', 'ProductTranslation-en-GB', 23, '2025-04-28 14:38:40'),
(111, 'admin@admin.fr', 'create', 'ProductTranslation-ar-SA', 24, '2025-04-28 14:38:40'),
(112, 'admin@admin.fr', 'create', 'Product', 9, '2025-04-28 14:42:24'),
(113, 'admin@admin.fr', 'create', 'ProductTranslation-fr-FR', 25, '2025-04-28 14:46:01'),
(114, 'admin@admin.fr', 'create', 'ProductTranslation-en-GB', 26, '2025-04-28 14:46:01'),
(115, 'admin@admin.fr', 'create', 'ProductTranslation-ar-SA', 27, '2025-04-28 14:46:01'),
(116, 'admin@admin.fr', 'create', 'Product', 10, '2025-04-28 14:49:56'),
(117, 'admin@admin.fr', 'create', 'ProductTranslation-fr-FR', 28, '2025-04-28 14:49:56'),
(118, 'admin@admin.fr', 'create', 'ProductTranslation-en-GB', 29, '2025-04-28 14:49:56'),
(119, 'admin@admin.fr', 'create', 'ProductTranslation-ar-SA', 30, '2025-04-28 14:49:56'),
(120, 'admin@admin.fr', 'update', 'Product', 9, '2025-04-28 14:51:46'),
(121, 'admin@admin.fr', 'update', 'Product', 2, '2025-04-28 14:53:17'),
(122, 'admin@admin.fr', 'update', 'Product', 2, '2025-04-28 14:53:39'),
(123, 'admin@admin.fr', 'update', 'Product', 2, '2025-04-28 14:58:38'),
(124, 'admin@admin.fr', 'update', 'Product', 6, '2025-04-28 14:59:07'),
(125, 'admin@admin.fr', 'update', 'Product', 7, '2025-04-28 14:59:50'),
(126, 'admin@admin.fr', 'update', 'Product', 6, '2025-04-28 15:00:44'),
(127, 'admin@admin.fr', 'update', 'Product', 4, '2025-04-28 15:01:56');

-- --------------------------------------------------------

--
-- Structure de la table `log_field`
--

CREATE TABLE `log_field` (
  `id` int NOT NULL,
  `log_activity_id` int DEFAULT NULL,
  `field` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `log_field`
--

INSERT INTO `log_field` (`id`, `log_activity_id`, `field`) VALUES
(1, 1, 'twoFaCode'),
(2, 1, 'twoFaExpiresAt'),
(3, 2, 'twoFaCode'),
(4, 2, 'twoFaExpiresAt'),
(5, 25, 'text'),
(6, 28, 'twoFaCode'),
(7, 28, 'twoFaExpiresAt'),
(8, 29, 'twoFaCode'),
(9, 29, 'twoFaExpiresAt'),
(10, 30, 'twoFaCode'),
(11, 30, 'twoFaExpiresAt'),
(12, 31, 'twoFaCode'),
(13, 31, 'twoFaExpiresAt'),
(14, 120, 'priority'),
(15, 120, 'top_product'),
(16, 121, 'position'),
(17, 122, 'position'),
(18, 123, 'promotionActive'),
(19, 123, 'promotionLabel'),
(20, 123, 'promotionPrice'),
(21, 124, 'promotionActive'),
(22, 124, 'promotionLabel'),
(23, 124, 'promotionPrice'),
(24, 125, 'disponibility'),
(25, 125, 'promotionActive'),
(26, 125, 'promotionLabel'),
(27, 125, 'promotionPrice'),
(28, 126, 'promotionLabel'),
(29, 127, 'disponibility'),
(30, 127, 'promotionActive'),
(31, 127, 'promotionLabel'),
(32, 127, 'promotionPrice');

-- --------------------------------------------------------

--
-- Structure de la table `media_object`
--

CREATE TABLE `media_object` (
  `id` int NOT NULL,
  `file_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `media_object`
--

INSERT INTO `media_object` (`id`, `file_path`, `updated_at`) VALUES
(4, 'homepage1-680f542f724f3145010968.jpg', '2025-04-28 10:10:55'),
(5, 'homepage2-680f54914d019333064088.jpg', '2025-04-28 10:12:33'),
(7, 'homepage3-680f589e06706317223470.jpg', '2025-04-28 10:29:50'),
(8, 'categorie1-680f7be9ecca7779861015.jpg', '2025-04-28 13:00:25'),
(9, 'categorie2-680f7c166c14b531277402.jpg', '2025-04-28 13:01:10'),
(10, 'categorie3-680f7c2079232216318963.jpg', '2025-04-28 13:01:20'),
(11, 'diagnosticcyber-680f7c4616dc0210900155.jpg', '2025-04-28 13:01:58'),
(12, 'testintrusion-680f7c50cca7f198006642.jpg', '2025-04-28 13:02:08'),
(20, 'microsocpro-680f7d79269ab874613478.jpg', '2025-04-28 13:07:05'),
(21, 'socmanagepro-680f7d87c0fb6757289191.jpg', '2025-04-28 13:07:19'),
(22, 'investionpro-680f7d8e8d6b9980203729.jpg', '2025-04-28 13:07:26'),
(23, 'diagnosticcyberpro-680f7ea768cb5749583404.jpg', '2025-04-28 13:12:07'),
(24, 'testintrusionpro-680f7eb0b913a370235828.png', '2025-04-28 13:12:16'),
(26, 'microsoc-680f7faa4a715572131737.png', '2025-04-28 13:16:26'),
(30, 'investigation-680f80f0e50f6210903066.png', '2025-04-28 13:21:52'),
(31, 'socmanage-680f829be82f9192651889.png', '2025-04-28 13:28:59'),
(32, 'dashboard-680f878e4115e099652151.jpg', '2025-04-28 13:50:06');

-- --------------------------------------------------------

--
-- Structure de la table `order`
--

CREATE TABLE `order` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `reference` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` double NOT NULL,
  `promotion` double DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_method_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `order_line`
--

CREATE TABLE `order_line` (
  `id` int NOT NULL,
  `order_ref_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `price` double NOT NULL,
  `promotion_price` double DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `password_reset`
--

CREATE TABLE `password_reset` (
  `id` int NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reset_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `payment_method`
--

CREATE TABLE `payment_method` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `stripe_payment_method_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last4` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiry_month` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiry_year` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

CREATE TABLE `product` (
  `id` int NOT NULL,
  `position` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `price` double NOT NULL,
  `priority` int DEFAULT NULL,
  `disponibility` tinyint(1) NOT NULL,
  `top_product` tinyint(1) NOT NULL,
  `image_id` int DEFAULT NULL,
  `promotion_active` tinyint(1) NOT NULL,
  `promotion_label` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `promotion_price` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id`, `position`, `category_id`, `price`, `priority`, `disponibility`, `top_product`, `image_id`, `promotion_active`, `promotion_label`, `promotion_price`) VALUES
(1, 1, 1, 4500, 1, 1, 1, 11, 0, NULL, NULL),
(2, 0, 1, 4000, NULL, 1, 0, 12, 1, '20%', 3200),
(3, 0, 1, 6000, 3, 1, 0, 23, 0, NULL, NULL),
(4, 2, 1, 5500, 4, 0, 1, 24, 1, '-50%', 2250),
(5, 0, 2, 5000, NULL, 1, 1, 26, 0, NULL, NULL),
(6, 0, 2, 7000, 5, 1, 1, 20, 1, 'PROMO - 1000€', 5997),
(7, 0, 2, 7000, NULL, 0, 0, 31, 1, '-50%', 3500),
(8, 0, 2, 8990, 7, 1, 0, 21, 0, NULL, NULL),
(9, 0, 3, 8500, 7, 1, 0, 30, 0, NULL, NULL),
(10, 0, 3, 10000, NULL, 0, 0, 22, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `product_image`
--

CREATE TABLE `product_image` (
  `id` int NOT NULL,
  `image_id` int NOT NULL,
  `product_id` int NOT NULL,
  `alt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `product_image`
--

INSERT INTO `product_image` (`id`, `image_id`, `product_id`, `alt`) VALUES
(1, 11, 1, 'Diagnostic Cyber Image'),
(2, 12, 2, 'Test Intrusion'),
(3, 23, 3, 'Diagnostic Cyber Pro Image'),
(4, 24, 4, 'Test Intrusion Pro Image '),
(5, 26, 5, 'Micro SOC Image'),
(6, 20, 6, 'Micro SOC Pro Image'),
(7, 31, 7, 'SOC Manage Image '),
(8, 21, 8, 'SOC Manage Pro Image'),
(9, 30, 9, 'Reponse Image '),
(10, 32, 1, 'Dashboard Image'),
(11, 32, 2, 'Dashboard Image'),
(12, 32, 3, 'Dashboard Image'),
(13, 32, 4, 'Dashboard Image'),
(14, 32, 5, 'Dashboard Image'),
(15, 32, 6, 'Dashboard Image'),
(16, 32, 7, 'Dashboard Image'),
(17, 32, 8, 'Dashboard Image'),
(18, 32, 9, 'Dashboard Image'),
(19, 22, 10, 'Test Intrusion Pro Image '),
(20, 32, 10, 'Dashboard Image');

-- --------------------------------------------------------

--
-- Structure de la table `product_translation`
--

CREATE TABLE `product_translation` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caracteristic` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `locale_id` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `product_translation`
--

INSERT INTO `product_translation` (`id`, `product_id`, `name`, `caracteristic`, `locale_id`, `description`) VALUES
(1, 1, 'Diagnostic Cyber', '<ul><li><p><span style=\"color: rgb(33, 33, 33)\">Audit architecture &amp; configAudit architecture &amp; config</span></p></li><li><p><span style=\"color: rgb(0, 0, 0)\">Tests d’intrusion manuel</span></p></li><li><p><span style=\"color: rgb(0, 0, 0)\">Rapport priorisé &amp; plan d’action</span></p></li></ul>', 'fr-FR', 'Le Diagnostic Cyber Standard propose un audit initial de votre infrastructure et de vos processus de sécurité. Nos outils automatisés scannent vos réseaux, applications et configurations pour repérer les vulnérabilités courantes. Vous recevez un rapport clair avec les points faibles prioritaires et des recommandations générales. Idéal pour poser une première base de protection.'),
(2, 1, 'Diagnostic Cyber', '<ul><li><p>Architecture &amp; config auditArchitecture &amp; config audit</p></li><li><p>Manual penetration testing</p></li><li><p>Prioritized report &amp; action plan</p></li></ul>', 'en-GB', 'The Standard Cyber ​​Diagnostic provides an initial audit of your security infrastructure and processes. Our automated tools scan your networks, applications, and configurations to identify common vulnerabilities. You\'ll receive a clear report with prioritized weaknesses and general recommendations. This is ideal for laying a foundation for protection.'),
(3, 1, 'التشخيص السيبراني', '<ul><li><p>تكوين الهندسة المعمارية والتدقيقتكوين الهندسة المعمارية والتدقيق</p></li><li><p>اختبار الاختراق اليدوي</p></li><li><p>تقرير وخطة عمل ذات أولوية</p></li></ul>', 'ar-SA', 'يوفر التشخيص السيبراني القياسي تدقيقًا أوليًا للبنية التحتية الأمنية والعمليات الخاصة بك. تقوم أدواتنا الآلية بفحص شبكاتك وتطبيقاتك وتكويناتك لتحديد نقاط الضعف الشائعة. سوف تتلقى تقريرًا واضحًا يتضمن نقاط الضعف ذات الأولوية والتوصيات العامة. وهذا مثالي لوضع الأساس للحماية.'),
(4, 2, 'Test Intrusion', '<ul><li><p><span style=\"color: rgb(0, 0, 0)\">Audit architecture &amp; config</span></p></li><li><p><span style=\"color: rgb(0, 0, 0)\">Tests d’intrusion manuel</span></p></li><li><p><span style=\"color: rgb(0, 0, 0)\">Rapport priorisé &amp; plan d’action</span></p></li></ul>', 'fr-FR', 'Le Test d’intrusion Standard englobe des attaques simulées basées sur des scénarios courants et des outils semi-automatiques. Nos pentesteurs explorent les failles accessibles pour évaluer le niveau de risque et la surface d’attaque. Un rapport synthétique présente les vulnérabilités exploitées, leur criticité et des conseils de remédiation. C’est un bon moyen de vérifier l’efficacité de vos défenses de base.'),
(5, 2, 'Intrusion Test', '<ul><li><p>Architecture &amp; config audit</p></li><li><p>Manual penetration testing</p></li><li><p>Prioritized report &amp; action plan</p></li></ul>', 'en-GB', 'The Standard Penetration Test includes simulated attacks based on common scenarios and semi-automated tools. Our pentesters explore accessible vulnerabilities to assess the risk level and attack surface. A summary report presents the exploited vulnerabilities, their criticality, and remediation recommendations. This is a good way to verify the effectiveness of your basic defenses.'),
(6, 2, 'اختبار التطفل', '<ul><li><p>تدقيق البنية والتكوين</p></li><li><p>اختبار الاختراق اليدوي</p></li><li><p>تقرير وخطة عمل مُحددة الأولويات</p></li></ul>', 'ar-SA', 'يتضمن اختبار الاختراق القياسي محاكاة هجمات مبنية على سيناريوهات شائعة وأدوات شبه آلية. يستكشف مختبرو الاختراق لدينا الثغرات الأمنية المتاحة لتقييم مستوى الخطر ومساحة الهجوم. يعرض تقرير موجز الثغرات المستغلة وخطورتها وتوصيات معالجتها. تُعد هذه طريقة جيدة للتحقق من فعالية دفاعاتك الأساسية.'),
(7, 3, 'Diagnostic Cyber Pro', '<ul><li><p><span style=\"color: rgb(0, 0, 0)\">Audit architecture &amp; config</span></p></li><li><p><span style=\"color: rgb(0, 0, 0)\">Tests d’intrusion manuel</span></p></li><li><p><span style=\"color: rgb(0, 0, 0)\">Rapport priorisé &amp; plan d’action</span></p></li><li><p><span style=\"color: rgb(0, 0, 0)\">Recommandations opérationnelles</span></p></li><li><p><span style=\"color: rgb(0, 0, 0)\">Validation post-corrections</span></p></li><li><p><span style=\"color: rgb(0, 0, 0)\">Atelier de restitution client</span></p></li></ul>', 'fr-FR', 'La version Pro va plus loin en associant l’audit automatisé à une revue manuelle par un expert senior. Nous réalisons des ateliers dédiés pour expliquer en détail chaque risque et co-construire des plans d’action adaptés à votre contexte. Un suivi post-implémentation (retest) et une session Q&A sont inclus pour valider la mise en œuvre des correctifs. Vous bénéficiez ainsi d’une prise en charge complète et personnalisée.'),
(8, 3, 'Diagnostic Cyber Pro', '<ul><li><p>Architecture &amp; Configuration Audit</p></li><li><p>Manual Penetration Testing</p></li><li><p>Prioritized Report &amp; Action Plan</p></li><li><p>Operational Recommendations</p></li><li><p>Post-Correction Validation</p></li><li><p>Customer Feedback Workshop</p></li></ul>', 'en-GB', 'The Pro version goes further by combining automated auditing with a manual review by a senior expert. We conduct dedicated workshops to explain each risk in detail and co-develop action plans tailored to your context. Post-implementation follow-up (retest) and a Q&A session are included to validate the implementation of fixes. This gives you comprehensive, personalized support.'),
(9, 3, 'تشخيص سايبر برو', '<ul><li><p>تدقيق البنية والتكوين</p></li><li><p>اختبار الاختراق اليدوي</p></li><li><p>تقرير وخطة عمل مُحددة الأولويات</p></li><li><p>توصيات تشغيلية</p></li><li><p>التحقق بعد التصحيح</p></li><li><p>ورشة عمل لملاحظات العملاء</p></li></ul>', 'ar-SA', 'يتخطى الإصدار الاحترافي حدود التدقيق الآلي من خلال الجمع بين التدقيق الآلي والمراجعة اليدوية التي يجريها خبير متخصص. نُجري ورش عمل متخصصة لشرح كل خطر بالتفصيل، ونشارك في وضع خطط عمل مُصممة خصيصًا لسياقك. يتضمن البرنامج متابعة ما بعد التنفيذ (إعادة اختبار) وجلسة أسئلة وأجوبة للتحقق من صحة تطبيق الحلول. هذا يمنحك دعمًا شاملًا ومُخصصًا.'),
(10, 4, 'Test Intrusion Pro', '<ul><li><p>Audit architecture &amp; config</p></li><li><p>Tests d’intrusion manuel</p></li><li><p>Rapport priorisé &amp; plan d’action</p></li><li><p>Recommandations opérationnelles</p></li><li><p>Validation post-corrections</p></li><li><p>Atelier de restitution client</p></li></ul>', 'fr-FR', 'Le Test d’intrusion Pro inclut des phases approfondies de reconnaissance, d’exploitation manuelle et de contournement de dispositifs avancés. Nos experts réalisent des exploits sur mesure et testent les réactions de vos équipes en conditions réalistes. Le livrable détaille les scénarios d’attaque, les preuves d’exploitation et un plan d’actions opérationnel pour chaque faille. Un débriefing interactif et un workshop de renforcement complètent l’offre.'),
(11, 4, 'Test Intrusion Pro', '<ul><li><p>Architecture &amp; Configuration Audit</p></li><li><p>Manual Penetration Testing</p></li><li><p>Prioritized Report &amp; Action Plan</p></li><li><p>Operational Recommendations</p></li><li><p>Post-Correction Validation</p></li><li><p>Customer Feedback Workshop</p></li></ul>', 'en-GB', 'The Pro Penetration Test includes in-depth reconnaissance, manual exploitation, and advanced device bypass phases. Our experts perform customized exploits and test your teams\' reactions under realistic conditions. The deliverable details attack scenarios, evidence of exploitation, and an operational action plan for each vulnerability. An interactive debriefing and a reinforcement workshop complete the offering.'),
(12, 4, 'اختبار التطفل المحترف', '<ul><li><p>تدقيق البنية والتكوين</p></li><li><p>اختبار الاختراق اليدو</p></li><li><p>تقرير وخطة عمل مُحددة الأولويات</p></li><li><p>توصيات تشغيلية</p></li><li><p>التحقق بعد التصحيح</p></li><li><p>ورشة عمل لملاحظات العملاء</p></li></ul>', 'ar-SA', 'يتضمن اختبار الاختراق الاحترافي استطلاعًا متعمقًا، واستغلالًا يدويًا، ومراحل متقدمة لتجاوز الأجهزة. يُجري خبراؤنا عمليات استغلال مُخصصة، ويختبرون ردود فعل فرقكم في ظل ظروف واقعية. تُفصّل النتائج سيناريوهات الهجوم، وأدلة الاستغلال، وخطة عمل تشغيلية لكل ثغرة. ويُكمل العرض جلسة استماع تفاعلية وورشة عمل تعزيزية.'),
(13, 5, 'Micro SOC ', '<ul><li><p>Collecte et corrélation basique des logs</p></li><li><p>Tableau de bord centralisé</p></li><li><p>Rapports hebdomadaires</p></li></ul>', 'fr-FR', 'Le Micro SOC Standard déploie une solution locale compacte pour collecter et corréler automatiquement vos journaux (firewalls, serveurs, endpoints). Vous accédez à un tableau de bord centralisé pour visualiser vos alertes critiques en temps réel. Des rapports hebdomadaires synthétisent les événements majeurs et proposent des recommandations de sécurité. Idéal pour les petites structures souhaitant une visibilité accrue.'),
(14, 5, 'Micro SOC ', '<ul><li><p>Basic log collection and correlation</p></li><li><p>Centralized dashboard</p></li><li><p>Weekly reports</p></li></ul>', 'en-GB', 'The Micro SOC Standard deploys a compact, on-premises solution to automatically collect and correlate your logs (firewalls, servers, endpoints). You access a centralized dashboard to view your critical alerts in real time. Weekly reports summarize major events and offer security recommendations. Ideal for smaller organizations looking for increased visibility.'),
(15, 5, 'مايكرو SOC', '<ul><li><p>جمع السجلات الأساسية وربطها</p></li><li><p>لوحة معلومات مركزية</p></li><li><p>تقارير أسبوعية</p></li></ul>', 'ar-SA', 'يُطبّق معيار Micro SOC حلاً مدمجاً محلياً لجمع سجلاتك (جدران الحماية، الخوادم، نقاط النهاية) وربطها تلقائياً. يمكنك الوصول إلى لوحة معلومات مركزية لعرض تنبيهاتك المهمة في الوقت الفعلي. تُلخّص التقارير الأسبوعية الأحداث الرئيسية وتُقدّم توصيات أمنية. مثالي للمؤسسات الصغيرة التي تبحث عن رؤية أوضح.'),
(16, 6, 'Micro SOC Pro', '<ul><li><p>Règles de corrélation avancées</p></li><li><p>Intégration de threat intelligence</p></li><li><p>Tuning d’alertes personnalisé</p></li><li><p>Reporting réglementaire automatisé</p></li><li><p>Support 24/7 avec SLA</p></li></ul>', 'fr-FR', 'La version Pro s’appuie sur le socle Standard en y ajoutant des règles de corrélation avancées et l’intégration de flux de threat intelligence externes. Vous bénéficiez d’un tuning personnalisé des alertes, d’un reporting réglementaire automatisé (RGPD, ISO 27001) et d’un support 24/7 avec SLA garanti. Un atelier de parametrage initial et un audit post-déploiement sont inclus pour optimiser vos défenses.'),
(17, 6, 'Micro SOC Pro', '<ul><li><p>Advanced correlation rules</p></li><li><p>Threat intelligence integration</p></li><li><p>Custom alert tuning</p></li><li><p>Automated regulatory reporting</p></li><li><p>24/7 support with SLA</p></li></ul>', 'en-GB', 'The Pro version builds on the Standard foundation by adding advanced correlation rules and the integration of external threat intelligence feeds. You benefit from personalized alert tuning, automated regulatory reporting (GDPR, ISO 27001), and 24/7 support with guaranteed SLAs. An initial configuration workshop and a post-deployment audit are included to optimize your defenses.'),
(18, 6, 'مايكرو SOC برو', '<ul><li><p>قواعد ارتباط متقدمة</p></li><li><p>تكامل استخبارات التهديدات</p></li><li><p>ضبط التنبيهات حسب الطلب</p></li><li><p>تقارير تنظيمية آلية</p></li><li><p>دعم فني على مدار الساعة طوال أيام الأسبوع مع اتفاقية مستوى الخدمة</p></li></ul>', 'ar-SA', 'يعتمد الإصدار الاحترافي على الإصدار القياسي بإضافة قواعد ارتباط متقدمة ودمج موجزات معلومات التهديدات الخارجية. ستستفيد من ضبط التنبيهات الشخصية، وإعداد التقارير التنظيمية الآلية (وفقًا للوائح العامة لحماية البيانات، ومعيار ISO 27001)، ودعم فني على مدار الساعة طوال أيام الأسبوع مع اتفاقيات مستوى خدمة مضمونة. يتضمن الإصدار ورشة عمل أولية للتكوين وتدقيقًا بعد النشر لتحسين دفاعاتك.'),
(19, 7, 'SOC Manage ', '<ul><li><p>Surveillance 24/7 en cloud</p></li><li><p>Traitement des alertes critiques</p></li><li><p>Rapport mensuel de tendances</p></li></ul>', 'fr-FR', 'Le SOC Managé Standard assure une surveillance continue de votre infrastructure via un centre d’opérations en cloud. Nos analysts reçoivent et traitent vos alertes, puis vous informent immédiatement en cas d’incident critique. Un rapport mensuel décrit les tendances détectées et propose des pistes d’amélioration. Solution clé en main pour externaliser votre surveillance sécurité.'),
(20, 7, 'SOC Manage ', '<ul><li><p>24/7 cloud-based monitoring</p></li><li><p>Critical alert processing</p></li><li><p>Monthly trend reports</p></li></ul>', 'en-GB', 'The Standard Managed SOC provides continuous monitoring of your infrastructure via a cloud operations center. Our analysts receive and process your alerts, then immediately notify you in the event of a critical incident. A monthly report describes detected trends and suggests areas for improvement. A turnkey solution for outsourcing your security monitoring.'),
(21, 7, 'إدارة مركز العمليات الأمنية', '<ul><li><p>مراقبة سحابية على مدار الساعة</p></li><li><p>معالجة التنبيهات الحرجة</p></li><li><p>تقارير شهرية عن الاتجاهات</p></li></ul>', 'ar-SA', 'يوفر مركز العمليات الأمنية المُدار القياسي مراقبةً مستمرةً لبنيتك التحتية عبر مركز عمليات سحابي. يتلقى محللونا تنبيهاتك ويعالجونها، ثم يُبلغونك فورًا في حال وقوع حادث خطير. يصف تقرير شهري الاتجاهات المُكتشفة ويقترح مجالات التحسين. حل جاهز للاستعانة بمصادر خارجية لمراقبة أمنك.'),
(22, 8, 'SOC Manage Pro', '<ul><li><p>Threat hunting régulier</p></li><li><p>Analyses forensiques approfondies</p></li><li><p>Portail client avec reporting interactif</p></li><li><p>Revue trimestrielle stratégique</p></li><li><p>Tests de procédures et formation</p></li></ul>', 'fr-FR', 'Au-delà du Standard, le SOC Managé Pro inclut des campagnes régulières de threat hunting et d’analyses forensiques poussées. Vous bénéficiez de points de contact dédiés, de comptes rendus détaillés via un portail client et d’un cycle de revue trimestrielle avec recommandations stratégiques. Nos équipes interviennent également pour tester vos procédures d’incident et former vos collaborateurs.'),
(23, 8, 'SOC Manage Pro', '<ul><li><p>Regular threat hunting</p></li><li><p>In-depth forensic analysis</p></li><li><p>Client portal with interactive reporting</p></li><li><p>Quarterly strategic review</p></li><li><p>Procedure testing and training</p></li></ul>', 'en-GB', 'Beyond Standard, the Managed SOC Pro includes regular threat hunting campaigns and in-depth forensic analysis. You benefit from dedicated points of contact, detailed reports via a customer portal, and a quarterly review cycle with strategic recommendations. Our teams also work to test your incident procedures and train your employees.'),
(24, 8, 'إدارة مركز العمليات الأمنية الاحترافية', '<ul><li><p>رصد التهديدات بانتظام</p></li><li><p>تحليل جنائي متعمق</p></li><li><p>بوابة عملاء مع تقارير تفاعلية</p></li><li><p>مراجعة استراتيجية ربع سنوية</p></li><li><p>اختبار الإجراءات والتدريب عليها</p></li></ul>', 'ar-SA', 'بالإضافة إلى المعايير القياسية، يتضمن برنامج Managed SOC Pro حملات دورية لرصد التهديدات وتحليلات جنائية معمقة. ستستفيد من نقاط اتصال مخصصة، وتقارير مفصلة عبر بوابة العملاء، ودورة مراجعة ربع سنوية تتضمن توصيات استراتيجية. كما تعمل فرقنا على اختبار إجراءات التعامل مع الحوادث وتدريب موظفيك.'),
(25, 9, 'Investigation, Éradication, Remédiation', '<ul><li><p>Analyse forensique initiale</p></li><li><p>Éradication des maliciels et comptes compromis</p></li><li><p>Plan de remédiation opérationnel</p></li></ul>', 'fr-FR', 'La réponse Standard couvre l’investigation initiale et l’éradication des menaces détectées. Nos experts réalisent une analyse forensique pour retracer l’origine et l’impact, puis suppriment maliciels et accès non autorisés. Vous recevez des recommandations de remédiation (patchs, configurations) pour restaurer un environnement sécurisé. Convient aux interventions urgentes à l’échelle opérationnelle.'),
(26, 9, 'Investigation, investigation, remediation', '<ul><li><p>Initial forensic analysis</p></li><li><p>Malware removal and compromised accounts</p></li><li><p>Operational remediation plan</p></li></ul>', 'en-GB', 'The Standard Response covers the initial investigation and eradication of detected threats. Our experts perform a forensic analysis to trace the origin and impact, then remove malware and unauthorized access. You receive remediation recommendations (patches, configurations) to restore a secure environment. Suitable for urgent interventions at an operational scale.'),
(27, 9, 'التحقيق، التحقيق، العلاج', '<ul><li><p>التحليل الجنائي الأولي</p></li><li><p>إزالة البرامج الضارة والحسابات المخترقة</p></li><li><p>خطة المعالجة التشغيلية</p></li></ul>', 'ar-SA', 'تشمل الاستجابة القياسية التحقيق الأولي والقضاء على التهديدات المكتشفة. يُجري خبراؤنا تحليلًا جنائيًا لتتبع مصدرها وتأثيرها، ثم إزالة البرامج الضارة والوصول غير المصرح به. ستتلقى توصيات بالإصلاح (التصحيحات والتكوينات) لاستعادة بيئة آمنة. مناسب للتدخلات العاجلة على نطاق تشغيلي.'),
(28, 10, 'Investigation, éradication, remédiation Pro', '<ul><li><p>Root cause analysis détaillé</p></li><li><p>Workshop de remédiation et formation</p></li><li><p>Suivi post-incident (retest à J+30)</p></li><li><p>Rapport stratégique et sessions de restitution</p></li></ul>', 'fr-FR', 'La version Pro ajoute un volet de root cause analysis approfondi, un workshop de remédiation en direct et un suivi post-incident à J+30 pour valider l’efficacité des correctifs. Chaque étape est documentée via un rapport détaillé, incluant des sessions de restitution pour vos équipes et des recommandations stratégiques visant à renforcer votre résilience.'),
(29, 10, 'Investigation, eradication, remediation Pro', '<ul><li><p>Detailed root cause analysis</p></li><li><p>Remediation workshop and training</p></li><li><p>Post-incident follow-up (retest at 30 days)</p></li><li><p>Strategic report and feedback sessions</p></li></ul>', 'en-GB', 'The Pro version adds an in-depth root cause analysis component, a live remediation workshop, and a 30-day post-incident follow-up to validate the effectiveness of fixes. Each step is documented in a detailed report, including feedback sessions for your teams and strategic recommendations to strengthen your resilience.'),
(30, 10, 'التحقيق والاستئصال والمعالجة', '<ul><li><p>تحليل مفصل للأسباب الجذرية</p></li><li><p>ورشة عمل وتدريب على المعالجة</p></li><li><p>متابعة ما بعد الحادث (إعادة اختبار بعد 30 يومًا)</p></li><li><p>جلسات إعداد التقارير الاستراتيجية وجلسات التقييم</p></li></ul>', 'ar-SA', 'يضيف الإصدار الاحترافي تحليلًا متعمقًا للسبب الجذري، وورشة عمل مباشرة للمعالجة، ومتابعة لمدة 30 يومًا بعد الحادث للتحقق من فعالية الحلول. تُوثّق كل خطوة في تقرير مفصل، يتضمن جلسات تقييم لفرقكم وتوصيات استراتيجية لتعزيز مرونتكم.');

-- --------------------------------------------------------

--
-- Structure de la table `promotional_code`
--

CREATE TABLE `promotional_code` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `promotion` double NOT NULL,
  `is_percent` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `promotional_code`
--

INSERT INTO `promotional_code` (`id`, `name`, `promotion`, `is_percent`) VALUES
(1, 'Cyna1000', 1000, 0),
(2, 'Cyna20', 20, 1);

-- --------------------------------------------------------

--
-- Structure de la table `refresh_tokens`
--

CREATE TABLE `refresh_tokens` (
  `id` int NOT NULL,
  `refresh_token` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valid` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `refresh_tokens`
--

INSERT INTO `refresh_tokens` (`id`, `refresh_token`, `username`, `valid`) VALUES
(3, '904868cd0c50c887f1efa3b7ddd27efbe9304b36ca1ecfb86b42ebcfbbc8653557a21228de34b145f9a698e6ccc39052141695e541bc34038cd1bfff2a7eb921', 'admin@admin.fr', '2025-05-28 12:55:32');

-- --------------------------------------------------------

--
-- Structure de la table `slide`
--

CREATE TABLE `slide` (
  `id` int NOT NULL,
  `image_id` int NOT NULL,
  `homepage_id` int DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `slide`
--

INSERT INTO `slide` (`id`, `image_id`, `homepage_id`, `title`) VALUES
(5, 4, 4, 'Sécurisez Votre Système d’Information avec Cyna'),
(6, 5, 4, 'Cyna protège les entreprises contre les cyberattaques'),
(8, 7, 4, 'Nous plaçons vos priorités au cœur de notre mission'),
(9, 4, 5, 'Secure Your Information System with Cyna'),
(10, 5, 5, 'Cyna protects businesses against cyberattacks'),
(11, 7, 5, 'We place your priorities at the heart of our mission'),
(12, 4, 6, 'Cyna تأمين نظام المعلومات الخاص بك مع '),
(13, 5, 6, 'تحمي شركة Cyna الشركات من الهجمات الإلكترونية'),
(14, 7, 6, 'نحن نضع أولوياتك في قلب مهمتنا');

-- --------------------------------------------------------

--
-- Structure de la table `subscription`
--

CREATE TABLE `subscription` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `locale` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` int NOT NULL,
  `position` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `subscription_caracteristic`
--

CREATE TABLE `subscription_caracteristic` (
  `id` int NOT NULL,
  `subscription_id` int NOT NULL,
  `position` int DEFAULT NULL,
  `text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_email_verified` tinyint(1) NOT NULL,
  `stripe_customer_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `two_fa_code` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `two_fa_expires_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '(DC2Type:datetime_immutable)',
  `is_prenium` tinyint(1) NOT NULL,
  `subscription_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `firstname`, `lastname`, `is_email_verified`, `stripe_customer_id`, `two_fa_code`, `two_fa_expires_at`, `created_at`, `updated_at`, `is_prenium`, `subscription_id`) VALUES
(1, 'admin@admin.fr', '[\"ROLE_USER\", \"ROLE_ADMIN\", \"ROLE_SUPER_ADMIN\"]', '$2y$13$m/9qOcsTm4wzf43lXdHDEuRd5BTDPFIrucXF2ICvcF1MLyF4EkXWK', 'Admin', 'Admin', 1, NULL, NULL, NULL, '2025-04-28 11:15:21', '2025-04-28 14:55:32', 0, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_D4E6F81A76ED395` (`user_id`);

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_64C19C13DA5256D` (`image_id`);

--
-- Index pour la table `category_translation`
--
ALTER TABLE `category_translation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_3F2070412469DE2` (`category_id`),
  ADD KEY `IDX_3F20704E559DFD1` (`locale_id`);

--
-- Index pour la table `confirm_email`
--
ALTER TABLE `confirm_email`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_106C771EE7927C74` (`email`);

--
-- Index pour la table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `homepage`
--
ALTER TABLE `homepage`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `locale_cyna`
--
ALTER TABLE `locale_cyna`
  ADD PRIMARY KEY (`code`);

--
-- Index pour la table `log_activity`
--
ALTER TABLE `log_activity`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `log_field`
--
ALTER TABLE `log_field`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_7B8BAE05DD791C3E` (`log_activity_id`);

--
-- Index pour la table `media_object`
--
ALTER TABLE `media_object`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_F5299398A76ED395` (`user_id`),
  ADD KEY `IDX_F52993985AA1164F` (`payment_method_id`);

--
-- Index pour la table `order_line`
--
ALTER TABLE `order_line`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_9CE58EE1E238517C` (`order_ref_id`);

--
-- Index pour la table `password_reset`
--
ALTER TABLE `password_reset`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_B1017252E7927C74` (`email`);

--
-- Index pour la table `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_7B61A1F6A76ED395` (`user_id`);

--
-- Index pour la table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_D34A04AD12469DE2` (`category_id`),
  ADD KEY `IDX_D34A04AD3DA5256D` (`image_id`);

--
-- Index pour la table `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_64617F033DA5256D` (`image_id`),
  ADD KEY `IDX_64617F034584665A` (`product_id`);

--
-- Index pour la table `product_translation`
--
ALTER TABLE `product_translation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_1846DB704584665A` (`product_id`),
  ADD KEY `IDX_1846DB70E559DFD1` (`locale_id`);

--
-- Index pour la table `promotional_code`
--
ALTER TABLE `promotional_code`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_9BACE7E1C74F2195` (`refresh_token`);

--
-- Index pour la table `slide`
--
ALTER TABLE `slide`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_72EFEE623DA5256D` (`image_id`),
  ADD KEY `IDX_72EFEE62571EDDA` (`homepage_id`);

--
-- Index pour la table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `subscription_caracteristic`
--
ALTER TABLE `subscription_caracteristic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_F590D3BF9A1887DC` (`subscription_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_IDENTIFIER_EMAIL` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `address`
--
ALTER TABLE `address`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `category_translation`
--
ALTER TABLE `category_translation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `confirm_email`
--
ALTER TABLE `confirm_email`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `homepage`
--
ALTER TABLE `homepage`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `log_activity`
--
ALTER TABLE `log_activity`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT pour la table `log_field`
--
ALTER TABLE `log_field`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT pour la table `media_object`
--
ALTER TABLE `media_object`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT pour la table `order`
--
ALTER TABLE `order`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `order_line`
--
ALTER TABLE `order_line`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `password_reset`
--
ALTER TABLE `password_reset`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `product`
--
ALTER TABLE `product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `product_translation`
--
ALTER TABLE `product_translation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `promotional_code`
--
ALTER TABLE `promotional_code`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `slide`
--
ALTER TABLE `slide`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `subscription`
--
ALTER TABLE `subscription`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `subscription_caracteristic`
--
ALTER TABLE `subscription_caracteristic`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `FK_D4E6F81A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `FK_64C19C13DA5256D` FOREIGN KEY (`image_id`) REFERENCES `media_object` (`id`);

--
-- Contraintes pour la table `category_translation`
--
ALTER TABLE `category_translation`
  ADD CONSTRAINT `FK_3F2070412469DE2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `FK_3F20704E559DFD1` FOREIGN KEY (`locale_id`) REFERENCES `locale_cyna` (`code`);

--
-- Contraintes pour la table `log_field`
--
ALTER TABLE `log_field`
  ADD CONSTRAINT `FK_7B8BAE05DD791C3E` FOREIGN KEY (`log_activity_id`) REFERENCES `log_activity` (`id`);

--
-- Contraintes pour la table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `FK_F52993985AA1164F` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`id`),
  ADD CONSTRAINT `FK_F5299398A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `order_line`
--
ALTER TABLE `order_line`
  ADD CONSTRAINT `FK_9CE58EE1E238517C` FOREIGN KEY (`order_ref_id`) REFERENCES `order` (`id`);

--
-- Contraintes pour la table `payment_method`
--
ALTER TABLE `payment_method`
  ADD CONSTRAINT `FK_7B61A1F6A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK_D34A04AD12469DE2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `FK_D34A04AD3DA5256D` FOREIGN KEY (`image_id`) REFERENCES `media_object` (`id`);

--
-- Contraintes pour la table `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `FK_64617F033DA5256D` FOREIGN KEY (`image_id`) REFERENCES `media_object` (`id`),
  ADD CONSTRAINT `FK_64617F034584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Contraintes pour la table `product_translation`
--
ALTER TABLE `product_translation`
  ADD CONSTRAINT `FK_1846DB704584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `FK_1846DB70E559DFD1` FOREIGN KEY (`locale_id`) REFERENCES `locale_cyna` (`code`);

--
-- Contraintes pour la table `slide`
--
ALTER TABLE `slide`
  ADD CONSTRAINT `FK_72EFEE623DA5256D` FOREIGN KEY (`image_id`) REFERENCES `media_object` (`id`),
  ADD CONSTRAINT `FK_72EFEE62571EDDA` FOREIGN KEY (`homepage_id`) REFERENCES `homepage` (`id`);

--
-- Contraintes pour la table `subscription_caracteristic`
--
ALTER TABLE `subscription_caracteristic`
  ADD CONSTRAINT `FK_F590D3BF9A1887DC` FOREIGN KEY (`subscription_id`) REFERENCES `subscription` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
