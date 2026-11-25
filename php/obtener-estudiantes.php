<?php
// Mostrar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Incluir archivo de conexión
include 'connection.php';

// Obtener cédula desde parámetros GET, si existe
$cedula = isset($_GET['cedula']) ? $_GET['cedula'] : null;

// Consulta para obtener datos del estudiante
if ($cedula) {
    // Si se proporciona una cédula, obtener solo ese estudiante
    $sql = "SELECT cedula, nombre, apellido, email, telefono FROM estudiantes WHERE cedula = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $cedula);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $student = $result->fetch_assoc();
        // Enviar datos en formato JSON
        header('Content-Type: application/json');
        echo json_encode($student);
    } else {
        // Enviar un array vacío si no se encuentra el estudiante
        header('Content-Type: application/json');
        echo json_encode([]);
    }

    $stmt->close();
} else {
    // Si no se proporciona cédula, obtener todos los estudiantes
    $sql = "SELECT cedula, nombre, apellido, email, telefono FROM estudiantes";
    $result = $conn->query($sql);

    $students = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $students[] = $row;
        }
    }

    // Enviar datos en formato JSON
    header('Content-Type: application/json');
    echo json_encode($students);
}

// Cerrar la conexión
$conn->close();
?>
