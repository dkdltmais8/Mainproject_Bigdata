-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: J5B305.p.ssafy.io    Database: bigdatapjt
-- ------------------------------------------------------
-- Server version	8.0.26-0ubuntu0.20.04.3

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
-- Table structure for table `tempmovieti`
--

DROP TABLE IF EXISTS `tempmovieti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tempmovieti` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `E` int unsigned DEFAULT NULL,
  `I` int unsigned DEFAULT NULL,
  `N` int unsigned DEFAULT NULL,
  `S` int unsigned DEFAULT NULL,
  `T` int unsigned DEFAULT NULL,
  `F` int unsigned DEFAULT NULL,
  `J` int unsigned DEFAULT NULL,
  `P` int unsigned DEFAULT NULL,
  PRIMARY KEY (`uid`),
  CONSTRAINT `tempmovieti_chk_1` CHECK ((`E` >= 0)),
  CONSTRAINT `tempmovieti_chk_2` CHECK ((`I` >= 0)),
  CONSTRAINT `tempmovieti_chk_3` CHECK ((`N` >= 0)),
  CONSTRAINT `tempmovieti_chk_4` CHECK ((`S` >= 0)),
  CONSTRAINT `tempmovieti_chk_5` CHECK ((`T` >= 0)),
  CONSTRAINT `tempmovieti_chk_6` CHECK ((`F` >= 0)),
  CONSTRAINT `tempmovieti_chk_7` CHECK ((`J` >= 0)),
  CONSTRAINT `tempmovieti_chk_8` CHECK ((`P` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tempmovieti`
--

LOCK TABLES `tempmovieti` WRITE;
/*!40000 ALTER TABLE `tempmovieti` DISABLE KEYS */;
INSERT INTO `tempmovieti` VALUES (1,3,0,0,3,3,0,0,3),(2,0,0,0,0,0,0,0,0),(3,0,0,0,0,0,0,0,0),(4,0,0,0,0,0,0,0,0),(5,0,0,0,0,0,0,0,0),(6,0,0,0,0,0,0,0,0),(7,0,0,0,0,0,0,0,0),(8,0,0,0,0,0,0,0,0),(9,0,0,0,0,0,0,0,0),(10,0,0,0,0,0,0,0,0),(11,0,0,0,0,0,0,0,0),(12,0,0,0,0,0,0,0,0),(13,2,1,1,2,1,2,1,2),(14,0,0,0,0,0,0,0,0),(15,0,0,0,0,0,0,0,0),(16,0,0,0,0,0,0,0,0),(17,0,0,0,0,0,0,0,0),(18,0,0,0,0,0,0,0,0),(19,0,0,0,0,0,0,0,0),(20,0,0,0,0,0,0,0,0),(21,0,0,0,0,0,0,0,0),(22,0,0,0,0,0,0,0,0),(23,0,0,0,0,0,0,0,0),(24,0,0,0,0,0,0,0,0),(25,0,0,0,0,0,0,0,0),(26,0,0,0,0,0,0,0,0),(27,0,0,0,0,0,0,0,0),(28,0,0,0,0,0,0,0,0),(29,0,3,3,0,0,3,3,0),(30,0,0,0,0,0,0,0,0),(31,1,2,3,0,1,2,3,0),(32,0,0,0,0,0,0,0,0),(33,0,0,0,0,0,0,0,0),(34,0,0,0,0,0,0,0,0),(35,0,0,0,0,0,0,0,0);
/*!40000 ALTER TABLE `tempmovieti` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-08  9:48:44
