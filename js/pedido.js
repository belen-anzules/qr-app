const pedidoDiv = document.getElementById("pedido");

function getCartFromURL() {
    const params = new URLSearchParams(window.location.search);
    const cartData = params.get('cart');
    return cartData ? JSON.parse(decodeURIComponent(cartData)) : [];
}

function mostrarPedido() {
    const cart = getCartFromURL();

    if (cart.length === 0) {
        pedidoDiv.innerHTML = `<p style="text-align:center; padding:20px;">Tu carrito está vacío.</p>`;
        return;
    }

    pedidoDiv.innerHTML = "";
    let totalFinalCompra = 0;

    cart.forEach((item, index) => {
        totalFinalCompra += parseFloat(item.total);

        // Creamos la tarjeta de cada plato
        pedidoDiv.innerHTML += `
            <div class="cart-item">
                <div class="cart-info">
                    <strong>${item.nombre} (#${index + 1})</strong>
                    <p class="extras-small">${item.extras}</p>
                    <span class="price-tag">$${item.total}</span>
                </div>
                <div class="cart-actions">
                    <button class="delete-btn" onclick="eliminarPlato(${index})">🗑️</button>
                </div>
            </div>
        `;
    });

    // Añadimos el Total Global al final si quieres
    pedidoDiv.innerHTML += `
        <div style="text-align:right; padding:10px; font-weight:bold; font-size:1.2rem;">
            Total Compra: $${totalFinalCompra.toFixed(2)}
        </div>
    `;
}

function eliminarPlato(index) {
    let cart = getCartFromURL();
    cart.splice(index, 1); // Borramos el plato seleccionado
    const cartString = encodeURIComponent(JSON.stringify(cart));
    window.location.href = `pedido.html?cart=${cartString}`;
}

// IMPORTANTE: El botón "Añadir más platos" debe mantener el carrito actual
function irAMenu() {
    const cart = getCartFromURL();
    const cartString = encodeURIComponent(JSON.stringify(cart));
    window.location.href = `menu.html?cart=${cartString}`;
}

window.onload = mostrarPedido;