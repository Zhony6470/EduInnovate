<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'connection.php';

$action = $_GET['action'] ?? '';

if ($action === 'obtener') {
    $sql = "SELECT * FROM carreras";
    $result = $conn->query($sql);
    $grupos = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $grupos[] = $row;
        }
    }

    echo json_encode($grupos);

} elseif ($action === 'eliminar') {
    $id = $_GET['id'] ?? 0;

    if ($id) {
        // Eliminar las filas asociadas en la tabla carrera_estudiantes
        $sql = "DELETE FROM carrera_estudiantes WHERE carrera_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->close();

        // Ahora eliminar la carrera
        $sql = "DELETE FROM carreras WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false]);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false]);
    }
}

$conn->close();
?>
