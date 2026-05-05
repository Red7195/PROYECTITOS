<?php
include 'db.php'; // Unimos la base de datos

// Obtener datos
$nombre = $_POST['nombre'] ?? '';
$apellidop = $_POST['apellidop'] ?? '';
$apellidom = $_POST['apellidom'] ?? '';
$correo = $_POST['correo'] ?? '';
$telefono = $_POST['telefono'] ?? '';
$direccion = $_POST['direccion'] ?? '';
$contraseña = $_POST['contraseña'] ?? '';
$confirmar_contraseña = $_POST['confirmar_contraseña'] ?? '';

//Esto limpia cualquier cosa que no sea un espacio o números.
$telefono = preg_replace('/[^0-9\s]/', '', $_POST['telefono']);

// 1. Validar que las contraseñas coincidan también en el servidor (Seguridad extra)
if ($contraseña !== $confirmar_contraseña) {
    die("X Las contraseñas no coinciden.");
}


// 2. ENCRIPTAR LA CONTRASEÑA
// Esto convierte "1234" en algo como "$2y$10$abc..." que es imposible de descifrar
$password_segura = password_hash($contraseña, PASSWORD_DEFAULT);

// 3. Preparar consulta (Sin la columna confirmar_contraseña)
// Asegúrate de que tu tabla en MySQL NO tenga la columna 'confirmar_contraseña'
$stmt = $conexion->prepare("INSERT INTO usuarios (nombre, apellidop, apellidom, correo, telefono, direccion, contraseña) VALUES (?,?,?,?,?,?,?)");

// Vincular variables (ahora son 7 "s")
$stmt->bind_param("sssssss", $nombre, $apellidop, $apellidom, $correo, $telefono, $direccion, $password_segura);

if ($stmt->execute()) {
    echo "<h2>¡Registro exitoso!</h2>";
    echo "<p>Ya puedes <a href='../login.html'>iniciar sesión aquí</a>.</p>";
} else {
    // Si el correo ya existe y es llave primaria/unique, saltará un error aquí
    echo "Error al guardar: " . $stmt->error;
}

$stmt->close();
$conexion->close();
?>