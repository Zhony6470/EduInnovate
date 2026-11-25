<?php
// Configuración de la base de datos
$servername = "localhost";
$username = "EduInnovate";
$password = "Ei2024.";
$dbname = "eduinnovate";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);


// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
