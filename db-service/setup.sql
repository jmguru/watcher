USE foodbase;
CREATE TABLE `fooddata` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `fatty` varchar(20) NOT NULL DEFAULT '',
  `dt` DATETIME,
  `food` varchar(80) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

INSERT INTO `fooddata` (`id`, `fatty`, `dt`, `food`)
VALUES
        (1,'john',now(),'Banana'),
        (2,'john',now(),'Turtle meat'),
        (3,'terri',now(),'Turkey sandwich'),
        (1,'terri',now(),'cookies'),
        (1,'john',now(),'Poop on crackers');
