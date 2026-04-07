// Función que valida los datos del formulario
function validarDatos(){

    //si el campo nombre esta vacio
if (!document.form.nombre.value) {
        alert("se necesita un nombre"); // muestra mensaje
        document.form.nombre.focus(); //pone el cursor en el campo
        return false; //detiene el envio del formulario
    }
        // si el apellido paterno esta vacio

        if (!document.form.nombre.value) {
        alert("se necesita apellido paterno");
        document.form.nombre.focus();
        return false; 
        }
        
        // si el apellido materno esta vacio
        if (!document.form.nombre.value) {
        alert("se necesita apellido paterno");
        document.form.nombre.focus();
        return false;
         }
    
    return true; //permite el envio del formulario
}