<?php
session_start();

if (!isset($_SESSION['autenticado']) || $_SESSION['autenticado'] !== true) {
    http_response_code(403);
    ?>
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="CSS/Unificador.css"> 
        <title>Acceso Restringido</title>
    </head>
    <body>
        <div class="error-container">
            <h1>🚫 Acceso Denegado</h1>
            <p>Para ver nuestra tienda, necesitas estar identificado.</p>
            <div class="links">
                <a href="../register.html" class="btn">Regístrate Aquí</a>
                <a href="../login.html" class="btn btn-outline">Inicia Sesión</a>
            </div>
        </div>
    </body>
    </html>
    <?php
    exit();
}
?>


