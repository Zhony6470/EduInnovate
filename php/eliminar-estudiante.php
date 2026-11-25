<?php
// Mostrar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Incluir archivo de conexión
include 'connection.php';

// Obtener la cédula del estudiante a eliminar
$cedula = $_GET['cedula'];

// Preparar y ejecutar la consulta para eliminar el estudiante
$sql = "DELETE FROM estudiantes WHERE cedula = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $cedula);

if ($stmt->execute()) {
    echo "Estudiante eliminado exitosamente.";
} else {
    echo "Error al eliminar el estudiante: " . $stmt->error;
}

// Cerrar declaración y conexión
$stmt->close();
$conn->close();
?>
