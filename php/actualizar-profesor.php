<?php
// Mostrar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Incluir archivo de conexión
include 'connection.php';

// Obtener cédula desde parámetros GET
$cedula = isset($_GET['cedula']) ? $_GET['cedula'] : null;

// Obtener datos del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

if ($cedula && $data) {
    $nombre = $data['nombre'];
    $apellido = $data['apellido'];
    $email = $data['email'];
    $telefono = $data['telefono'];

    // Preparar y ejecutar la consulta para actualizar datos
    $sql = "UPDATE profesores SET nombre = ?, apellido = ?, email = ?, telefono = ? WHERE cedula = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $nombre, $apellido, $email, $telefono, $cedula);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Datos del profesor actualizados exitosamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al actualizar los datos del profesor: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Datos insuficientes para la actualización.']);
}

$conn->close();
?>
