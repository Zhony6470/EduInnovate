<?php
session_start();
include 'connection.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $accion = $_POST['accion'];

    switch ($accion) {
        case 'cargar_cursos':
            $profesor_id = $_SESSION['profesor_id']; // Obtener el ID del profesor desde la sesión
            $sql = "SELECT id, nombre FROM cursos WHERE profesor_id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $profesor_id);
            $stmt->execute();
            $result = $stmt->get_result();

            $cursos = [];
            while ($row = $result->fetch_assoc()) {
                $cursos[] = $row;
            }
            echo json_encode($cursos);
            break;

        default:
            echo json_encode(['error' => 'Acción no válida']);
            break;
    }

    $stmt->close();
    $conn->close();
}
?>
