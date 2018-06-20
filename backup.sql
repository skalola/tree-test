-- MySQL dump 10.13  Distrib 8.0.11, for osx10.13 (x86_64)
--
-- Host: localhost    Database: qziykso7n4bw0u6d
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `branches`
--

DROP TABLE IF EXISTS `branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `branches` (
  `branch_id` int(11) NOT NULL AUTO_INCREMENT,
  `branch_name` varchar(50) DEFAULT NULL,
  `branch_range_start` int(11) DEFAULT NULL,
  `branch_range_end` int(11) DEFAULT NULL,
  `children` int(11) DEFAULT NULL,
  `create_timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modify_timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
INSERT INTO `branches` VALUES (1,'Parent One',10,50,5,'2018-06-20 00:12:13','2018-06-20 00:12:13'),(2,'Parent One',10,50,5,'2018-06-20 00:12:34','2018-06-20 00:12:34'),(3,'Parent One',10,50,5,'2018-06-20 00:17:45','2018-06-20 00:17:45'),(4,'Parent One',10,50,5,'2018-06-20 00:22:37','2018-06-20 00:22:37');
/*!40000 ALTER TABLE `branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leaves`
--

DROP TABLE IF EXISTS `leaves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `leaves` (
  `branch_id` int(11) NOT NULL,
  `leaf_number` int(11) DEFAULT NULL,
  `create_timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaves`
--

LOCK TABLES `leaves` WRITE;
/*!40000 ALTER TABLE `leaves` DISABLE KEYS */;
INSERT INTO `leaves` VALUES (1,15,'2018-06-19 23:34:15'),(1,30,'2018-06-19 23:34:15'),(1,44,'2018-06-19 23:34:15'),(1,27,'2018-06-19 23:34:15'),(1,48,'2018-06-19 23:34:15'),(1,15,'2018-06-19 23:37:02'),(1,30,'2018-06-19 23:37:02'),(1,44,'2018-06-19 23:37:02'),(1,27,'2018-06-19 23:37:02'),(1,48,'2018-06-19 23:37:02'),(1,15,'2018-06-19 23:40:46'),(1,30,'2018-06-19 23:40:46'),(1,44,'2018-06-19 23:40:46'),(1,27,'2018-06-19 23:40:46'),(1,48,'2018-06-19 23:40:46'),(1,15,'2018-06-19 23:49:26'),(1,30,'2018-06-19 23:49:26'),(1,44,'2018-06-19 23:49:26'),(1,27,'2018-06-19 23:49:26'),(1,48,'2018-06-19 23:49:26'),(1,15,'2018-06-20 00:05:39'),(1,30,'2018-06-20 00:05:39'),(1,44,'2018-06-20 00:05:39'),(1,27,'2018-06-20 00:05:39'),(1,48,'2018-06-20 00:05:39'),(1,15,'2018-06-20 00:11:51'),(1,30,'2018-06-20 00:11:51'),(1,44,'2018-06-20 00:11:51'),(1,27,'2018-06-20 00:11:51'),(1,48,'2018-06-20 00:11:51'),(1,15,'2018-06-20 00:12:13'),(1,30,'2018-06-20 00:12:13'),(1,44,'2018-06-20 00:12:13'),(1,27,'2018-06-20 00:12:13'),(1,48,'2018-06-20 00:12:13'),(1,15,'2018-06-20 00:12:34'),(1,30,'2018-06-20 00:12:34'),(1,44,'2018-06-20 00:12:34'),(1,27,'2018-06-20 00:12:34'),(1,48,'2018-06-20 00:12:34'),(1,15,'2018-06-20 00:17:45'),(1,30,'2018-06-20 00:17:45'),(1,44,'2018-06-20 00:17:45'),(1,27,'2018-06-20 00:17:45'),(1,48,'2018-06-20 00:17:45'),(1,15,'2018-06-20 00:22:37'),(1,30,'2018-06-20 00:22:37'),(1,44,'2018-06-20 00:22:37'),(1,27,'2018-06-20 00:22:37'),(1,48,'2018-06-20 00:22:37');
/*!40000 ALTER TABLE `leaves` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-19 21:55:01
