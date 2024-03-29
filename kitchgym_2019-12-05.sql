# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.26)
# Database: kitchgym
# Generation Time: 2019-12-06 04:28:38 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table cal_tracker
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cal_tracker`;

CREATE TABLE `cal_tracker` (
  `c_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `goal_calories` int(11) DEFAULT '2000',
  `date` date DEFAULT NULL,
  `u_id` int(11) NOT NULL,
  PRIMARY KEY (`c_id`),
  KEY `user_foreign_key` (`u_id`),
  CONSTRAINT `user_foreign_key` FOREIGN KEY (`u_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `cal_tracker` WRITE;
/*!40000 ALTER TABLE `cal_tracker` DISABLE KEYS */;

INSERT INTO `cal_tracker` (`c_id`, `goal_calories`, `date`, `u_id`)
VALUES
	(1,2000,NULL,1);

/*!40000 ALTER TABLE `cal_tracker` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table exercise
# ------------------------------------------------------------

DROP TABLE IF EXISTS `exercise`;

CREATE TABLE `exercise` (
  `exercise_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `muscle` int(11) DEFAULT NULL,
  PRIMARY KEY (`exercise_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `exercise` WRITE;
/*!40000 ALTER TABLE `exercise` DISABLE KEYS */;

INSERT INTO `exercise` (`exercise_id`, `name`, `muscle`)
VALUES
	(2,'Bicep Curls',0),
	(3,'Lunges',1),
	(4,'Seated Cable Row',3),
	(5,'Wall Pushup',0),
	(6,'Ring Dips',0),
	(7,'Axe Hold',0),
	(8,'Pull-ups',0),
	(9,'Front Squat',1),
	(10,'Walking Lunges',1),
	(11,'High Knees',1),
	(12,'Run',1),
	(13,'Crunches',2),
	(14,'Flutter Kicks',2),
	(15,'Plank',2),
	(16,'Chin-ups',3),
	(17,'Deadlift',3),
	(18,'Tricep Curls',0),
	(19,'Wall-sits',1),
	(20,'Sit-ups',2),
	(21,'Hammer Curl',0),
	(22,'Neutral-Grip Triceps Extension',0),
	(23,'Preacher Curl',0),
	(24,'Face Pull',0),
	(25,'Seated Dumbbell Clean',0),
	(26,'Overhead Press',0),
	(27,'Romanian Deadlift',1),
	(28,'Dumbbell Stepup',1),
	(29,'Swiss Ball Leg Curl',1),
	(30,'Bodyweight Calf Raise',1),
	(31,'Kettlebell Swing',1),
	(32,'Barbell Hip Thrust',1),
	(33,'Suspension Trainer Leg Curl',1),
	(34,'Overhead Lunge',1),
	(35,'Bent Leg V-Up',2),
	(36,'Alternating Toe Reach',2),
	(37,'Russian Twist',2),
	(38,'Cross Mountain Climbers',2),
	(39,'Bicycle Crunch',2),
	(40,'Swiss Ball Crunch',2),
	(41,'Dip/Leg Raise Combo',2),
	(42,'Horizontal Cable Woodchop',2),
	(43,'Side Plank',2),
	(44,'Band Bent-Over Row',3),
	(45,'Renegade Row',3),
	(46,'Dumbbell Single Arm Row',3),
	(47,'Rowing Machine',3),
	(48,'Lat Pulldown',3),
	(49,'Inverted Row',3),
	(50,'Burpees',3),
	(51,'Lying Lateral Raise',3),
	(52,'Hang Clean',3);

/*!40000 ALTER TABLE `exercise` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table temp_exercises
# ------------------------------------------------------------

DROP VIEW IF EXISTS `temp_exercises`;

CREATE TABLE `temp_exercises` (
   `exercise_id` INT(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM;



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `goal_weight` int(11) DEFAULT NULL,
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `curr_weight` int(11) DEFAULT NULL,
  `daily_cals` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`user_id`, `name`, `username`, `password`, `goal_weight`, `start_date`, `curr_weight`, `daily_cals`)
VALUES
	(1,'Kiara Boone','kb','kb',130,'2019-12-03 01:00:00',135,0),
	(2,'Lynn Jordan','kljb','pass',145,'2019-12-03 00:00:00',140,0),
	(3,'Kaedon Hamm','khamm','pass',178,'2019-12-05 00:00:00',167,0),
	(4,'Sarah','sb','sb',105,'2019-12-03 00:00:00',100,0),
	(5,'Pull More','pullmore','pass',120,'2019-12-03 00:00:00',100,0);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table we_table
# ------------------------------------------------------------

DROP TABLE IF EXISTS `we_table`;

CREATE TABLE `we_table` (
  `workout_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  KEY `e_id` (`exercise_id`),
  KEY `w_id` (`workout_id`),
  CONSTRAINT `w_id` FOREIGN KEY (`workout_id`) REFERENCES `workout` (`workout_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `we_table` WRITE;
/*!40000 ALTER TABLE `we_table` DISABLE KEYS */;

INSERT INTO `we_table` (`workout_id`, `exercise_id`)
VALUES
	(52,22),
	(52,18),
	(52,24),
	(52,2),
	(52,6),
	(52,7),
	(52,26),
	(52,5),
	(52,23),
	(52,25),
	(52,8),
	(52,21),
	(53,24),
	(53,23),
	(53,18),
	(53,6),
	(53,5),
	(53,21),
	(53,40),
	(53,37),
	(53,15),
	(53,38),
	(53,42),
	(53,13),
	(54,2),
	(54,18),
	(54,6),
	(54,23),
	(54,21),
	(54,22),
	(54,5),
	(54,26),
	(54,7),
	(54,25),
	(54,8),
	(54,24);

/*!40000 ALTER TABLE `we_table` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table workout
# ------------------------------------------------------------

DROP TABLE IF EXISTS `workout`;

CREATE TABLE `workout` (
  `workout_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`workout_id`),
  KEY `u_id` (`user_id`),
  CONSTRAINT `u_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `workout` WRITE;
/*!40000 ALTER TABLE `workout` DISABLE KEYS */;

INSERT INTO `workout` (`workout_id`, `name`, `user_id`)
VALUES
	(52,'Super Strength',1),
	(53,'Bi-weekly',1),
	(54,'I pUULL',1);

/*!40000 ALTER TABLE `workout` ENABLE KEYS */;
UNLOCK TABLES;




# Replace placeholder table for temp_exercises with correct view syntax
# ------------------------------------------------------------

DROP TABLE `temp_exercises`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `temp_exercises`
AS SELECT
   `exercise`.`exercise_id` AS `exercise_id`
FROM `exercise` where (`exercise`.`muscle` = 0) order by rand() limit 12;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
