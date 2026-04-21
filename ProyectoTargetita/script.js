// =========================
// CARRITO (estado global)
// =========================

let cart = [];
// Array donde se guardan los productos seleccionados

// ==========================
// AGREGAR PRODUCTO
// ==========================

function addToCart(name, price) {
    //función que recibe nombre y precio

    let item = cart.find(p => p.name === name);
    //Busca si el producto ya está en el carrito

    if (item) {
        //si existe, aumenta cantidad
        item.qty++;
    } else {
        //si no existe, lo agrega nuevo
        cart.push({name,price,qty: 1});
    }

    renderCart();
    //actualiza la interfaz
}

// ===========================
// MOSTRAR CARRITO
// ===========================

function renderCart() {

    const list = document.getElementById("cart-list");
    //Obtiene lista HTML

    const totalEl = document.getElementById("total");
    //obtiene elemento del total

    list.innerHTML ="";
    //limpia la lista antes de dibujar

    let total = 0;
    //variable acumuladora

    cart.forEach((item, index) => {

        let subtotal = item.price * item.qty;
        //Calcula subtotal

        total += subtotal;
        //suma al total general

        let li = document.createElement("li");
        //Crea elemento HTML

        li.innerHTML = ´
            ${item.name} x${item.qty} - $${subtotal}
            <button onclick="changeQty(${index}, 1)">+</button>
            <button onclick="changeQty(${index}, 1)">-</button>
            <button onclick="removeItem(${index})">!</button>
        ´;
        // Contenido del item

        list.appendChild(li);
        // lo agrega a la lista

    });
}