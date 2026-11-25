<?php
// Habilitar visualización de errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Incluir archivo de conexión
include 'connection.php';

// Obtener datos del formulario
$email = $_POST['email'];
$password = $_POST['password'];

// Verificar si el correo electrónico está registrado
$sql = "SELECT * FROM coordinadores WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    // Solo debe haber un registro por correo electrónico
    $row = $result->fetch_assoc();
    
    // Verificar la contraseña
    if (password_verify($password, $row['password'])) {
        // Redirigir a la página de inicio del coordinador
        echo "<script>alert('Inicio de sesión exitoso.'); window.location.href = '../coordinador/home-coordinador.html';</script>";
    } else {
        // Contraseña incorrecta
        echo "<script>alert('Contraseña incorrecta.'); window.location.href = '../login/login-coordinador.html';</script>";
    }
} else {
    // Correo no registrado
    echo "<script>alert('El correo electrónico no está registrado.'); window.location.href = '../login/registro-coordinador.html';</script>";
}

$stmt->close();
$conn->close();
?>
