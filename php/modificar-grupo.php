<?php
include 'connection.php';

$data = json_decode(file_get_contents('php://input'), true);

// Obtener estudiantes del grupo
if (isset($_GET['grupoId'])) {
    $grupoId = intval($_GET['grupoId']);
    
    $stmt = $conn->prepare("
        SELECT e.id, e.nombre, e.apellido, e.cedula 
        FROM estudiantes e
        INNER JOIN carrera_estudiantes ce ON e.id = ce.estudiante_id
        WHERE ce.carrera_id = ?
    ");
    $stmt->bind_param("i", $grupoId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $students = [];
    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }

    $stmt->close();
    $conn->close();

    echo json_encode($students);
}

// Manejar eliminación y guardado de cambios
if (isset($data['action'])) {
    $action = $data['action'];

    if ($action == 'remove') {
        $grupoId = $data['grupoId'];
        $estudianteId = $data['estudianteId'];

        // Eliminar estudiante del grupo
        $stmt = $conn->prepare("DELETE FROM carrera_estudiantes WHERE carrera_id = ? AND estudiante_id = ?");
        $stmt->bind_param("ii", $grupoId, $estudianteId);
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false]);
        }
        $stmt->close();
    } elseif ($action == 'save') {
        $grupoId = $data['grupoId'];
        $estudiantes = $data['estudiantes'];

        // Eliminar todos los estudiantes del grupo
        $stmt = $conn->prepare("DELETE FROM carrera_estudiantes WHERE carrera_id = ?");
        $stmt->bind_param("i", $grupoId);
        $stmt->execute();
        $stmt->close();

        // Insertar los estudiantes actuales en el grupo
        $stmt = $conn->prepare("INSERT INTO carrera_estudiantes (carrera_id, estudiante_id) VALUES (?, ?)");
        foreach ($estudiantes as $estudianteId) {
            $stmt->bind_param("ii", $grupoId, $estudianteId);
            $stmt->execute();
        }
        $stmt->close();

        echo json_encode(['success' => true]);
    }
}
?>
