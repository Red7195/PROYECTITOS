<?php
include 'db.php'; // Volvemos a usar la conexión centralizada

$correo_ingresado = $_POST['correo'] ?? '';
$pass_ingresada   = $_POST['contraseña'] ?? '';

// 1. Buscamos al usuario por su correo
$stmt = $conexion->prepare("SELECT id, nombre, contraseña FROM datosRegistrados WHERE correo = ?");
$stmt->bind_param("s", $correo_ingresado);
$stmt->execute();
$resultado = $stmt->get_result();

if ($usuario = $resultado->fetch_assoc()) {
    // 2. El usuario existe, ahora verificamos la contraseña
    if (password_verify($pass_ingresada, $usuario['contraseña'])) {
        // ¡LOGIN CORRECTO!
        echo "Bienvenido " . $usuario['nombre'] . ". Tu ID de usuario es: " . $usuario['id'];
    } else {
        echo "Contraseña incorrecta.";
    }
} else {
    echo "El correo no está registrado.";
}
?>