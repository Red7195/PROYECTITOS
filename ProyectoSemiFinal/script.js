//Funcion del java script
function validarDatos() {
    // Referencias a los campos
    const nombre = document.form.nombre;
    const apellidop = document.form.apellidop;
    const apellidom = document.form.apellidom;
    const correo = document.form.correo;
    const telefono = document.form.telefono;
    const direccion = document.form.direccion;
    const pass = document.form.contraseña;
    const confirmPass = document.form.confirmar_contraseña;

    // --- Validaciones de Vacío ---
    if (!nombre.value.trim()) { alert("Se necesita un nombre"); nombre.focus(); return false; }
    if (!apellidop.value.trim()) { alert("Se necesita apellido paterno"); apellidop.focus(); return false; }
    if (!apellidom.value.trim()) { alert("Se necesita apellido materno"); apellidom.focus(); return false; }

    // --- VALIDACIÓN DE CORREO ---
    // Esta expresión regular valida: texto + @ + texto + . + extensión
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo.value)) {
        alert("Por favor, ingrese un correo electrónico válido (ejemplo: usuario@dominio.com)");
        correo.focus();
        return false;
    }

    // --- VALIDACIÓN DE TELÉFONO ---
    // \d+ significa que solo acepta dígitos del 0 al 9
    const regexTelefono = /^\d+$/; 
    if (!regexTelefono.test(telefono.value)) {
        alert("El teléfono solo debe contener números");
        telefono.focus();
        return false;
    }
    // Opcional: Validar largo del teléfono (ejemplo 9 dígitos)
    if (telefono.value.length < 8) {
        alert("El teléfono debe tener al menos 8 dígitos");
        telefono.focus();
        return false;
    }

    // --- Resto de validaciones ---
    if (!direccion.value.trim()) { alert("Se necesita dirección"); direccion.focus(); return false; }
    if (!pass.value) { alert("Se necesita ingresar una contraseña"); pass.focus(); return false; }
    
    // Validar que las contraseñas coincidan
    if (pass.value !== confirmPass.value) {
        alert("Las contraseñas no coinciden");
        confirmPass.focus();
        return false;
    }

    alert("Formulario enviado con éxito");
    return true; 
}