<?php

//Crear conexión a la base de datos
$conexion = new mysqli("localhost", "root", "User.sede", "SILVA");

//Verificar si hubo error al conectar
if ($conexion->connect_error){
    die("Error de conexión:" . $conexion->connect_error);
}

//Obtener datos enviados desde el formulario
$nombre = $_POST['nombre'] ?? ''; //si no existe, queda vacio
$apellidop = $_POST['apellidop'] ?? '';
$apellidom = $_POST['apellidom'] ?? '';

//Validar que no esten vacios
if (empty($nombre) || empty($apellidop) || empty($apellidom)) {
    die(" X Todos los campos son obligatorios");
}

// Preparar consulta SQL segura (evita hackeos)
$stmt = $conexion->prepare("INSERT INTO datos (nombre, apellidop, apellidom) VALUES (?,?,?)");

//Vincular variables a la consulta
$stmt->bind_param("sss", $nombre, $apellidop, $apellidom);
// "sss" significa que los 3 valores son strings

//Ejecutar la consulta
if ($stmt->execute()) {
    echo "<h2> V Datos guardados correctamente</h2>";

    //Mostrar los datos ingresados
    echo "<p>$nombre es su nombre</p>";
    echo "<p>$apellidop es su apellido paterno</p>";
    echo "<p>$apellidom es su apellido materno</p>";
} else {
    echo "Error al guardar";
}

//Cerrar la consulta
$stmt->close();

//Cerrar la conexión
$conexion->close();

?>