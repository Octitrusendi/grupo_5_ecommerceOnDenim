-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-02-2023 a las 20:32:32
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ondenim_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Skinny slim fit'),
(2, 'Slim fit'),
(3, 'nueva');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orderitems`
--

CREATE TABLE `orderitems` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orderitems`
--

INSERT INTO `orderitems` (`id`, `orderId`, `productId`, `name`, `price`, `quantity`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 1, 'Jean 3', '180.00', 1, '2023-02-20 17:30:02', '2023-02-20 17:30:02', NULL),
(2, 2, 1, 'Jean 3', '180.00', 1, '2023-02-20 18:20:52', '2023-02-20 18:20:52', NULL),
(3, 3, 1, 'Jean 3', '180.00', 1, '2023-02-20 18:21:04', '2023-02-20 18:21:04', NULL),
(4, 4, 1, 'Jean 3', '180.00', 1, '2023-02-20 18:21:05', '2023-02-20 18:21:05', NULL),
(5, 5, 37, 'Jean Final Prueba', '29160.00', 2, '2023-02-20 19:23:33', '2023-02-20 19:23:33', NULL),
(6, 5, 1, 'Jean 3', '180.00', 18, '2023-02-20 19:23:33', '2023-02-20 19:23:33', NULL),
(7, 6, 1, 'Jean 3', '180.00', 1, '2023-02-20 19:27:52', '2023-02-20 19:27:52', NULL),
(8, 6, 37, 'Jean Final Prueba', '29160.00', 1, '2023-02-20 19:27:52', '2023-02-20 19:27:52', NULL),
(9, 7, 37, 'Jean Final Prueba', '29160.00', 1, '2023-02-20 19:29:34', '2023-02-20 19:29:34', NULL),
(10, 7, 1, 'Jean 3', '180.00', 1, '2023-02-20 19:29:34', '2023-02-20 19:29:34', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `paymentMethod` varchar(25) NOT NULL,
  `shippingMethod` varchar(25) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `userId`, `total`, `paymentMethod`, `shippingMethod`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 7, '180.00', 'Efectivo', 'Cadete', '2023-02-20 17:30:02', '2023-02-20 17:30:02', NULL),
(2, 7, '180.00', 'Efectivo', 'Andreani', '2023-02-20 18:20:52', '2023-02-20 18:20:52', NULL),
(3, 7, '180.00', 'Efectivo', 'Andreani', '2023-02-20 18:21:04', '2023-02-20 18:21:04', NULL),
(4, 7, '180.00', 'Efectivo', 'Andreani', '2023-02-20 18:21:05', '2023-02-20 18:21:05', NULL),
(5, 7, '61560.00', 'Efectivo', 'DHL', '2023-02-20 19:23:33', '2023-02-20 19:23:33', NULL),
(6, 7, '29340.00', 'Efectivo', 'Correo', '2023-02-20 19:27:52', '2023-02-20 19:27:52', NULL),
(7, 7, '29340.00', 'Débito', 'Correo', '2023-02-20 19:29:34', '2023-02-20 19:29:34', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `sale` int(11) NOT NULL,
  `image` varchar(256) DEFAULT NULL,
  `id_category` int(11) NOT NULL,
  `price` int(10) NOT NULL,
  `stock` int(11) NOT NULL,
  `newCollection` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `sale`, `image`, `id_category`, `price`, `stock`, `newCollection`) VALUES
(1, 'Jean 3', 'Jean Slim fit, tiro medio, con botones y avíos metálicos personalizados. Tela: Denim Confort 99% algodón, 1% spandex. Lavado: Stone wash con localizado y bigotes. Este artículo pertenece a la línea Casual. Industria Argentina.', 10, 'jean1.jpg', 3, 200, 10, 1),
(37, 'Jean Final Prueba', 'prueba descripcion', 10, 'image1676920588649.jpg', 1, 32400, 100, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productstalles`
--

CREATE TABLE `productstalles` (
  `id` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_talles` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productstalles`
--

INSERT INTO `productstalles` (`id`, `id_product`, `id_talles`) VALUES
(1, 1, 1),
(2, 1, 2),
(25, 37, 3),
(26, 37, 1),
(27, 37, 5),
(28, 37, 4),
(29, 37, 2),
(30, 37, 6),
(31, 37, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `talles`
--

CREATE TABLE `talles` (
  `id` int(11) NOT NULL,
  `talles` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `talles`
--

INSERT INTO `talles` (`id`, `talles`) VALUES
(1, '36'),
(2, '38'),
(3, '40'),
(4, '42'),
(5, '44'),
(6, '46'),
(7, '48'),
(8, '50'),
(9, '52'),
(10, '54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `usuario` varchar(256) NOT NULL,
  `fullName` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `id_level` int(11) NOT NULL,
  `avatar` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `usuario`, `fullName`, `email`, `password`, `id_level`, `avatar`) VALUES
(3, 'pancho', 'francisco zelalia', 'pancho.dv3@gmail.com', '$2a$10$iNhNQULsD5E7lMqhEL6lc.BsizepvAnoQ/a4BWM4EFG/Al6mTgCCa', 0, 'default-image.png'),
(4, 'julito', 'julian', 'julitro@gmail.com', '$2a$10$ua3blR4vDZC55tzF.WSv.O8kUqjA2oWvcvHV.d8vTVf/O6lyiBs5e', 0, 'default-image.png'),
(7, 'Octaviotrusendi', 'Octaviotrusendi2', 'octaviotrusendi2@gmail.com', '$2a$10$.ZCK2c1faToVAwsQmL2P3ecgIhOmtBHP8F1UIuQrPrNKM.M19LCna', 0, 'default-image.png'),
(8, 'octa', 'prueba', 'octaviotrusendi@gmail.com', '$2a$10$bR5HOo3K9jQZNdiFmriM.eEyKAEl..SiSGR8iEmA.ElYsB2Io8MBi', 0, 'default-image.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `productId` (`productId`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_categorie_id_foreign` (`id_category`);

--
-- Indices de la tabla `productstalles`
--
ALTER TABLE `productstalles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_talle_product_id_foreign` (`id_product`),
  ADD KEY `product_talle_talles_id_foreign` (`id_talles`);

--
-- Indices de la tabla `talles`
--
ALTER TABLE `talles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `productstalles`
--
ALTER TABLE `productstalles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orderitems`
--
ALTER TABLE `orderitems`
  ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `productstalles`
--
ALTER TABLE `productstalles`
  ADD CONSTRAINT `product_talle_product_id_foreign` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `product_talle_talles_id_foreign` FOREIGN KEY (`id_talles`) REFERENCES `talles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
