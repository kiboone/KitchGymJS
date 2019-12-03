-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.8-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping data for table kitchgym.exercise: ~51 rows (approximately)
/*!40000 ALTER TABLE `exercise` DISABLE KEYS */;
INSERT INTO `exercise` (`exercise_id`, `name`, `muscle`) VALUES
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

-- Dumping data for table kitchgym.user: ~3 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_id`, `name`, `username`, `password`, `goal_weight`, `start_date`, `curr_weight`) VALUES
	(1, 'Kiara Boone', 'kb', 'kb', 135, NULL, 140),
	(2, 'Lynn Jordan', 'kljb', 'pass', 145, NULL, 140),
	(3, 'Kaedon Hamm', 'khamm', 'pass', 178, NULL, 167);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Dumping data for table kitchgym.we_table: ~3 rows (approximately)
/*!40000 ALTER TABLE `we_table` DISABLE KEYS */;
INSERT INTO `we_table` (`workout_id`, `exercise_id`) VALUES
	(0, 2),
	(0, 3),
	(0, 16);
/*!40000 ALTER TABLE `we_table` ENABLE KEYS */;

-- Dumping data for table kitchgym.workout: ~1 rows (approximately)
/*!40000 ALTER TABLE `workout` DISABLE KEYS */;
INSERT INTO `workout` (`workout_id`, `name`, `user_id`) VALUES
	(0, 'M/W/F', 1);
/*!40000 ALTER TABLE `workout` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
