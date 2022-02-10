-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 10, 2022 at 07:31 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jti_test_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

CREATE TABLE `data` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `is_even` tinyint(1) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`id`, `phone`, `provider`, `is_even`, `created_by`, `created_at`, `updated_at`) VALUES
('228a13d9-01a8-4b09-bec3-2967d3811f47', 'F3Nq8b0FJ1U27WU7WnffvQ==', 'zYspfUjmAYlbeVKyIiykuWJTSNKB9w0Q/+3dog1DjOyjL8aWLe9NL67JKm9IkEbdzqfhtrSl+hjwtIAj/IDRCA==', 0, 'TWnvyHuGulid7dqFx74qoA==', '2022-02-10 17:48:18', '2022-02-10 17:48:18'),
('992a1332-ab77-46bc-bdde-e6c52912c9db', 'v5AKDMl+2GNoIM5Kcpm8Kw==', 'zYspfUjmAYlbeVKyIiykuWJTSNKB9w0Q/+3dog1DjOyjL8aWLe9NL67JKm9IkEbdzqfhtrSl+hjwtIAj/IDRCA==', 1, 'TWnvyHuGulid7dqFx74qoA==', '2022-02-10 17:48:26', '2022-02-10 17:48:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
