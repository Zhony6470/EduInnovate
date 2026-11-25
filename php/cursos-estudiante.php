<?php
session_start();
include 'connection.php';

$estudiante_id = $_SESSION['estudiante_id'];

$sql = "
    SELECT c.nombre, c.id 
    FROM cursos c
    JOIN carrera_estudiantes ce ON ce.carrera_id = c.carrera_id
    WHERE ce.estudiante_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $estudiante_id);
$stmt->execute();
$result = $stmt->get_result();

$cursos = [];
while ($row = $result->fetch_assoc()) {
    $cursos[] = $row;
}

echo json_encode($cursos);

$stmt->close();
$conn->close();
?>
