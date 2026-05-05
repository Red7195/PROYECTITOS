<?php
session_start(); // Siempre primero
include 'db.php'; 

// Ahora usamos el ID que sí sabemos que existe en la sesión
$id_usuario = $_SESSION['usuario_id'] ?? ''; 

if ($id_usuario) {
    // Buscamos por ID en lugar de correo
    $stmt = $conexion->prepare("SELECT nombre, apellidop, correo, direccion FROM usuarios WHERE id = ?");
    $stmt->bind_param("i", $id_usuario); // "i" porque el ID es un entero
    $stmt->execute();
    $resultado = $stmt->get_result();
    $usuario = $resultado->fetch_assoc();

    if ($usuario) {
        echo json_encode($usuario);
    } else {
        echo json_encode(['error' => 'Usuario no encontrado en la BD']);
    }
} else {
    echo json_encode(['error' => 'No hay sesion activa']);
}
?>