<?php
// Incluir archivo de conexión
include 'connection.php';

// Obtener datos del formulario
$cedula = $_POST['cedula'];
$nombres = $_POST['nombre'];
$apellidos = $_POST['apellido'];
$email = $_POST['email'];
$telefono = $_POST['telefono'];
$password = $_POST['password'];
$confirmPassword = $_POST['confirm-password'];

// Validar si las contraseñas coinciden
if ($password !== $confirmPassword) {
    echo "<script>alert('Las contraseñas no coinciden.'); window.location.href = '../login/registro-coordinador.html';</script>";
    exit();
}

// Verificar si el correo electrónico ya está registrado
$sql = "SELECT * FROM coordinadores WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // El correo ya está registrado
    echo "<script>alert('El correo electrónico ya está registrado.'); window.location.href = '../login/login-coordinador.html';</script>";
    exit();
}

// Insertar nuevo coordinador en la base de datos
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$sql = "INSERT INTO coordinadores (cedula, nombre, apellido, email, telefono, password) VALUES ('$cedula', '$nombres', '$apellidos', '$email', '$telefono', '$hashedPassword')";

if ($conn->query($sql) === TRUE) {
    echo "<script>alert('¡Has sido registrado exitosamente!'); window.location.href = '../login/login-coordinador.html';</script>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
