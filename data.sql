LOCK TABLES `fooddata` WRITE;

INSERT INTO `fooddata` (`id`, `fatty`, `dt`, `food`)
VALUES
	(1,'john',now(),'Banana'),
	(2,'john',now(),'Turtle meat'),
	(3,'terri',now(),'Turkey sandwich'),
	(1,'terri',now(),'cookies'),
	(1,'john',now(),'Poop on crackers'),
UNLOCK TABLES;