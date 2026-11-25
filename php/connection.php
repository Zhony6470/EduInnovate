<?php

// Leer la configuración desde variables de entorno.
$servername = getenv("EDUINNOVATE_DB_HOST") ?: "localhost";
$username = getenv("EDUINNOVATE_DB_USER");
$password = getenv("EDUINNOVATE_DB_PASSWORD");
$dbname = getenv("EDUINNOVATE_DB_NAME");
$port = (int) (getenv("EDUINNOVATE_DB_PORT") ?: 3306);

// Comprobar que las credenciales necesarias estén configuradas.
if ($username === false || $username === "" ||
    $password === false ||
    $dbname === false || $dbname === "") {
    error_log("Falta configurar las variables de entorno de la base de datos de EduInnovate.");
    http_response_code(500);
    exit("No se pudo conectar con la base de datos.");
}

// Convertir los errores de MySQLi en excepciones.
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    // Crear la conexión.
    $conn = new mysqli(
        $servername,
        $username,
        $password,
        $dbname,
        $port
    );

    // Usar UTF-8 completo para admitir caracteres especiales y emojis.
    $conn->set_charset("utf8mb4");

} catch (mysqli_sql_exception $e) {
    // Guardar los detalles técnicos únicamente en el registro del servidor.
    error_log("Error de conexión a la base de datos: " . $e->getMessage());

    // No mostrar información interna al usuario.
    http_response_code(500);
    exit("No se pudo conectar con la base de datos.");
}
