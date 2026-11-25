<?php
header('Content-Type: application/json');

// Conectar a la base de datos
require 'connection.php';

// Verificar que la solicitud es una POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $accion = $_POST['accion'] ?? '';

    if ($accion === 'cargar') {
        // Aquí puedes ajustar la consulta según tu estructura de base de datos
        $query = "SELECT id, mensaje FROM mensajes ORDER BY fecha DESC";
        $result = $conn->query($query);

        // Verificar si la consulta se ejecutó correctamente
        if ($result === false) {
            echo json_encode(['error' => 'Error en la consulta']);
            exit();
        }

        $mensajes = [];
        while ($row = $result->fetch_assoc()) {
            $mensajes[] = $row;
        }

        echo json_encode($mensajes);
    } else {
        echo json_encode(['error' => 'Acción no válida']);
    }
} else {
    echo json_encode(['error' => 'Método no permitido']);
}
?>
