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

    // Consulta para obtener un solo profesor por cédula
    $sql = "SELECT cedula, nombre, apellido, email, telefono FROM profesores WHERE cedula = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $cedula);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $profesor = $result->fetch_assoc();
        // Enviar datos en formato JSON
        header('Content-Type: application/json');
        echo json_encode($profesor);
    } else {
        // Enviar una respuesta vacía si no se encontró el profesor
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
