CREATE DATABASE `foodbase` CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE `fooddata` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `fatty` varchar(20) NOT NULL DEFAULT '',
  `dt` DATETIME,
  `food` varchar(80) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;