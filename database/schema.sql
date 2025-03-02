-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: la_union_tourism
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_categories`
--

DROP TABLE IF EXISTS `tbl_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_name` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_categories`
--

LOCK TABLES `tbl_categories` WRITE;
/*!40000 ALTER TABLE `tbl_categories` DISABLE KEYS */;
INSERT INTO `tbl_categories` VALUES (5,'Hotel and Resort','This is a sample description'),(6,'Beach Resort','This is a sample description'),(8,'Hotel, Resort & Restaurant','This is a sample description\n');
/*!40000 ALTER TABLE `tbl_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_claimed_vouchers`
--

DROP TABLE IF EXISTS `tbl_claimed_vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_claimed_vouchers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `voucher_id` int NOT NULL,
  `user_id` int NOT NULL,
  `claimed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `voucher_id` (`voucher_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tbl_claimed_vouchers_ibfk_1` FOREIGN KEY (`voucher_id`) REFERENCES `tbl_vouchers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_claimed_vouchers_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_claimed_vouchers`
--

LOCK TABLES `tbl_claimed_vouchers` WRITE;
/*!40000 ALTER TABLE `tbl_claimed_vouchers` DISABLE KEYS */;
INSERT INTO `tbl_claimed_vouchers` VALUES (1,1,10,'2025-02-20 13:42:49'),(2,4,10,'2025-02-21 14:42:20');
/*!40000 ALTER TABLE `tbl_claimed_vouchers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_images`
--

DROP TABLE IF EXISTS `tbl_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `tbl_images_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `tbl_posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_images`
--

LOCK TABLES `tbl_images` WRITE;
/*!40000 ALTER TABLE `tbl_images` DISABLE KEYS */;
INSERT INTO `tbl_images` VALUES (16,10,'/uploads/f759d43e-acc4-4ee8-b8af-eb4a1cd19c81_p&m2.jpg','2025-02-20 14:20:45'),(17,10,'/uploads/f7409974-c267-4ca7-8dfb-cf8e2546d13b_p&m.jpg','2025-02-20 14:20:45'),(18,10,'/uploads/3f45f592-2d7d-4834-a71d-6ed1a134c614_p&m4.jfif','2025-02-20 14:20:45'),(19,10,'/uploads/82e9da21-9d65-46e5-8bae-853470b69c08_p&m3.jpg','2025-02-20 14:20:45'),(20,11,'/uploads/35605740-4817-4559-9f02-f3db68aba53b_marand3.jpg','2025-02-20 14:34:17'),(21,11,'/uploads/1a6e8943-a1e4-46ac-b4a4-4fa5aaab0a14_marand1.jpg','2025-02-20 14:34:17'),(22,11,'/uploads/c53008f8-03d9-494d-8bea-50838da40944_marand4.jpg','2025-02-20 14:34:17'),(23,11,'/uploads/7ed5cdab-a145-497d-a319-d58b792940df_marand2.jpg','2025-02-20 14:34:17');
/*!40000 ALTER TABLE `tbl_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_posts`
--

DROP TABLE IF EXISTS `tbl_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(255) NOT NULL,
  `price` decimal(10,2) DEFAULT '0.00',
  `price_per_night` decimal(10,2) DEFAULT '0.00',
  `price_currency` varchar(10) DEFAULT 'USD',
  `seasonal_price` decimal(10,2) DEFAULT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `tbl_posts_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `tbl_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_posts`
--

LOCK TABLES `tbl_posts` WRITE;
/*!40000 ALTER TABLE `tbl_posts` DISABLE KEYS */;
INSERT INTO `tbl_posts` VALUES (10,5,'P&M Final Option Beach Resort','P&M Final Option Beach Resort is an excellent choice for travelers visiting San Juan, offering a romantic environment alongside many helpful amenities designed to enhance your stay. The rooms offer a flat screen TV, air conditioning, and a refrigerator, and getting online is possible, as free wifi is available, allowing you to rest and refresh with ease. P&M Final Option Beach Resort features room service, baggage storage, and shops. In addition, as a valued Final Option Resort & German Bistro Hotel guest, you can enjoy a pool and breakfast that are available on-site. Guests arriving by vehicle have access to free parking. Should time allow, St. John the Baptist is a popular attraction that is within walking distance. Enjoy your stay in San Juan!',' 320 Eagle Street, San Juan, Luzon 2514 Philippines',1500.00,2000.00,'PHP',1000.00,500.00,'2025-02-20 14:20:45'),(11,6,'Marand Beach Resort','Escape to beautiful Marand resort located 3 minutes drive from Baung La Union. Marand Resort\'s wide range of resort facilities cater for everyone and offer guests of all ages the perfect destination to relax and unwind.','Baccuit Sur, Bauang, Luzon 2501 Philippines',10000.00,1500.00,'PHP',1500.00,500.00,'2025-02-20 14:34:15');
/*!40000 ALTER TABLE `tbl_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_type` varchar(255) DEFAULT 'User',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_users`
--

LOCK TABLES `tbl_users` WRITE;
/*!40000 ALTER TABLE `tbl_users` DISABLE KEYS */;
INSERT INTO `tbl_users` VALUES (8,'Administrator','admin@admin.com','$2b$10$qigUFkRi5E5aKWO1gOfwIexEevFAkn7CBOxfTCc.jAe86ktc3HOU2','Administrator','123456789','2025-02-20 06:22:45','Admin'),(10,'test','test@gmail.com','$2b$10$EyQqPmT.apMr/AjGZj77geK7QrwGF5AYVd0TQptaoMQTCjJJREoyS','Test Name','12345678901','2025-02-20 11:54:12','User'),(11,'test2','test2@example.com','$2b$10$7DgwmpBeBugExl/NWnTseeujdGyzkGpJyECESAIz3oSPPSlqN8KLq','Test Name 2','12345678901','2025-02-20 11:54:40','User'),(12,'test3','test3@example.com','$2b$10$QgmqZm4P7w4xKeBY09qvVOgqCUhJWn2XrcDF3DoH7bbzyrqh2EH16','Test Name 3','12345678901','2025-02-20 11:54:58','User'),(13,'test5','test5@example.com','$2b$10$ANKmmLiXZL3/XYOfbTzRHePdbRQRxLmbvQNg746WluNAyZL5tMpt.','Test Name 5','12345678901','2025-02-21 04:34:31','User');
/*!40000 ALTER TABLE `tbl_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_vouchers`
--

DROP TABLE IF EXISTS `tbl_vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_vouchers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `code` varchar(20) NOT NULL,
  `amount` decimal(5,2) DEFAULT NULL,
  `is_redeemed` tinyint(1) DEFAULT '0',
  `expiry_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_claimed` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tbl_vouchers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_vouchers`
--

LOCK TABLES `tbl_vouchers` WRITE;
/*!40000 ALTER TABLE `tbl_vouchers` DISABLE KEYS */;
INSERT INTO `tbl_vouchers` VALUES (1,10,'TESTCODE',200.00,1,'2025-02-19','2025-02-20 12:01:24',1),(4,10,'TESTCODE',200.00,0,'2025-02-27','2025-02-21 12:46:15',1);
/*!40000 ALTER TABLE `tbl_vouchers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-24 14:32:32
