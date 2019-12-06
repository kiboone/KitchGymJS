-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.10-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for kitchgym
CREATE DATABASE IF NOT EXISTS `kitchgym` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `kitchgym`;

-- Dumping structure for table kitchgym.cal_tracker
CREATE TABLE IF NOT EXISTS `cal_tracker` (
  `c_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_calories` int(11) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  `u_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table kitchgym.exercise
CREATE TABLE IF NOT EXISTS `exercise` (
  `exercise_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `muscle` int(11) DEFAULT NULL,
  PRIMARY KEY (`exercise_id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for view kitchgym.temp_exercises
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `temp_exercises` (
	`exercise_id` INT(11) NOT NULL
) ENGINE=MyISAM;

-- Dumping structure for table kitchgym.user
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `goal_weight` int(11) DEFAULT NULL,
  `start_date` varchar(50) NOT NULL,
  `curr_weight` int(11) DEFAULT NULL,
  `daily_cals` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table kitchgym.we_table
CREATE TABLE IF NOT EXISTS `we_table` (
  `workout_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  KEY `e_id` (`exercise_id`),
  KEY `w_id` (`workout_id`),
  CONSTRAINT `w_id` FOREIGN KEY (`workout_id`) REFERENCES `workout` (`workout_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table kitchgym.workout
CREATE TABLE IF NOT EXISTS `workout` (
  `workout_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`workout_id`),
  KEY `u_id` (`user_id`),
  CONSTRAINT `u_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for view kitchgym.temp_exercises
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `temp_exercises`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `temp_exercises` AS SELECT exercise_id FROM exercise WHERE exercise.muscle= 3 ORDER BY RAND() LIMIT 3 ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
