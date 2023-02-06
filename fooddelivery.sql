-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: fooddelivery
-- ------------------------------------------------------
-- Server version	5.7.41

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `idcomments` int(11) NOT NULL AUTO_INCREMENT,
  `idfoodcomment` int(11) NOT NULL,
  `idusercomment` int(11) NOT NULL,
  `comment` varchar(1000) NOT NULL,
  `commenttime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idcomments`),
  KEY `foodid_idx` (`idfoodcomment`),
  KEY `userid_idx` (`idusercomment`),
  CONSTRAINT `foodidcomment` FOREIGN KEY (`idfoodcomment`) REFERENCES `food` (`idfood`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `useridcomment` FOREIGN KEY (`idusercomment`) REFERENCES `users` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (8,9,12,'moze','2023-02-06 18:33:44'),(9,9,12,'moze','2023-02-06 18:35:03');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food` (
  `idfood` int(11) NOT NULL AUTO_INCREMENT,
  `foodname` varchar(100) NOT NULL,
  `foodprice` int(255) NOT NULL,
  `foodimage` varchar(100) NOT NULL,
  `foodrating` int(11) NOT NULL DEFAULT '0',
  `fooddate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idfood`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES (7,'kobasica',52,'aimbot.png',0,'2023-02-03 05:14:48'),(8,'pica',52,'21383006.535_image.png',2,'2023-02-05 16:25:31'),(9,'LEPO JE OVO',52,'21383006.535_image.png',4,'2023-02-05 17:42:19'),(10,'LEPO JE OVOOP',52,'21383006.535_image.png',0,'2023-02-05 18:19:18'),(11,'oho',12,'HT-godfatrher-jef-170308_16x9_992.jpg',0,'2023-02-06 13:18:01'),(12,'kksks',12,'fist.png',0,'2023-02-06 13:23:52');
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `idorder` int(11) NOT NULL AUTO_INCREMENT,
  `idfood` int(11) NOT NULL,
  `idrestaurant` int(11) NOT NULL,
  `iduserorder` int(11) NOT NULL,
  `nameofstreet` varchar(100) NOT NULL,
  `timeorder` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idorder`),
  KEY `idfood_idx` (`idfood`),
  KEY `idrestaurant_idx` (`idrestaurant`),
  KEY `iduserorder_idx` (`iduserorder`),
  CONSTRAINT `idfood` FOREIGN KEY (`idfood`) REFERENCES `food` (`idfood`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idrestaurant` FOREIGN KEY (`idrestaurant`) REFERENCES `restaurants` (`idrestaurants`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `iduserorder` FOREIGN KEY (`iduserorder`) REFERENCES `users` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,7,6,0,'Ulica Tanasija Pejatovica, Pljevlja, 84210, ME','2023-02-04 13:11:12'),(2,8,6,0,'Ulica Tanasija Pejatovica, Pljevlja, 84210, ME','2023-02-04 13:19:31'),(3,8,6,0,'Ulica Tanasija Pejatovica, Pljevlja, 84210, ME','2023-02-04 13:42:51'),(4,7,6,0,'Ulica Tanasija Pejatovica, Pljevlja, 84210, ME','2023-02-04 19:50:59'),(5,8,6,0,'Ulica Tanasija Pejatovica, Pljevlja, 84210, ME','2023-02-04 22:21:09'),(6,9,6,0,'Ulica Tanasija Pejatovica, Pljevlja, 84210, ME','2023-02-05 18:25:35'),(7,9,7,0,'Ulica Nikole Pasica, Pljevlja, 84210, ME','2023-02-05 18:25:42'),(8,9,8,0,'Kralja Petra i, Pljevlja, 84210, ME','2023-02-05 18:25:48'),(9,9,6,12,'Ulica Tanasija Pejatovica, Pljevlja, 84210, ME','2023-02-05 20:44:02'),(11,8,6,12,'Ulica Tanasija Pejatovica, Pljevlja, 84210, ME','2023-02-06 12:33:48');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `idratings` int(11) NOT NULL AUTO_INCREMENT,
  `foodid` int(11) NOT NULL,
  `ratingvalue` int(11) NOT NULL,
  `whorated` int(11) NOT NULL,
  PRIMARY KEY (`idratings`),
  KEY `fooid_idx` (`foodid`),
  KEY `userid_idx` (`whorated`),
  CONSTRAINT `fooid` FOREIGN KEY (`foodid`) REFERENCES `food` (`idfood`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userid` FOREIGN KEY (`whorated`) REFERENCES `users` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (1,8,5,12),(2,7,5,12),(3,8,3,12),(4,8,3,12),(5,8,2,12),(6,8,4,12),(7,9,2,12),(8,9,2,12),(9,9,2,12),(10,9,2,12),(11,9,1,12),(12,9,1,12),(13,9,1,12),(14,9,1,12),(15,9,5,12),(16,9,5,12),(17,9,5,12),(18,9,5,12),(19,9,5,12),(20,9,5,12),(21,9,5,12),(22,9,5,12),(23,9,5,12),(24,9,5,12),(25,9,5,12),(26,9,5,12),(27,9,5,12),(28,9,5,12),(29,9,5,12),(30,9,5,12);
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurantchain`
--

DROP TABLE IF EXISTS `restaurantchain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurantchain` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nameofcity` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurantchain`
--

LOCK TABLES `restaurantchain` WRITE;
/*!40000 ALTER TABLE `restaurantchain` DISABLE KEYS */;
INSERT INTO `restaurantchain` VALUES (2,'pljevlja');
/*!40000 ALTER TABLE `restaurantchain` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurants` (
  `idrestaurants` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `geolocation` varchar(100) NOT NULL,
  `courier` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idrestaurants`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (6,'ignjat','Ulica Tanasija Pejatovica, Pljevlja, 84210, ME',0),(7,'ignjat123','Ulica Nikole Pasica, Pljevlja, 84210, ME',0),(8,'ohohohoh','Kralja Petra i, Pljevlja, 84210, ME',1);
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('9opFcgupy39qQJOw2NgT4cAs-kEaLfBw',1679283228,'{\"cookie\":{\"originalMaxAge\":3600000000,\"expires\":\"2023-03-17T07:07:38.740Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":12}}'),('b42K7wjSqydNbT3PrFntkuFcTwFWQp5g',1679309422,'{\"cookie\":{\"originalMaxAge\":3600000000,\"expires\":\"2023-03-20T10:50:21.662Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":13}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `geolocation` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `admin` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (7,'boskousername','$2b$10$ZpNSYVlz8rRZHXhkCJArcebjPaawj6O3qstiEJ5F3A5sIlSUIs.RC','podgorica','Bosko','Bezarevic',1),(8,'vuks','$2b$10$P0uSxd3yUGLRB/ZcHoaG.eCJ0Y4ymdbnAyCSc0XDh68VbydElZBZC','pljevlja','BoskoB','BoskoBB',0),(9,'dsfafa','$2b$10$oSGxxEZfTGJKwdcicXMpKe3TBL1JTR6QOZdLBKxadXrl/4sVpGucC','Ulica Mila Perunicic, Pljevlja, 84210, ME','Baaaks','asdasda',0),(10,'afs','$2b$10$xcYXdb11mWmO/5QMSF38Zu/1DBjJmJRhoD/hsTFQA1oY2Qr4ej/zK','Ulica Mila Perunicic, Pljevlja, 84210, ME','Baaaksfasf','asdafafasda',0),(12,'xeqtr','$2b$10$NSxYhzoxByAOWCgJJI2Ck.3DMsRmpJ2Ak7FGFcI6w8hU/WsUae8Q2','Kralja Petra i, Pljevlja, 84210, ME','Skabo','Boleta',1),(13,'username','$2b$10$0jHhxbUtgyALDAKDZUjGpO1yJtgYO4wkAVirm4raGlFmcWUPLgIxm','Location Rd, Ogba/Egbema/Ndoni, RI, NG','firstname','lastname',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-06 20:21:09
