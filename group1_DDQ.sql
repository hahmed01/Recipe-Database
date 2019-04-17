-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Mar 19, 2019 at 10:26 AM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_atenj`
--

-- --------------------------------------------------------

--
-- Table structure for table `Author`
--

DROP TABLE IF EXISTS `Author`;
CREATE TABLE `Author` (
  `AuthorID` int(11) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Author`
--

INSERT INTO `Author` (`AuthorID`, `FirstName`, `LastName`, `Email`) VALUES
(1, 'King', 'Arthur', 'king@roundtable.com'),
(2, 'Betty', 'Crocker', 'betty@kitchen.com'),
(3, 'Sheela', 'Prakash', 'sheela@kitchn.com'),
(4, 'Bob', 'Cook', 'bob@cooking.com');

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
CREATE TABLE `Category` (
  `CategoryID` int(11) NOT NULL,
  `CategoryName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`CategoryID`, `CategoryName`) VALUES
(3, 'Bread'),
(8, 'Cakes'),
(7, 'Gluten Free'),
(6, 'Italian'),
(2, 'Main Dish'),
(4, 'Poultry'),
(5, 'Side Dish'),
(1, 'Vegetarian');

-- --------------------------------------------------------

--
-- Table structure for table `Courses`
--

DROP TABLE IF EXISTS `Courses`;
CREATE TABLE `Courses` (
  `CourseID` int(11) NOT NULL,
  `CourseName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Courses`
--

INSERT INTO `Courses` (`CourseID`, `CourseName`) VALUES
(1, 'Appetizers'),
(2, 'Breakfast'),
(5, 'Desserts'),
(4, 'Dinner'),
(3, 'Lunch'),
(6, 'Snacks');

-- --------------------------------------------------------

--
-- Table structure for table `Recipe`
--

DROP TABLE IF EXISTS `Recipe`;
CREATE TABLE `Recipe` (
  `RecipeID` int(11) NOT NULL,
  `RecipeTitle` varchar(100) NOT NULL,
  `CookingTime` int(11) DEFAULT NULL,
  `Servings` int(11) NOT NULL,
  `AuthorID` int(11) DEFAULT NULL,
  `CourseID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Recipe`
--

INSERT INTO `Recipe` (`RecipeID`, `RecipeTitle`, `CookingTime`, `Servings`, `AuthorID`, `CourseID`) VALUES
(1, 'Easy Cheesecake', 108, 8, 1, 4),
(2, 'Skinny Cauli Mac and Cheese', 55, 6, 2, 3),
(3, 'No-Knead Skillet Focaccia', 86, 8, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Recipe_Category`
--

DROP TABLE IF EXISTS `Recipe_Category`;
CREATE TABLE `Recipe_Category` (
  `RecipeID` int(11) NOT NULL,
  `CategoryID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Recipe_Category`
--

INSERT INTO `Recipe_Category` (`RecipeID`, `CategoryID`) VALUES
(1, 8),
(2, 1),
(2, 2),
(2, 5),
(3, 3),
(3, 6);

-- --------------------------------------------------------

--
-- Table structure for table `Recipe_Ingredients`
--

DROP TABLE IF EXISTS `Recipe_Ingredients`;
CREATE TABLE `Recipe_Ingredients` (
  `RecipeID` int(11) NOT NULL,
  `IngredientID` int(11) NOT NULL,
  `QuantityOfIngredient` double(6,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Recipe_Ingredients`
--

INSERT INTO `Recipe_Ingredients` (`RecipeID`, `IngredientID`, `QuantityOfIngredient`) VALUES
(1, 1, 9.000),
(1, 2, 1.000),
(1, 3, 0.330),
(1, 4, 0.125),
(1, 5, 2.000),
(1, 6, 2.000),
(1, 7, 0.670),
(1, 8, 1.000),
(2, 4, 0.500),
(2, 9, 1.000),
(2, 10, 2.000),
(2, 11, 1.000),
(2, 12, 1.500),
(2, 13, 3.000),
(2, 14, 1.000),
(2, 15, 0.250),
(2, 16, 0.125),
(2, 17, 2.000),
(2, 18, 0.500),
(2, 19, 1.000),
(3, 20, 2.000),
(3, 21, 0.500),
(3, 22, 0.250),
(3, 23, 2.000),
(3, 24, 8.000);

-- --------------------------------------------------------

--
-- Table structure for table `Units`
--

DROP TABLE IF EXISTS `Units`;
CREATE TABLE `Units` (
  `UnitID` int(11) NOT NULL,
  `UnitName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Units`
--

INSERT INTO `Units` (`UnitID`, `UnitName`) VALUES
(1, 'cup(s)'),
(2, 'gallon(s)'),
(9, 'none'),
(3, 'ounce(s)'),
(4, 'pint(s)'),
(5, 'pound(s)'),
(6, 'quart(s)'),
(7, 'tablespoon(s)'),
(8, 'teaspoon(s)');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Author`
--
ALTER TABLE `Author`
  ADD PRIMARY KEY (`AuthorID`);

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`CategoryID`),
  ADD UNIQUE KEY `CategoryName` (`CategoryName`);

--
-- Indexes for table `Courses`
--
ALTER TABLE `Courses`
  ADD PRIMARY KEY (`CourseID`),
  ADD UNIQUE KEY `CourseName` (`CourseName`);

--
-- Indexes for table `Recipe`
--
ALTER TABLE `Recipe`
  ADD PRIMARY KEY (`RecipeID`),
  ADD KEY `AuthorID` (`AuthorID`),
  ADD KEY `CourseID` (`CourseID`);

--
-- Indexes for table `Recipe_Category`
--
ALTER TABLE `Recipe_Category`
  ADD PRIMARY KEY (`RecipeID`,`CategoryID`),
  ADD KEY `CategoryID` (`CategoryID`);

--
-- Indexes for table `Recipe_Ingredients`
--
ALTER TABLE `Recipe_Ingredients`
  ADD PRIMARY KEY (`RecipeID`,`IngredientID`),
  ADD KEY `IngredientID` (`IngredientID`);

--
-- Indexes for table `Units`
--
ALTER TABLE `Units`
  ADD PRIMARY KEY (`UnitID`),
  ADD UNIQUE KEY `UnitName` (`UnitName`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Author`
--
ALTER TABLE `Author`
  MODIFY `AuthorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Category`
--
ALTER TABLE `Category`
  MODIFY `CategoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Courses`
--
ALTER TABLE `Courses`
  MODIFY `CourseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Recipe`
--
ALTER TABLE `Recipe`
  MODIFY `RecipeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Units`
--
ALTER TABLE `Units`
  MODIFY `UnitID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Recipe`
--
ALTER TABLE `Recipe`
  ADD CONSTRAINT `Recipe_ibfk_1` FOREIGN KEY (`AuthorID`) REFERENCES `Author` (`AuthorID`) ON DELETE CASCADE,
  ADD CONSTRAINT `Recipe_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `Courses` (`CourseID`) ON DELETE CASCADE;

--
-- Constraints for table `Recipe_Category`
--
ALTER TABLE `Recipe_Category`
  ADD CONSTRAINT `Recipe_Category_ibfk_1` FOREIGN KEY (`CategoryID`) REFERENCES `Category` (`CategoryID`) ON DELETE CASCADE,
  ADD CONSTRAINT `Recipe_Category_ibfk_2` FOREIGN KEY (`RecipeID`) REFERENCES `Recipe` (`RecipeID`) ON DELETE CASCADE;

--
-- Constraints for table `Recipe_Ingredients`
--
ALTER TABLE `Recipe_Ingredients`
  ADD CONSTRAINT `Recipe_Ingredients_ibfk_1` FOREIGN KEY (`RecipeID`) REFERENCES `Recipe` (`RecipeID`) ON DELETE CASCADE,
  ADD CONSTRAINT `Recipe_Ingredients_ibfk_2` FOREIGN KEY (`IngredientID`) REFERENCES `Ingredients` (`IngredientID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
