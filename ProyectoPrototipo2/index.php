<?php
session_start();

// Si no está autenticado, devuelve un error 403 (Prohibido) o un JSON
if (!isset($_SESSION['autenticado']) || $_SESSION['autenticado'] !== true) {
    http_response_code(403);
    echo "Acceso denegado";
    exit();
}
?>