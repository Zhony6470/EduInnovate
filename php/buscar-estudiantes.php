<?php
include 'connection.php';

$query = isset($_GET['query']) ? $_GET['query'] : '';

$sql = "SELECT id, nombre, apellido, cedula FROM estudiantes WHERE nombre LIKE ? OR apellido LIKE ? OR cedula LIKE ?";
$stmt = $conn->prepare($sql);
$searchParam = '%' . $query . '%';
$stmt->bind_param("sss", $searchParam, $searchParam, $searchParam);
$stmt->execute();
$result = $stmt->get_result();

$students = [];
while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}

$stmt->close();
$conn->close();

echo json_encode($students);
?>
