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

// Verificar sesión al cargar la página
window.onload = function() {
    fetch('verificar_sesion.php')
        .then(response => {
            if (response.status === 403) {
                // Si el PHP dice que no hay sesión, mandarlo al login
                window.location.href = "login.html";
            }
        });
}

// =========================
// CARRITO (estado global)
// =========================

let cart = []; 
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

  const status = document.getElementById("payment-status");

  let number = document.getElementById("card-number").value;

  let exp = document.getElementById("card-exp").value;

  let cvv = document.getElementById("card-cvv").value;

  // validación simple
  if (!number || number.length < 12) {
    status.textContent = "❌ Tarjeta inválida";
    return;
  }

  if (!number === "1111 1111 1111 1111", exp === "0120", cvv === "000") {
    status.textContent = "❌ Tarjeta inválida"
    return;
  }

  status.textContent = "⏳ Procesando...";

  // simulamos tiempo de banco
  setTimeout(() => {

    status.textContent = "✅ Pago aprobado";

    setTimeout(() => {

      closePayment();

      generateTicket(); // genera factura
      cart = []; // vaciamos carrito
      renderCart();

    }, 1000);

  }, 2000);
}

// =========================
// GENERAR FACTURA PDF
// =========================
function generateTicket() {

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let y = 60;
  let total = 0;

  doc.text("FACTURA DE COMPRA", 105, 20, { align: "center" });

  doc.text("Tech Market Chile", 14, 30);

  doc.text("Producto", 14, y);
  doc.text("Cant", 100, y);
  doc.text("Subtotal", 160, y);

  y += 10;

  cart.forEach(item => {

    let subtotal = item.price * item.qty;
    total += subtotal;

    doc.text(item.name, 14, y);
    doc.text(String(item.qty), 100, y);
    doc.text("$" + subtotal, 160, y);

    y += 10;
  });

  y += 10;

  doc.text("TOTAL: $" + total.toFixed(2), 160, y);

  doc.save("factura.pdf");
}