<?php
include 'connection.php';

$data = json_decode(file_get_contents("php://input"), true);
$carreraNombre = $data['carreraNombre'];
$estudiantes = $data['estudiantes'];

$conn->begin_transaction();

try {
    $sql = "INSERT INTO carreras (nombre) VALUES (?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $carreraNombre);
    $stmt->execute();
    
    $carreraId = $stmt->insert_id;
    
    $sql = "INSERT INTO carrera_estudiantes (carrera_id, estudiante_id) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    
    foreach ($estudiantes as $estudianteId) {
        $stmt->bind_param("ii", $carreraId, $estudianteId);
        $stmt->execute();
    }

    $conn->commit();
    
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

$stmt->close();
$conn->close();
?>
