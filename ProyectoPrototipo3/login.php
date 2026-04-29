<?php
session_start(); // Inicia la sesión
include 'db.php'; 

$correo_ingresado = $_POST['correo'] ?? '';
$pass_ingresada   = $_POST['contraseña'] ?? '';

$stmt = $conexion->prepare("SELECT id, nombre, contraseña FROM datosRegistrados WHERE correo = ?");
$stmt->bind_param("s", $correo_ingresado);
$stmt->execute();
$resultado = $stmt->get_result();

if ($usuario = $resultado->fetch_assoc()) {
    if (password_verify($pass_ingresada, $usuario['contraseña'])) {
        // ¡LOGIN CORRECTO!
        // Guardamos datos importantes en la sesión
        $_SESSION['usuario_id'] = $usuario['id'];
        $_SESSION['usuario_nombre'] = $usuario['nombre'];
        $_SESSION['autenticado'] = true;

        // Redirigimos al index
        header("Location: index.html");
        exit(); 
    } else {
        echo "Contraseña incorrecta.";
    }
} else {
    echo "El correo no está registrado.";
}
?>