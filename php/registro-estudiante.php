<?php

// Cargar la conexión centralizada a la base de datos.
require_once __DIR__ . "/connection.php";

// Obtener datos del formulario.
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$cedula = $_POST['cedula'];
$email = $_POST['email'];
$telefono = $_POST['telefono'];
$password = $cedula; // Usar la cédula como contraseña.
$hashed_password = password_hash($password, PASSWORD_DEFAULT); // Hash de la contraseña.

// Comprobar si la cédula o el correo ya están registrados.
$check_sql = "SELECT * FROM estudiantes WHERE cedula = ? OR email = ?";
$stmt = $conn->prepare($check_sql);
$stmt->bind_param("ss", $cedula, $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo "El estudiante ya está registrado.";
} else {
    // Insertar estudiante.
    $sql = "INSERT INTO estudiantes (nombre, apellido, cedula, email, telefono, password) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssss", $nombre, $apellido, $cedula, $email, $telefono, $hashed_password);

    if ($stmt->execute()) {
        echo "Estudiante registrado exitosamente.";
    } else {
        error_log("Error al registrar estudiante: " . $stmt->error);
        http_response_code(500);
        echo "No se pudo registrar el estudiante.";
    }
}

// Cerrar la declaración y la conexión.
$stmt->close();
$conn->close();
