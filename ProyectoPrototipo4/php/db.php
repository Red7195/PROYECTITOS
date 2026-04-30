<?php
// db.php
$host = "localhost";
$user = "root";
$pass = ""; // Tu contraseña de XAMPP
$db   = "REGISTROS";

$conexion = new mysqli($host, $user, $pass, $db);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
// No cerramos la conexión aquí, se usará en los otros archivos
?>