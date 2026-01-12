const pedidoContainer = document.getElementById("pedido-lista");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 1. Leer parámetros de la URL (Plan B para la APK si LocalStorage falla)
const params = new URLSearchParams(window.location.search);
const nombreURL = params.get('nombre');

if (nombreURL) {
    // Si viene un plato por URL, lo agregamos al carrito temporal para mostrarlo
    const nuevoItem = {
        name: nombreURL,
        extras: params.get('extras') ? params.get('extras').split(', ') : [],
        total: params.get('total')
    };
    
    // Evitar duplicados al recargar
    const yaExiste = cart.some(item => item.total === nuevoItem.total && item.extras.join() === nuevoItem.extras.join());
    if (!yaExiste) {
        cart.push(nuevoItem);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

// 2. Función para dibujar la lista de pedidos
function render() {
    if (cart.length === 0) {
        pedidoContainer.innerHTML = `
            <div style="text-align:center; padding:50px; color:#777;">
                <p>Tu pedido está vacío 🥑</p>
            </div>`;
        return;
    }

    pedidoContainer.innerHTML = "";
    cart.forEach((item, index) => {
        // Formateamos los extras para que se vean bien
        const extrasTexto = Array.isArray(item.extras) ? item.extras.join(", ") : item.extras;

        pedidoContainer.innerHTML += `
            <div class="cart-item">
                <div class="cart-info">
                    <strong>${item.name}</strong>
                    <p class="extras-small">${extrasTexto || "Sin extras"}</p>
                    <span class="price-tag">$${item.total}</span>
                </div>
                <div class="cart-actions">
                    <button class="edit-btn" onclick="editar(${index})">✏️</button>
                    <button class="delete-btn" onclick="eliminar(${index})">🗑️</button>
                </div>
            </div>
        `;
    });
}

// 3. Función para Eliminar
function eliminar(index) {
    if (confirm("¿Eliminar este plato?")) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        render();
    }
}

// 4. Función para Editar (Regresa a detalle.html con los datos)
function editar(index) {
    const item = cart[index];
    
    // Guardamos qué índice estamos editando para que detalle.js sepa
    localStorage.setItem("edit_index", index);
    
    // Redirigimos a detalle.html
    // Nota: detalle.js debe estar preparado para leer esto (ya lo configuramos antes)
    window.location.href = "detalle.html";
}

render();