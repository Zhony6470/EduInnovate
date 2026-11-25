<?php
// Incluir archivo de conexión
include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $accion = $_POST['accion'];

    if ($accion === 'cargar') {
        $sql = "SELECT * FROM anuncios ORDER BY fecha_publicacion DESC";
        $result = $conn->query($sql);

        $anuncios = [];
        while($row = $result->fetch_assoc()) {
            $anuncios[] = $row;
        }

        echo json_encode($anuncios);
    } elseif ($accion === 'publicar') {
        $titulo = $_POST['titulo'];
        $contenido = $_POST['contenido'];

        $sql = "INSERT INTO anuncios (titulo, contenido) VALUES ('$titulo', '$contenido')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => 'Anuncio publicado correctamente']);
        } else {
            echo json_encode(['error' => 'Error al publicar el anuncio']);
        }
    } elseif ($accion === 'eliminar') {
        $id = $_POST['id'];

        $sql = "DELETE FROM anuncios WHERE id = '$id'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => 'Anuncio eliminado correctamente']);
        } else {
            echo json_encode(['error' => 'Error al eliminar el anuncio']);
        }
    }
}

$conn->close();
?>
