<?php
session_start();

// 1. Si NO está autenticado, muestra el mensaje de error o botones de login
if (!isset($_SESSION['autenticado']) || $_SESSION['autenticado'] !== true) {
    http_response_code(403);
    ?>
    <!-- HTML de "Acceso Denegado" -->
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="./Unificador.css">
        <title>Acceso Restringido</title>
    </head>
    <body>
        <div class="error-container">
            <h1>🚫 Acceso Denegado</h1>
            <p>Para ver nuestra tienda, necesitas estar identificado.</p>
            <div class="links">
                <a href="register.html" class="btn">Regístrate Aquí</a>
                <a href="login.html" class="btn btn-outline">Inicia Sesión</a>
            </div>
        </div>
    </body>
    </html>
    <?php
    exit();
}

// 2. SI ESTÁ AUTENTICADO, cargamos el contenido del index.html de la raíz
// Usamos readfile para que el usuario nunca vea la ruta real del archivo
readfile("../index.html");
exit();
?>


