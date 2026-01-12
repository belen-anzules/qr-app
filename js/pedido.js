function renderCart() {
    const container = document.getElementById("pedido-lista");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        container.innerHTML = `<div class="empty-state">
            <p>Tu carrito está vacío 🥑</p>
        </div>`;
        return;
    }

    container.innerHTML = "";
    cart.forEach((item, index) => {
        const extrasText = item.extras.length > 0 
            ? item.extras.map(e => `• ${e.qty}x ${e.name}`).join("<br>") 
            : "Sin extras";

        container.innerHTML += `
            <div class="cart-item">
                <div class="cart-info">
                    <strong>${item.name}</strong>
                    <p class="extras-small">${extrasText}</p>
                    <span class="price-tag">$${item.total}</span>
                </div>
                <div class="cart-actions">
                    <button class="edit-btn" onclick="editItem(${index})">✏️</button>
                    <button class="delete-btn" onclick="deleteItem(${index})">🗑️</button>
                </div>
            </div>
        `;
    });
}

function deleteItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function editItem(index) {
    // Redirigir a detalle pasando el índice por la URL
    location.href = `detalle.html?edit=${index}`;
}

renderCart();