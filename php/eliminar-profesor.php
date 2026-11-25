<?php
// Mostrar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Incluir archivo de conexión
include 'connection.php'; // Asegúrate de que connection.php esté en la misma carpeta

// Obtener la cédula del profesor a eliminar
$cedula = $_GET['cedula'];

// Preparar y ejecutar la consulta para eliminar el profesor
$sql = "DELETE FROM profesores WHERE cedula = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $cedula);

if ($stmt->execute()) {
    echo json_encode(["message" => "Profesor eliminado exitosamente."]);
} else {
    echo json_encode(["message" => "Error al eliminar el profesor: " . $stmt->error]);
}

// Cerrar declaración y conexión
$stmt->close();
$conn->close();
?>
