<?php
// Incluir archivo de conexión
include 'connection.php';

// Obtén el ID del curso desde la solicitud GET
$cursoId = isset($_GET['cursoId']) ? intval($_GET['cursoId']) : 0;

if ($cursoId <= 0) {
    echo json_encode(['error' => 'ID de curso inválido.']);
    exit();
}

// Paso 1: Obtener la carrera asociada al curso
$sqlCarrera = "SELECT carrera_id FROM cursos WHERE id = ?";
$stmtCarrera = $conn->prepare($sqlCarrera);
$stmtCarrera->bind_param("i", $cursoId);
$stmtCarrera->execute();
$resultCarrera = $stmtCarrera->get_result();

if ($resultCarrera->num_rows > 0) {
    $carreraId = $resultCarrera->fetch_assoc()['carrera_id'];

    // Paso 2: Obtener los estudiantes asociados a la carrera
    $sqlEstudiantes = "
    SELECT e.cedula, e.nombre, e.apellido, e.email, e.telefono 
    FROM estudiantes e
    INNER JOIN carrera_estudiantes ce ON e.id = ce.estudiante_id
    WHERE ce.carrera_id = ?";

    $stmtEstudiantes = $conn->prepare($sqlEstudiantes);
    $stmtEstudiantes->bind_param("i", $carreraId);
    $stmtEstudiantes->execute();
    $resultEstudiantes = $stmtEstudiantes->get_result();

    $estudiantes = [];
    while ($row = $resultEstudiantes->fetch_assoc()) {
        $estudiantes[] = $row;
    }

    // Retornar los datos como JSON
    echo json_encode($estudiantes);

} else {
    // Si no se encuentra la carrera asociada
    echo json_encode(['error' => 'No se encontró la carrera asociada al curso.']);
}

$stmtCarrera->close();
$conn->close();
?>