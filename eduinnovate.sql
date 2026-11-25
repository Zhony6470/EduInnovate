-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-02-2025 a las 12:40:31
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `eduinnovate`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anuncios`
--

CREATE TABLE `anuncios` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `contenido` text NOT NULL,
  `fecha_publicacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `anuncios`
--

INSERT INTO `anuncios` (`id`, `titulo`, `contenido`, `fecha_publicacion`) VALUES
(9, 'Bienvenidos', 'Bienvenidos esta es la sección de anuncios', '2024-08-18 00:16:51'),
(10, 'Importante', 'Hola', '2024-09-12 23:59:22'),
(26, 'hola', 'cvxvxvxv', '2024-09-13 00:52:11'),
(27, 'hola', 'cvxvxvxv', '2024-09-13 00:52:13'),
(28, 'hola', 'cvxvxvxv', '2024-09-13 00:52:14'),
(29, 'hola', 'cvxvxvxv', '2024-09-13 00:52:14'),
(32, 'hola', 'cvxvxvxv', '2024-09-13 00:52:14'),
(33, 'hola', 'cvxvxvxv', '2024-09-13 00:52:15'),
(35, 'hola', 'cvxvxvxv', '2024-09-13 00:52:15'),
(36, 'hola', 'cvxvxvxv', '2024-09-13 00:52:15'),
(37, 'hola', 'cvxvxvxv', '2024-09-13 00:52:15'),
(38, 'hola', 'cvxvxvxv', '2024-09-13 00:52:16'),
(39, 'hola', 'cvxvxvxv', '2024-09-13 00:52:16'),
(41, 'hola', 'cvxvxvxv', '2024-09-13 00:52:27'),
(48, 'Importante', 'fsfslkfsñkjfdñkf', '2024-09-13 01:18:53'),
(49, 'hola', 'sdfsdfsdff', '2024-09-13 01:19:14'),
(55, 'sadsa', 'asdasd', '2024-09-13 01:43:27'),
(66, 'sad', 'adasd', '2024-09-13 19:05:18'),
(67, 'Hola', 'Bienvenid@', '2024-09-13 19:33:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carreras`
--

CREATE TABLE `carreras` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carreras`
--

INSERT INTO `carreras` (`id`, `nombre`) VALUES
(1, 'Ingenieria en Informática'),
(2, 'Sistemas'),
(3, 'Telemática');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrera_estudiantes`
--

CREATE TABLE `carrera_estudiantes` (
  `id` int(11) NOT NULL,
  `estudiante_id` int(11) NOT NULL,
  `carrera_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrera_estudiantes`
--

INSERT INTO `carrera_estudiantes` (`id`, `estudiante_id`, `carrera_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 4, 2),
(4, 3, 2),
(6, 4, 3),
(7, 3, 3),
(8, 2, 3),
(9, 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coordinadores`
--

CREATE TABLE `coordinadores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `cedula` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `coordinadores`
--

INSERT INTO `coordinadores` (`id`, `nombre`, `apellido`, `cedula`, `email`, `telefono`, `password`) VALUES
(2, 'Anthony', 'Gómez', '30694129', 'gomezanthonydavid@gmail.com', '04125123654', '$2y$10$S9ogIiSGuapIHKd.4n3sJujhZNZP.s5AK00zZWjeFga.7jgbX6poi');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `carrera_id` int(11) NOT NULL,
  `profesor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id`, `nombre`, `carrera_id`, `profesor_id`) VALUES
(7, 'Programación', 1, 3),
(8, 'Matematica', 2, 3),
(9, 'Base de datos', 1, 3),
(10, 'Matematica', 1, 4),
(12, 'Proyecto sociotecnológico', 3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `id` int(11) NOT NULL,
  `cedula` varchar(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`id`, `cedula`, `nombre`, `apellido`, `email`, `telefono`, `password`) VALUES
(1, '30694129', 'Anthony', 'Gómez', 'gomezanthonydavid@gmail.com', '04125123654', '$2y$10$9yKobGCRJqjRHf0idXFM..Hjdd2tMw9.ew8hd.zdftWu/e8aghjnu'),
(2, '30694029', 'David', 'Herrera', 'anthonydavidgomez72@gmail.com', '04263505265', '$2y$10$NMz/hYnbigLwhy7x1/Qv6ucMtujBQP/nM2t8CwUWQAc5oxUFMg4TK'),
(3, '12281228', 'Luis', 'Niazoa', 'luisniazoa@gmail.com', '04145076501', '$2y$10$pV0RIImNLjZa1bi3pG/fLO8c4yy5cmJFeLr4aufGjNVnz8jaEG40y'),
(4, '13644404', 'José', 'Gómez', 'joseantgomez1975@gmail.com', '04160552411', '$2y$10$OjabgyaDGftHj8FOo1KMqOFUnJrNcQClJe93Rq.rG7zssH1A8GKma');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id` int(11) NOT NULL,
  `curso_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `mensaje` text DEFAULT NULL,
  `archivo` varchar(255) DEFAULT NULL,
  `nombre_remitente` varchar(255) DEFAULT NULL,
  `fecha_hora` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`id`, `curso_id`, `usuario_id`, `mensaje`, `archivo`, `nombre_remitente`, `fecha_hora`) VALUES
(220, 7, 3, 'Bienvenidos al curso de Programación', NULL, 'Anthony Gómez', '2024-08-17 20:18:55'),
(222, 7, 3, 'Base de datos', 'eduinnovate (3).sql', 'Anthony Gómez', '2024-08-17 20:19:40'),
(434, 9, 2, 'hola', NULL, 'David Herrera', '2024-08-18 12:55:25'),
(464, 9, 2, 'h', NULL, 'David Herrera', '2024-08-18 13:47:35'),
(465, 7, 1, 'Hola', NULL, 'Anthony Gómez', '2024-09-09 11:04:52'),
(466, 7, 3, 'sfsfsf', NULL, 'Anthony Gómez', '2024-09-13 12:21:59'),
(467, 7, 3, 'zxzx<', NULL, 'Anthony Gómez', '2024-09-13 12:22:50'),
(468, 7, 3, 'adsadasd', NULL, 'Anthony Gómez', '2024-09-13 12:33:56'),
(469, 7, 3, 'hola', NULL, 'Anthony Gómez', '2024-09-13 13:33:23'),
(470, 7, 3, 'asdasd', NULL, 'Anthony Gómez', '2024-09-13 13:34:19'),
(471, 7, 3, 'hola mundo', NULL, 'Anthony Gómez', '2024-09-13 13:36:39'),
(472, 7, 3, 'hola mundo', NULL, 'Anthony Gómez', '2024-09-13 13:41:01'),
(473, 7, 3, 'hola mundo', NULL, 'Anthony Gómez', '2024-09-13 13:44:21'),
(474, 7, 3, 'sfdsdfsf', NULL, 'Anthony Gómez', '2024-09-13 13:48:13'),
(475, 7, 3, 'sfdfd', NULL, 'Anthony Gómez', '2024-09-13 13:48:23'),
(476, 7, 3, 'dfsfd', NULL, 'Anthony Gómez', '2024-09-13 13:52:28'),
(477, 7, 3, 'asdads', NULL, 'Anthony Gómez', '2024-09-13 14:04:10'),
(478, 7, 2, 'hola mundo', NULL, 'David Herrera', '2024-09-13 14:34:31'),
(479, 7, 2, 'asas', NULL, 'David Herrera', '2024-09-13 14:36:01'),
(480, 7, 2, 'asdasdsd', NULL, 'David Herrera', '2024-09-13 14:41:54'),
(481, 7, 2, 'gfghh', NULL, 'David Herrera', '2024-09-13 14:42:56'),
(482, 7, 2, 'asdasd', NULL, 'David Herrera', '2024-09-13 15:03:57'),
(483, 7, 2, 'asdad', NULL, 'David Herrera', '2024-09-13 15:04:07'),
(484, 7, 2, 'asdsad', NULL, 'David Herrera', '2024-09-13 15:04:55'),
(485, 7, 3, 'asdads', NULL, 'Anthony Gómez', '2024-09-13 15:06:25'),
(486, 7, 3, 'ljkl', NULL, 'Anthony Gómez', '2024-09-13 15:07:44'),
(487, 7, 3, ',jhljj', NULL, 'Anthony Gómez', '2024-09-13 15:09:45'),
(488, 7, 2, 'asdasd', NULL, 'David Herrera', '2024-09-13 15:26:23'),
(489, 7, 2, 'asdasd', NULL, 'David Herrera', '2024-09-13 15:27:16'),
(490, 7, 2, 'asdasd', NULL, 'David Herrera', '2024-09-13 15:32:34'),
(491, 7, 3, 'Hola', NULL, 'Anthony Gómez', '2024-09-13 15:34:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `cedula` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` (`id`, `nombre`, `apellido`, `cedula`, `email`, `telefono`, `password`) VALUES
(3, 'Anthony', 'Gómez', '30694029', 'gomezanthonydavid@gmail.com', '04125123654', '$2y$10$IKT6FBlLJu.Y5oY5bwCIoupZ94Taz3Lc4wOixnwGYNjruDOSW3WZS'),
(4, 'David', 'Herrera', '30694129', 'anthonydavidgomez72@gmail.com', '04263505265', '$2y$10$OtSjfjwiHEbe/JoZHt6AoeQWt3IxL9KUjH13KCBsW7hIvb.GQwyre');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `anuncios`
--
ALTER TABLE `anuncios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `carreras`
--
ALTER TABLE `carreras`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `carrera_estudiantes`
--
ALTER TABLE `carrera_estudiantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `estudiante_id` (`estudiante_id`),
  ADD KEY `carrera_id` (`carrera_id`);

--
-- Indices de la tabla `coordinadores`
--
ALTER TABLE `coordinadores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula` (`cedula`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carrera_id` (`carrera_id`);

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula` (`cedula`),
  ADD UNIQUE KEY `correo` (`email`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `curso_id` (`curso_id`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula` (`cedula`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `anuncios`
--
ALTER TABLE `anuncios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de la tabla `carreras`
--
ALTER TABLE `carreras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `carrera_estudiantes`
--
ALTER TABLE `carrera_estudiantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `coordinadores`
--
ALTER TABLE `coordinadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=492;

--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrera_estudiantes`
--
ALTER TABLE `carrera_estudiantes`
  ADD CONSTRAINT `carrera_estudiantes_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carrera_estudiantes_ibfk_2` FOREIGN KEY (`carrera_id`) REFERENCES `carreras` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD CONSTRAINT `cursos_ibfk_1` FOREIGN KEY (`carrera_id`) REFERENCES `carreras` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `cursos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
