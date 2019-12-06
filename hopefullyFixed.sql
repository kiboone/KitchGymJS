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

-- Dumping data for table kitchgym.cal_tracker: ~2 rows (approximately)
/*!40000 ALTER TABLE `cal_tracker` DISABLE KEYS */;
REPLACE INTO `cal_tracker` (`c_id`, `user_calories`, `date`, `u_id`) VALUES
	(1, 2000, NULL, NULL),
	(41, 0, '2019-12-03', 2);
/*!40000 ALTER TABLE `cal_tracker` ENABLE KEYS */;

-- Dumping structure for table kitchgym.exercise
CREATE TABLE IF NOT EXISTS `exercise` (
  `exercise_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `muscle` int(11) DEFAULT NULL,
  PRIMARY KEY (`exercise_id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;

-- Dumping data for table kitchgym.exercise: ~51 rows (approximately)
/*!40000 ALTER TABLE `exercise` DISABLE KEYS */;
REPLACE INTO `exercise` (`exercise_id`, `name`, `muscle`) VALUES
	(2, 'Bicep Curls', 0),
	(3, 'Lunges', 1),
	(4, 'Seated Cable Row', 3),
	(5, 'Wall Pushup', 0),
	(6, 'Ring Dips', 0),
	(7, 'Axe Hold', 0),
	(8, 'Pull-ups', 0),
	(9, 'Front Squat', 1),
	(10, 'Walking Lunges', 1),
	(11, 'High Knees', 1),
	(12, 'Run', 1),
	(13, 'Crunches', 2),
	(14, 'Flutter Kicks', 2),
	(15, 'Plank', 2),
	(16, 'Chin-ups', 3),
	(17, 'Deadlift', 3),
	(18, 'Tricep Curls', 0),
	(19, 'Wall-sits', 1),
	(20, 'Sit-ups', 2),
	(21, 'Hammer Curl', 0),
	(22, 'Neutral-Grip Triceps Extension', 0),
	(23, 'Preacher Curl', 0),
	(24, 'Face Pull', 0),
	(25, 'Seated Dumbbell Clean', 0),
	(26, 'Overhead Press', 0),
	(27, 'Romanian Deadlift', 1),
	(28, 'Dumbbell Stepup', 1),
	(29, 'Swiss Ball Leg Curl', 1),
	(30, 'Bodyweight Calf Raise', 1),
	(31, 'Kettlebell Swing', 1),
	(32, 'Barbell Hip Thrust', 1),
	(33, 'Suspension Trainer Leg Curl', 1),
	(34, 'Overhead Lunge', 1),
	(35, 'Bent Leg V-Up', 2),
	(36, 'Alternating Toe Reach', 2),
	(37, 'Russian Twist', 2),
	(38, 'Cross Mountain Climbers', 2),
	(39, 'Bicycle Crunch', 2),
	(40, 'Swiss Ball Crunch', 2),
	(41, 'Dip/Leg Raise Combo', 2),
	(42, 'Horizontal Cable Woodchop', 2),
	(43, 'Side Plank', 2),
	(44, 'Band Bent-Over Row', 3),
	(45, 'Renegade Row', 3),
	(46, 'Dumbbell Single Arm Row', 3),
	(47, 'Rowing Machine', 3),
	(48, 'Lat Pulldown', 3),
	(49, 'Inverted Row', 3),
	(50, 'Burpees', 3),
	(51, 'Lying Lateral Raise', 3),
	(52, 'Hang Clean', 3);
/*!40000 ALTER TABLE `exercise` ENABLE KEYS */;

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

-- Dumping data for table kitchgym.user: ~6 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
REPLACE INTO `user` (`user_id`, `name`, `username`, `password`, `goal_weight`, `start_date`, `curr_weight`, `daily_cals`) VALUES
	(1, 'Kiara Boone', 'kb', 'kb', 130, '2019-12-06', 135, 0),
	(2, 'Lynn Jordan', 'kljb', 'pass', 145, '2019-12-06', 140, 0),
	(13, 'Kaedon Hamm', 'khamm', 'pass', 170, '2019-12-06', 165, 0),
	(14, 'Tristen Ferrara', 'tferrara', 'pass', 175, '2019-12-06', 165, 0),
	(15, 'Jared Rice', 'jrice', 'pass', 140, '2019-12-06', 165, 0),
	(16, 'Jeff Manassa', 'jmanassa', 'pass', 180, '2019-12-06', 200, 0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Dumping structure for table kitchgym.we_table
CREATE TABLE IF NOT EXISTS `we_table` (
  `workout_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  KEY `e_id` (`exercise_id`),
  KEY `w_id` (`workout_id`),
  CONSTRAINT `w_id` FOREIGN KEY (`workout_id`) REFERENCES `workout` (`workout_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table kitchgym.we_table: ~36 rows (approximately)
/*!40000 ALTER TABLE `we_table` DISABLE KEYS */;
REPLACE INTO `we_table` (`workout_id`, `exercise_id`) VALUES
	(52, 22),
	(52, 18),
	(52, 24),
	(52, 2),
	(52, 6),
	(52, 7),
	(52, 26),
	(52, 5),
	(52, 23),
	(52, 25),
	(52, 8),
	(52, 21),
	(53, 24),
	(53, 23),
	(53, 18),
	(53, 6),
	(53, 5),
	(53, 21),
	(53, 40),
	(53, 37),
	(53, 15),
	(53, 38),
	(53, 42),
	(53, 13),
	(54, 2),
	(54, 18),
	(54, 6),
	(54, 23),
	(54, 21),
	(54, 22),
	(54, 5),
	(54, 26),
	(54, 7),
	(54, 25),
	(54, 8),
	(54, 24);
/*!40000 ALTER TABLE `we_table` ENABLE KEYS */;

-- Dumping structure for table kitchgym.workout
CREATE TABLE IF NOT EXISTS `workout` (
  `workout_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`workout_id`),
  KEY `u_id` (`user_id`),
  CONSTRAINT `u_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;

-- Dumping data for table kitchgym.workout: ~3 rows (approximately)
/*!40000 ALTER TABLE `workout` DISABLE KEYS */;
REPLACE INTO `workout` (`workout_id`, `name`, `user_id`) VALUES
	(52, 'Super Strength', 1),
	(53, 'Bi-weekly', 1),
	(54, 'I pUULL', 1);
/*!40000 ALTER TABLE `workout` ENABLE KEYS */;

-- Dumping structure for view kitchgym.temp_exercises
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `temp_exercises`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `temp_exercises` AS SELECT exercise_id FROM exercise WHERE exercise.muscle= 3 ORDER BY RAND() LIMIT 3 ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
