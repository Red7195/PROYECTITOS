// Módulo de validación de integridad de datos. 
// Implementa control de flujo para asegurar que las entradas del formulario 
// cumplan con los requisitos de persistencia antes del envío.
function validarDatos() {
    const form = document.form;
    const telefono = form.telefono;

    // --- Validaciones de Vacío (Nombre, Apellidos...) ---
    if (!form.nombre.value.trim()) { alert("Se necesita un nombre"); form.nombre.focus(); return false; }
    if (!form.apellidop.value.trim()) { alert("Se necesita apellido paterno"); form.apellidop.focus(); return false; }
    if (!form.apellidom.value.trim()) { alert("Se necesita apellido materno"); form.apellidom.focus(); return false; }

    // --- VALIDACIÓN DE CORREO ---
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Definición de expresión regular (RegExp) 
    // para la validación de sintaxis de correo electrónico, 
    // siguiendo el estándar de estructura local-part@domain.
    if (!regexCorreo.test(form.correo.value)) {
        alert("Ingrese un correo válido");
        form.correo.focus();
        return false;
    }

    // --- VALIDACIÓN DE TELÉFONO ---
    // Limpiamos espacios solo para la lógica de validación
    const soloNumeros = telefono.value.replace(/\s/g, ''); 
    // Sanitización de la entrada telefónica mediante el uso de métodos de cadena 
    // y expresiones regulares para normalizar el dato antes de la evaluación de longitud.
    const regexTelefono = /^\d+$/; 

    if (!regexTelefono.test(soloNumeros)) {
        alert("El teléfono solo debe contener números");
        telefono.focus();
        return false;
    }

    if (soloNumeros.length < 9) {
        alert("El teléfono debe tener 9 dígitos");
        telefono.focus();
        return false;
    }

    // --- Resto de validaciones ---
    if (!form.direccion.value.trim()) { alert("Se necesita dirección"); form.direccion.focus(); return false; }
    if (!form.contraseña.value) { alert("Se necesita contraseña"); form.contraseña.focus(); return false; }
    if (form.contraseña.value !== form.confirmar_contraseña.value) {
        alert("Las contraseñas no coinciden");
        return false;
    }

    return true; 
}

// Todo lo que necesita que la página esté cargada va aquí
window.onload = function() {
    // Manejador de eventos para el ciclo de vida del documento. 
    // Garantiza la disponibilidad del DOM antes de la asignación de listeners 
    // y la ejecución de peticiones de red.

    // --- FORMATO AUTOMÁTICO DE TELÉFONO ---
    const inputTelefono = document.querySelector('input[name="telefono"]');
    
    if (inputTelefono) {
        inputTelefono.addEventListener('input', function (e) {
            let valor = e.target.value.replace(/\D/g, ''); // Solo números
            valor = valor.substring(0, 9); // Max 9

            let formateado = "";
            if (valor.length > 0) formateado += valor.substring(0, 1);
            if (valor.length > 1) formateado += " " + valor.substring(1, 5);
            if (valor.length > 5) formateado += " " + valor.substring(5, 9);
            
            e.target.value = formateado;
        });
    }

    // --- VERIFICAR SESIÓN ---
    fetch('/ProyectoPrototipo4/php/register.php').then(response => {
        // Verificación del estado de autenticación mediante una petición asíncrona al backend. 
        // Implementa un redireccionamiento basado en el código de estado HTTP 403 (Forbidden).
        if (response.status === 403) window.location.href = "login.html";
    });
}

// =========================
// CARRITO (estado global)
// =========================

let cart = []; 
// Estructura de datos global de tipo Array para la gestión del estado de la persistencia temporal de productos (Carrito de compras).
// aquí guardamos todos los productos

// =========================
// AGREGAR PRODUCTO
// =========================
function addToCart(name, price) {

  // buscamos si el producto ya existe en el carrito
  let item = cart.find(p => p.name === name);

  if (item) {
    // si existe, aumentamos cantidad
    item.qty++;
  } else {
    // si no existe, lo agregamos
    cart.push({ name, price, qty: 1 });
  }

  // actualizamos interfaz
  renderCart();
  // Función encargada de la manipulación del DOM para la actualización de la interfaz de usuario. 
  // Itera sobre la colección de objetos 'cart' para proyectar el subtotal y el acumulado total.
}

// =========================
// RENDER DEL CARRITO
// =========================
function renderCart() {

  const list = document.getElementById("cart-list");
  const totalEl = document.getElementById("total");

  list.innerHTML = ""; // limpiamos UI

  let total = 0;

  cart.forEach((item, index) => {

    let subtotal = item.price * item.qty;
    total += subtotal;

    // creamos elemento visual
    let li = document.createElement("li");

    li.innerHTML = `
      ${item.name} x${item.qty} - $${subtotal}
      <button onclick="changeQty(${index}, 1)">+</button>
      <button onclick="changeQty(${index}, -1)">-</button>
      <button onclick="removeItem(${index})">🗑</button>
    `;

    list.appendChild(li);
  });

  totalEl.textContent = "Total: $" + total.toFixed(2);
}

// =========================
// CAMBIAR CANTIDAD
// =========================
function changeQty(index, change) {

  cart[index].qty += change;

  // si llega a 0, lo eliminamos
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  renderCart();
}

// =========================
// ELIMINAR ITEM
// =========================
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// =========================
// MODAL PAGO
// =========================
function openPayment() {
  if (cart.length === 0) {
    alert("Carrito vacío");
    return;
  }

  document.getElementById("payment-modal").style.display = "block";
}

function closePayment() {
  document.getElementById("payment-modal").style.display = "none";
}

// =========================
// PROCESAR PAGO SIMULADO
// =========================
function processPayment() {
    // Simulación de lógica de negocio para el procesamiento de transacciones. Implementa validaciones condicionales 
    // y el uso de funciones de temporización (setTimeout) para emular la latencia de una pasarela de pago.
    const status = document.getElementById("payment-status");
    let number = document.getElementById("card-number").value;
    let exp = document.getElementById("card-exp").value;
    let cvv = document.getElementById("card-cvv").value;

    // 1. Validación de formato básico
    if (!number || number.replace(/\s/g, '').length < 12) {
        status.textContent = "❌ Tarjeta inválida";
        return;
    }

    // 2. Validación de tarjetas específicas (Sintaxis correcta)
    // Usamos (Condicion A || Condicion B) 
    const tarjeta1 = (number === "4242 4242 4242 4242" && exp === "12/34" && cvv === "123");
    const tarjeta2 = (number === "5555 5555 5555 4444" && exp === "11/30" && cvv === "456");

    if (tarjeta1 || tarjeta2) {
        status.textContent = "⏳ Procesando...";

        setTimeout(async () => {
            status.textContent = "✅ Pago aprobado";

            setTimeout(async () => {
                closePayment();
                try {
                    await generateTicket(); 
                    cart = []; 
                    renderCart();
                } catch (error) {
                    console.error("Error:", error);
                    alert("Pago aprobado, pero hubo un error al generar el PDF.");
                }
            }, 1000);
        }, 2000);
    } else {
        // Por si meten datos que no son de prueba
        status.textContent = "❌ Datos de tarjeta incorrectos";
    }
}


// =========================
// GENERAR FACTURA PDF
// =========================
async function generateTicket() {
    // Implementación de generación de documentos del lado del cliente. 
    // Utiliza la librería jsPDF para instanciar un objeto de documento 
    // y mapear los datos obtenidos del servidor y del estado global de la aplicación.
    console.log("Iniciando generación de factura...");
    
    if (!window.jspdf) {
        alert("Error crítico: Librería de PDF no encontrada.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    try {
        const response = await fetch('php/factura.php'); 
        // Consumo de servicio interno mediante Fetch API con patrón async/await 
        // para recuperar metadatos del usuario en formato JSON y popular el encabezado del reporte PDF.
        
        if (!response.ok) throw new Error("No se encontró el archivo factura.php en el servidor");
        
        const userData = await response.json();

        if (userData.error) {
            alert("Error: " + userData.error);
            return;
        }

        // --- ENCABEZADO ---
        doc.setFontSize(18);
        doc.text("FACTURA DE COMPRA", 105, 20, { align: "center" });
        
        doc.setFontSize(12);
        doc.text(`Cliente: ${userData.nombre} ${userData.apellidop}`, 14, 40);
        doc.text(`Correo: ${userData.correo}`, 14, 47);
        doc.text(`Dirección: ${userData.direccion}`, 14, 54);

        let y = 75;
        let totalFactura = 0;

        doc.text("Producto", 14, y);
        doc.text("Cant", 100, y);
        doc.text("Subtotal", 160, y);
        doc.line(14, y + 2, 195, y + 2);
        y += 10;

        // Usamos 'cart' (la variable global de arriba)
        cart.forEach(item => {
            let subtotal = item.price * item.qty;
            totalFactura += subtotal;
            doc.text(item.name, 14, y);
            doc.text(String(item.qty), 100, y);
            doc.text("$" + subtotal, 160, y);
            y += 10;
        });

        doc.setFontSize(14);
        doc.text("TOTAL: $" + totalFactura, 160, y + 10, { align: "right" });

        doc.save(`Factura_${userData.nombre}.pdf`);
        console.log("¡Factura generada con éxito!");

    } catch (error) {
        console.error("Detalle del error:", error);
        alert("Hubo un fallo: " + error.message);
    }
}