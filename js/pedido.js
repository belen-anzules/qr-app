const pedidoDiv = document.getElementById("pedido");

// Función para obtener el carrito de la URL
function getCartFromURL() {
    const params = new URLSearchParams(window.location.search);
    const cartData = params.get('cart');
    return cartData ? JSON.parse(decodeURIComponent(cartData)) : [];
}

function mostrarPedido() {
    const cart = getCartFromURL();
    const params = new URLSearchParams(window.location.search);

    if (cart.length === 0) {
        pedidoDiv.innerHTML = `<p style="text-align:center; padding:40px; color:#666;">Tu carrito está vacío 🥑</p>`;
        return;
    }

    pedidoDiv.innerHTML = "";
    let totalCompra = 0;

    cart.forEach((item, index) => {
        totalCompra += parseFloat(item.total);

        // CREAMOS EL LINK DE EDICIÓN
        // Pasamos el carrito completo Y el índice que estamos editando
        const cartString = encodeURIComponent(JSON.stringify(cart));
        const urlEditar = `detalle.html?cart=${cartString}&editIndex=${index}&arroz=${item.config.arroz}&pollo=${item.config.pollo}&frejol=${item.config.frejol}`;

        pedidoDiv.innerHTML += `
            <div class="cart-item">
                <div class="cart-info">
                    <strong>${item.nombre}</strong>
                    <p class="extras-small">${item.extras}</p>
                    <span class="price-tag">$${item.total}</span>
                </div>
                <div class="cart-actions">
                    <button class="edit-btn" onclick="location.href='${urlEditar}'">✏️</button>
                    <button class="delete-btn" onclick="eliminarPlato(${index})">🗑️</button>
                </div>
            </div>
        `;
    });

    pedidoDiv.innerHTML += `
        <div style="text-align:right; padding:20px; font-weight:bold; font-size:1.3rem; color:#2d3436;">
            Total: $${totalCompra.toFixed(2)}
        </div>
    `;
}

function eliminarPlato(index) {
    let cart = getCartFromURL();
    cart.splice(index, 1);
    const cartString = encodeURIComponent(JSON.stringify(cart));
    window.location.href = `pedido.html?cart=${cartString}`;
}

function irAMenu() {
    const params = new URLSearchParams(window.location.search);
    const cart = params.get('cart') || encodeURIComponent(JSON.stringify([]));
    window.location.href = `menu.html?cart=${cart}`;
}

window.onload = mostrarPedido;