<?php
session_start();  // Asegúrate de que la sesión esté iniciada

include 'connection.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $accion = $_POST['accion'];

    switch ($accion) {
        case 'cargar_carreras':
            $sql = "SELECT * FROM carreras";
            $result = $conn->query($sql);
            $carreras = [];
            while ($row = $result->fetch_assoc()) {
                $carreras[] = $row;
            }
            echo json_encode($carreras);
            break;

        case 'cargar_cursos':
            $profesor_id = $_SESSION['profesor_id'];  // Obtener el profesor_id de la sesión
            $sql = "SELECT * FROM cursos WHERE profesor_id = ?";
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

        case 'agregar_curso':
            $nombre = $_POST['nombre'];
            $carrera_id = $_POST['carrera_id'];
            $profesor_id = $_SESSION['profesor_id'];  // Asegúrate de obtener el profesor_id de la sesión

            $sql = "INSERT INTO cursos (nombre, carrera_id, profesor_id) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sii", $nombre, $carrera_id, $profesor_id);

            if ($stmt->execute()) {
                echo json_encode(['success' => 'Curso agregado correctamente']);
            } else {
                echo json_encode(['error' => 'Error al agregar el curso: ' . $stmt->error]);
            }
            break;

        case 'eliminar_curso':
            $curso_id = $_POST['curso_id'];
            $sql = "DELETE FROM cursos WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $curso_id);

            if ($stmt->execute()) {
                echo json_encode(['success' => 'Curso eliminado correctamente']);
            } else {
                echo json_encode(['error' => 'Error al eliminar el curso: ' . $stmt->error]);
            }
            break;
        
        default:
            echo json_encode(['error' => 'Acción no válida']);
            break;
    }

    $conn->close();
}
?>
