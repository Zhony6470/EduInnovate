<?php
include 'connection.php';

header('Content-Type: application/json');
session_start();

$accion = isset($_POST['accion']) ? $_POST['accion'] : '';

if ($accion === 'cargar_mensajes') {
    $curso_id = $_POST['curso_id'];
    $estudiante_id = $_SESSION['estudiante_id'];

    $query = "SELECT * FROM mensajes WHERE curso_id = ? ORDER BY fecha_hora DESC LIMIT 50";
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("i", $curso_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $mensajes = [];

        while ($row = $result->fetch_assoc()) {
            $row['can_delete'] = $row['usuario_id'] === $estudiante_id;
            $mensajes[] = $row;
        }

        echo json_encode($mensajes);
    } else {
        echo json_encode(['error' => 'Error en la preparación de la consulta']);
    }
} elseif ($accion === 'enviar_mensaje') {
    $curso_id = $_POST['curso_id'];
    $mensaje = isset($_POST['mensaje']) ? $_POST['mensaje'] : '';
    $archivo = isset($_FILES['archivo']) ? $_FILES['archivo'] : null;
    $estudiante_id = $_SESSION['estudiante_id'];

    $query_nombre = "SELECT nombre, apellido FROM estudiantes WHERE id = ?";
    if ($stmt_nombre = $conn->prepare($query_nombre)) {
        $stmt_nombre->bind_param("i", $estudiante_id);
        $stmt_nombre->execute();
        $result_nombre = $stmt_nombre->get_result();
        $estudiante = $result_nombre->fetch_assoc();
        $nombre_remitente = $estudiante['nombre'] . ' ' . $estudiante['apellido'];
    } else {
        echo json_encode(['error' => 'Error en la preparación de la consulta del nombre']);
        exit;
    }

    if ($archivo && $archivo['error'] === UPLOAD_ERR_OK) {
        $upload_dir = '../uploads/';
        $file_name = basename($archivo['name']);
        $upload_file = $upload_dir . $file_name;
        if (move_uploaded_file($archivo['tmp_name'], $upload_file)) {
            $query = "INSERT INTO mensajes (curso_id, usuario_id, mensaje, archivo, nombre_remitente, fecha_hora) VALUES (?, ?, ?, ?, ?, NOW())";
            if ($stmt = $conn->prepare($query)) {
                $stmt->bind_param("iisss", $curso_id, $estudiante_id, $mensaje, $file_name, $nombre_remitente);
                $success = $stmt->execute();

                echo json_encode(['success' => $success]);
            } else {
                echo json_encode(['error' => 'Error en la preparación de la consulta de inserción']);
            }
        } else {
            echo json_encode(['error' => 'Error al mover el archivo subido']);
        }
    } else {
        $query = "INSERT INTO mensajes (curso_id, usuario_id, mensaje, nombre_remitente, fecha_hora) VALUES (?, ?, ?, ?, NOW())";
        if ($stmt = $conn->prepare($query)) {
            $stmt->bind_param("iiss", $curso_id, $estudiante_id, $mensaje, $nombre_remitente);
            $success = $stmt->execute();

            echo json_encode(['success' => $success]);
        } else {
            echo json_encode(['error' => 'Error en la preparación de la consulta de inserción']);
        }
    }
} elseif ($accion === 'eliminar_mensaje') {
    $mensaje_id = $_POST['mensaje_id'];
    $estudiante_id = $_SESSION['estudiante_id'];

    $query_check = "SELECT usuario_id FROM mensajes WHERE id = ?";
    if ($stmt_check = $conn->prepare($query_check)) {
        $stmt_check->bind_param("i", $mensaje_id);
        $stmt_check->execute();
        $result_check = $stmt_check->get_result();
        $mensaje = $result_check->fetch_assoc();

        if ($mensaje && $mensaje['usuario_id'] === $estudiante_id) {
            $query_delete = "DELETE FROM mensajes WHERE id = ?";
            if ($stmt_delete = $conn->prepare($query_delete)) {
                $stmt_delete->bind_param("i", $mensaje_id);
                $success = $stmt_delete->execute();
                echo json_encode(['success' => $success]);
            } else {
                echo json_encode(['error' => 'Error en la preparación de la consulta de eliminación']);
            }
        } else {
            echo json_encode(['error' => 'No tiene permiso para eliminar este mensaje']);
        }
    } else {
        echo json_encode(['error' => 'Error en la preparación de la consulta de verificación']);
    }
}
?>