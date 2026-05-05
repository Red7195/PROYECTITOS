<?php
session_start(); // Inicia la sesión
include 'db.php'; 

$correo_ingresado = $_POST['correo'] ?? '';
$pass_ingresada   = $_POST['contraseña'] ?? '';

$stmt = $conexion->prepare("SELECT id, nombre, contraseña FROM usuarios WHERE correo = ?");
$stmt->bind_param("s", $correo_ingresado);
$stmt->execute();
$resultado = $stmt->get_result();

if ($usuario = $resultado->fetch_assoc()) {
    if (password_verify($pass_ingresada, $usuario['contraseña'])) {
        // ¡LOGIN CORRECTO!
        // Guardamos datos importantes en la sesión
        $_SESSION['usuario_id'] = $usuario['id'];
        $_SESSION['usuario_nombre'] = $usuario['nombre'];
        $_SESSION['correo'] = $correo_ingresado; 
        // ... después de verificar la contraseña ...
        $_SESSION['autenticado'] = true;

    // Redirigimos a la raíz (el .htaccess se encargará de llamar al index.php)
    header("Location: ../"); 
    exit();
    } else {
        echo "Contraseña incorrecta.";
        echo "<p>Porfavor<a href='../login.html'>Reintentalo</a>.</p>";
    }
} else {
    echo "El correo no está registrado.";
    echo "<p>Porfavor<a href='../register.html'>Registrate aquí</a>.</p>";
}
?>