/* ==========================================
   MACRO FIT - LÓGICA DE PEDIDO (pedido.js)
   ========================================== */

const pedidoDiv = document.getElementById("pedido-lista");

// 1. Obtener los platos desde la URL
function getCartFromURL() {
    const params = new URLSearchParams(window.location.search);
    const cartData = params.get('cart');
    try {
        return cartData ? JSON.parse(decodeURIComponent(cartData)) : [];
    } catch (e) {
        console.error("Error al decodificar el carrito:", e);
        return [];
    }
}

// 2. Renderizar la lista
function mostrarPedido() {
    const cart = getCartFromURL();
    const totalBox = document.getElementById("total-box");
    const totalSpan = document.getElementById("total-global");

    if (!pedidoDiv) return;

    if (cart.length === 0) {
        pedidoDiv.innerHTML = `
            <div style="text-align:center; padding:60px 20px; color:#ccc;">
                <div style="font-size:80px; opacity:0.3;">🥗</div>
                <p>Tu carrito está vacío</p>
            </div>`;
        if (totalBox) totalBox.style.display = "none";
        return;
    }

    pedidoDiv.innerHTML = "";
    let totalGlobal = 0;

    cart.forEach((item, index) => {
        totalGlobal += parseFloat(item.total);
        
        let configParams = "";
        if (item.config) {
            for (let key in item.config) {
                configParams += `&${key}=${item.config[key]}`;
            }
        }

        const cartString = encodeURIComponent(JSON.stringify(cart));
        const urlEditar = `${item.page}?cart=${cartString}&editIndex=${index}${configParams}`;

        pedidoDiv.innerHTML += `
            <div class="cart-item">
                <div class="cart-info">
                    <strong>${item.nombre}</strong>
                    <p class="extras-small">${item.extras || 'Personalizado'}</p>
                    <span class="price-tag">$${parseFloat(item.total).toFixed(2)}</span>
                </div>
                <div class="cart-actions">
                    <button class="action-btn" title="Editar" onclick="location.href='${urlEditar}'">✏️</button>
                    <button class="action-btn" title="Eliminar" onclick="eliminarPlato(${index})">🗑️</button>
                </div>
            </div>`;
    });

    if (totalSpan) totalSpan.innerText = totalGlobal.toFixed(2);
    if (totalBox) totalBox.style.display = "block";
}
function procesarFinalizado() {
    // 1. Referencias
    const campoNombre = document.getElementById("nombre");
    const campoCedula = document.getElementById("cedula");
    const campoTelefono = document.getElementById("telefono");
    const campoDireccion = document.getElementById("direccion");

    // 2. Validar que existan y tengan texto
    if (!campoNombre.value || !campoCedula.value || !campoTelefono.value || !campoDireccion.value) {
        alert("⚠️ Por favor, rellena todos los campos.");
        return;
    }

    const ahora = new Date();
    
    // 3. Crear el objeto con la DIRECCIÓN
    const datosTicket = {
        codigo: "MF-" + Math.floor(100000 + Math.random() * 900000),
        cliente: campoNombre.value.trim(),
        cedula: campoCedula.value.trim(),
        telefono: campoTelefono.value.trim(),
        direccion: campoDireccion.value.trim(),
        fecha: ahora.toLocaleDateString('es-ES'),
        hora: ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // 4. Guardar y Redirigir
    localStorage.setItem("ticketAPK", JSON.stringify(datosTicket));
    window.location.href = "ver-ticket.html";
}

// 4. Navegación
function validarYConfirmar() {
    const cart = getCartFromURL();
    if (cart.length === 0) {
        document.getElementById("modal-vacio").style.display = "flex";
    } else {
        document.getElementById("modal-registro").style.display = "flex";
    }
}

function cerrarModales() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none');
}

function eliminarPlato(index) {
    let cart = getCartFromURL();
    cart.splice(index, 1);
    const cartString = encodeURIComponent(JSON.stringify(cart));
    window.location.href = `pedido.html?cart=${cartString}`;
}

function irAMenu() {
    const cart = getCartFromURL();
    const cartString = encodeURIComponent(JSON.stringify(cart));
    window.location.href = `menu.html?cart=${cartString}`;
}

window.onload = mostrarPedido;