<?php
// Incluir archivo de conexión
include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $accion = $_POST['accion'];

    if ($accion === 'buscar') {
        $cedula = $_POST['cedula'];

        $sql = "SELECT * FROM coordinadores WHERE cedula = '$cedula'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $data = $result->fetch_assoc();
            echo json_encode($data);
        } else {
            echo json_encode(['error' => 'Coordinador no encontrado']);
        }
    } elseif ($accion === 'actualizar_datos') {
        $cedula = $_POST['cedula'];
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $email = $_POST['email'];
        $telefono = $_POST['telefono'];
        $newPassword = $_POST['new-password'];

        // Actualizar datos del coordinador
        $sql = "UPDATE coordinadores SET nombre = '$nombre', apellido = '$apellido', email = '$email', telefono = '$telefono'";

        // Si se proporciona una nueva contraseña, se actualiza también
        if (!empty($newPassword)) {
            $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
            $sql .= ", password = '$hashedPassword'";
        }

        $sql .= " WHERE cedula = '$cedula'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => 'Datos actualizados correctamente']);
        } else {
            echo json_encode(['error' => 'Error al actualizar los datos']);
        }
    }
}

$conn->close();
?>
