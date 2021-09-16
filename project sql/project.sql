-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3307
-- 產生時間： 
-- 伺服器版本： 5.7.24
-- PHP 版本： 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `member`
--
CREATE DATABASE IF NOT EXISTS `member` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `member`;

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `MemberID` int(10) NOT NULL,
  `AccountNumber` varchar(20) NOT NULL,
  `Password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `member`
--

INSERT INTO `member` (`MemberID`, `AccountNumber`, `Password`) VALUES
(1, 'abc123', 'abc456'),
(2, 'qwe123', 'qwe456'),
(1, 'abc123', 'abc456'),
(2, 'qwe123', 'qwe456');
--
-- 資料庫： `register`
--
CREATE DATABASE IF NOT EXISTS `register` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `register`;

-- --------------------------------------------------------

--
-- 資料表結構 `register`
--

CREATE TABLE `register` (
  `MemberID` int(10) NOT NULL,
  `AccountNumber` varchar(20) NOT NULL,
  `Password` varchar(20) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `CellPhone` varchar(20) NOT NULL,
  `Email` varchar(20) NOT NULL,
  `DateOfBirth` int(20) NOT NULL,
  `RegistrationDate` int(20) NOT NULL,
  `ModifiedDate` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `register`
--

INSERT INTO `register` (`MemberID`, `AccountNumber`, `Password`, `Name`, `CellPhone`, `Email`, `DateOfBirth`, `RegistrationDate`, `ModifiedDate`) VALUES
(1, 'abc123', 'abc456', '王小明', '0912345678', 'ace123@yahoo.com.tw', 19981231, 20210916, 20210916),
(2, 'qwe123', 'qwe456', '王大明', '0923456789', 'qwe123@yahoo.com.tw', 19990101, 20210916, 20210916);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`MemberID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
