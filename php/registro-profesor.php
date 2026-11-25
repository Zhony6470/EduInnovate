<?php
// Mostrar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Incluir archivo de conexión
include 'connection.php';

// Obtener datos del formulario
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$cedula = $_POST['cedula'];
$email = $_POST['email'];
$telefono = $_POST['telefono'];
$password = $cedula; // Usar la cédula como contraseña
$hashed_password = password_hash($password, PASSWORD_DEFAULT); // Hash de la contraseña

// Comprobar si la cédula o el correo ya están registrados
$check_sql = "SELECT * FROM profesores WHERE cedula = ? OR email = ?";
$stmt = $conn->prepare($check_sql);
$stmt->bind_param("ss", $cedula, $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo "El profesor ya está registrado.";
} else {
    // Preparar y ejecutar la consulta para insertar datos
    $sql = "INSERT INTO profesores (nombre, apellido, cedula, email, telefono, password) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssss", $nombre, $apellido, $cedula, $email, $telefono, $hashed_password);

    if ($stmt->execute()) {
        echo "Profesor registrado exitosamente.";
    } else {
        echo "Error al registrar el profesor: " . $stmt->error;
    }
}

// Cerrar la declaración y la conexión
$stmt->close();
$conn->close();
?>
