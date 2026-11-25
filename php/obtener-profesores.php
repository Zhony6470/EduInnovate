<?php
// Mostrar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Incluir archivo de conexión
include 'connection.php';

// Obtener cédula desde parámetros GET, si existe
$cedula = isset($_GET['cedula']) ? $_GET['cedula'] : null;

// Consulta para obtener datos del profesor
if ($cedula) {
    // Si se proporciona una cédula, obtener solo ese profesor
    $sql = "SELECT cedula, nombre, apellido, email, telefono FROM profesores WHERE cedula = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $cedula);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $professor = $result->fetch_assoc();
        // Enviar datos en formato JSON
        header('Content-Type: application/json');
        echo json_encode($professor);
    } else {
        // Enviar un array vacío si no se encuentra el profesor
        header('Content-Type: application/json');
        echo json_encode([]);
    }

    $stmt->close();
} else {
    // Si no se proporciona cédula, obtener todos los profesores
    $sql = "SELECT cedula, nombre, apellido, email, telefono FROM profesores";
    $result = $conn->query($sql);

    $professors = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $professors[] = $row;
        }
    }

    // Enviar datos en formato JSON
    header('Content-Type: application/json');
    echo json_encode($professors);
}

// Cerrar la conexión
$conn->close();
?>
