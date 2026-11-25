<?php
// Mostrar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Incluir archivo de conexión
include 'connection.php';

// Verificar si se ha pasado una cédula en la URL
if (isset($_GET['cedula'])) {
    $cedula = $_GET['cedula'];

    // Consulta para obtener un solo estudiante por cédula
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
        // Enviar una respuesta vacía si no se encontró el estudiante
        echo json_encode([]);
    }

    $stmt->close();
} else {
    // Enviar una respuesta de error si no se proporcionó una cédula
    echo json_encode(['error' => 'No se proporcionó una cédula.']);
}

// Cerrar la conexión
$conn->close();
?>
