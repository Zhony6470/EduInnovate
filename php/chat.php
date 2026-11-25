<?php
include 'connection.php';

header('Content-Type: application/json');
session_start(); // Inicia la sesión para acceder a `profesor_id`

$accion = $_POST['accion'];

if ($accion === 'cargar_mensajes') {
    $curso_id = $_POST['curso_id'];

    $query = "SELECT * FROM mensajes WHERE curso_id = ? ORDER BY fecha_hora DESC LIMIT 50";
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("i", $curso_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $mensajes = [];

        while ($row = $result->fetch_assoc()) {
            $mensajes[] = $row;
        }

        echo json_encode($mensajes);
    } else {
        echo json_encode(['error' => 'Error en la preparación de la consulta']);
    }
} elseif ($accion === 'enviar_mensaje') {
    $curso_id = $_POST['curso_id'];
    $mensaje = $_POST['mensaje'];
    $archivo = isset($_FILES['archivo']) ? $_FILES['archivo'] : null;
    $profesor_id = $_SESSION['profesor_id'];

    // Obtener el nombre y apellido del profesor desde la base de datos
    $query_nombre = "SELECT nombre, apellido FROM profesores WHERE id = ?";
    if ($stmt_nombre = $conn->prepare($query_nombre)) {
        $stmt_nombre->bind_param("i", $profesor_id);
        $stmt_nombre->execute();
        $result_nombre = $stmt_nombre->get_result();
        $profesor = $result_nombre->fetch_assoc();
        $nombre_remitente = $profesor['nombre'] . ' ' . $profesor['apellido'];
    } else {
        echo json_encode(['error' => 'Error en la preparación de la consulta del nombre']);
        exit;
    }

    // Mover archivo a la carpeta de uploads
    if ($archivo && $archivo['error'] === UPLOAD_ERR_OK) {
        $upload_dir = '../uploads/';
        $file_name = basename($archivo['name']);
        $upload_file = $upload_dir . $file_name;
        move_uploaded_file($archivo['tmp_name'], $upload_file);
    } else {
        $file_name = null;
    }

    $query = "INSERT INTO mensajes (curso_id, usuario_id, mensaje, archivo, nombre_remitente, fecha_hora) VALUES (?, ?, ?, ?, ?, NOW())";
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("iisss", $curso_id, $profesor_id, $mensaje, $file_name, $nombre_remitente);
        $success = $stmt->execute();

        echo json_encode(['success' => $success]);
    } else {
        echo json_encode(['error' => 'Error en la preparación de la consulta de inserción']);
    }
} elseif ($accion === 'eliminar_mensaje') {
    $mensaje_id = $_POST['mensaje_id'];

    $query = "DELETE FROM mensajes WHERE id = ?";
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("i", $mensaje_id);
        $success = $stmt->execute();

        echo json_encode(['success' => $success]);
    } else {
        echo json_encode(['error' => 'Error en la preparación de la consulta de eliminación']);
    }
} else {
    echo json_encode(['error' => 'Acción no válida']);
}
?>
