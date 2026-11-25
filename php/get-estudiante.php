<?php
include 'connection.php';

$id = isset($_GET['id']) ? $_GET['id'] : 0;

$sql = "SELECT id, nombre, apellido, cedula FROM estudiantes WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

$student = $result->fetch_assoc();

$stmt->close();
$conn->close();

echo json_encode($student);
?>
