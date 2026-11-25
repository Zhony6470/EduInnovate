<?php
session_start();
include 'connection.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $accion = $_POST['accion'];

    switch ($accion) {
        case 'eliminar_mensaje':
            $mensaje_id = $_POST['mensaje_id'];
            
            // Eliminar el mensaje
            $sql = "DELETE FROM mensajes WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('i', $mensaje_id);
            if ($stmt->execute()) {
                echo json_encode(['success' => 'Mensaje eliminado correctamente']);
            } else {
                echo json_encode(['error' => 'Error al eliminar el mensaje: ' . $conn->error]);
            }
            $stmt->close();
            break;
        
        default:
            echo json_encode(['error' => 'Acción no válida']);
            break;
    }

    $conn->close();
}
?>
