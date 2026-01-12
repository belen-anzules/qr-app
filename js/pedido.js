const pedidoDiv = document.getElementById("pedido");

function mostrarPedido() {
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get('nombre');
    const extras = params.get('extras');
    const total = params.get('total');

    if (!nombre) {
        pedidoDiv.innerHTML = `<p style="text-align:center; padding:20px;">No hay pedido seleccionado.</p>`;
        return;
    }

    // CONSTRUIR LINK DE REGRESO (Para editar)
    // Extraemos las cantidades de la URL actual para mandarlas de vuelta
    const arroz = params.get('arroz') || 0;
    const pollo = params.get('pollo') || 0;
    const frejol = params.get('frejol') || 0;
    
    const urlEditar = `detalle.html?arroz=${arroz}&pollo=${pollo}&frejol=${frejol}`;

    pedidoDiv.innerHTML = `
        <div class="cart-item">
            <div class="cart-info">
                <strong>${nombre}</strong>
                <p class="extras-small">${extras || "Sin extras"}</p>
                <span class="price-tag">Total: $${total}</span>
            </div>
            <div class="cart-actions">
                <button class="edit-btn" onclick="location.href='${urlEditar}'">✏️</button>
                <button class="delete-btn" onclick="location.href='menu.html'">🗑️</button>
            </div>
        </div>
    `;
}

window.onload = mostrarPedido;