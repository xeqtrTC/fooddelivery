CREATE DATABASE  IF NOT EXISTS `fooddelivery`;
USE `fooddelivery`;



DROP TABLE IF EXISTS `users`;

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

DROP TABLE IF EXISTS `food`;

CREATE TABLE `food` (
  `idfood` int(11) NOT NULL AUTO_INCREMENT,
  `foodname` varchar(100) NOT NULL,
  `foodprice` int(255) NOT NULL,
  `foodimage` varchar(100) NOT NULL,
  `foodrating` int(11) NOT NULL DEFAULT '0',
  `fooddate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idfood`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `restaurants`;

CREATE TABLE `restaurants` (
  `idrestaurants` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `geolocation` varchar(100) NOT NULL,
  PRIMARY KEY (`idrestaurants`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `ratings`;

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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `orders`;

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

DROP TABLE IF EXISTS `comments`;

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




INSERT INTO `food` VALUES (13,'pizza',6,'pizza.jpg', 0, '2023-02-07 11:15:02');
INSERT INTO `food` VALUES (14,'pljeskavica',3,'pljeskavica-default.jpg',0,'2023-02-07 11:15:02');
INSERT INTO `food` VALUES (15,'karadjordjeva snicla',10,'karadjordjeva.jpg',0,'2023-02-07 11:15:02');
