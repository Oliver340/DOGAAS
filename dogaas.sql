-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 04, 2022 at 02:08 PM
-- Server version: 5.5.62-log
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dogaas`
--

-- --------------------------------------------------------

--
-- Table structure for table `Admins`
--

CREATE TABLE `Admins` (
  `adminName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Admins`
--

INSERT INTO `Admins` (`adminName`, `password`) VALUES
('admin', '$2a$10$hmzpx9NQpuD9pP/JOrrqseejoBhZ0l5yTClSYES1Ff9yRET9gMBgi');

-- --------------------------------------------------------

--
-- Table structure for table `Dogs`
--

CREATE TABLE `Dogs` (
  `dogID` int(11) NOT NULL,
  `imageURL` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Dogs`
--

INSERT INTO `Dogs` (`dogID`, `imageURL`) VALUES
(35, 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg'),
(37, 'https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp'),
(38, 'https://media.nature.com/lw800/magazine-assets/d41586-020-01430-5/d41586-020-01430-5_17977552.jpg'),
(39, 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2hpdGUlMjBkb2d8ZW58MHx8MHx8&w=1000&q=80'),
(42, 'https://i.ibb.co/WVDjPx0/oliverbowl.png'),
(43, 'https://www.gannett-cdn.com/presto/2020/03/17/USAT/c0eff9ec-e0e4-42db-b308-f748933229ee-XXX_ThinkstockPhotos-200460053-001.jpg?crop=1170%2C658%2Cx292%2Cy120&width=1200'),
(44, 'https://cdn.pixabay.com/photo/2017/10/26/05/15/dog-2890078_1280.jpg'),
(45, 'https://i.pinimg.com/originals/fa/41/ac/fa41ace1ab4cde11018a9b224e488806.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `EndPoints`
--

CREATE TABLE `EndPoints` (
  `endPoint` varchar(255) NOT NULL,
  `method` varchar(6) NOT NULL,
  `requestCount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `EndPoints`
--

INSERT INTO `EndPoints` (`endPoint`, `method`, `requestCount`) VALUES
('/API/v1/adminPost', 'Post', 34),
('/API/v1/dogGet', 'Get', 561),
('/API/v1/dogPost', 'Post', 36),
('/API/v1/dogTagIdDelete', 'Delete', 17),
('/API/v1/dogTagIdGet', 'Get', 2),
('/API/v1/dogTagIdPut', 'Put', 5),
('/API/v1/pingGet', 'Get', 1),
('/API/v1/userCreate', 'Post', 23),
('/API/v1/userPost', 'Post', 107),
('/API/v1/userUsernameDelete', 'Delete', 1),
('/API/v1/userUsernamePut', 'Put', 12);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `userName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`userName`, `password`) VALUES
('asdf', '$2b$10$yZlmTPm6yYFAZ1LVDu.fA./xXnQvFtc4VCfo97cNjUVV6LvwjBN/i'),
('test', '$2b$10$IeVU6U/KWWG.uNYwRuvWDON2vXOTHo8OUhi2QUOIn.9OjhRb5ziCe');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admins`
--
ALTER TABLE `Admins`
  ADD PRIMARY KEY (`adminName`);

--
-- Indexes for table `Dogs`
--
ALTER TABLE `Dogs`
  ADD PRIMARY KEY (`dogID`);

--
-- Indexes for table `EndPoints`
--
ALTER TABLE `EndPoints`
  ADD PRIMARY KEY (`endPoint`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`userName`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Dogs`
--
ALTER TABLE `Dogs`
  MODIFY `dogID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
