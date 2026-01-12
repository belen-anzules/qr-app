const pedidoDiv = document.getElementById("pedido");

function getCartFromURL() {
    const params = new URLSearchParams(window.location.search);
    const cartData = params.get('cart');
    return cartData ? JSON.parse(decodeURIComponent(cartData)) : [];
}

function mostrarPedido() {
    const cart = getCartFromURL();
    if (cart.length === 0) {
        pedidoDiv.innerHTML = `<div style="text-align:center; padding:50px;">Carrito vacío 🥣</div>`;
        return;
    }

    pedidoDiv.innerHTML = "";
    let totalGlobal = 0;

    cart.forEach((item, index) => {
        totalGlobal += parseFloat(item.total);
        
        // Generar parámetros de ingredientes para el link de editar
        let configParams = "";
        for (let key in item.config) {
            configParams += `&${key}=${item.config[key]}`;
        }

        const cartString = encodeURIComponent(JSON.stringify(cart));
        const urlEditar = `${item.page}?cart=${cartString}&editIndex=${index}${configParams}`;

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

    pedidoDiv.innerHTML += `<div style="text-align:right; font-size:1.4rem; font-weight:bold; padding:20px;">Total: $${totalGlobal.toFixed(2)}</div>`;
}

function eliminarPlato(index) {
    let cart = getCartFromURL();
    cart.splice(index, 1);
    window.location.href = `pedido.html?cart=${encodeURIComponent(JSON.stringify(cart))}`;
}

function irAMenu() {
    const cart = getCartFromURL();
    window.location.href = `menu.html?cart=${encodeURIComponent(JSON.stringify(cart))}`;
}

window.onload = mostrarPedido;