/* ==========================================
   MACRO FIT - LÓGICA DE PEDIDO (pedido.js)
   ========================================== */

// 1. Obtener los platos desde la URL de forma segura
function getCartFromURL() {
    const params = new URLSearchParams(window.location.search);
    const cartData = params.get('cart');
    if (!cartData) return [];
    try {
        return JSON.parse(decodeURIComponent(cartData));
    } catch (e) {
        console.error("Error en JSON:", e);
        return [];
    }
}

// 2. Renderizar la lista en el HTML
function mostrarPedido() {
    const pedidoDiv = document.getElementById("pedido-lista");
    const totalBox = document.getElementById("total-box");
    const totalSpan = document.getElementById("total-global");
    const cart = getCartFromURL();

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
        totalGlobal += parseFloat(item.total || 0);
        
        const cartString = encodeURIComponent(JSON.stringify(cart));
        // Crear URL de edición manteniendo el carrito actual
        const urlEditar = `${item.page}?cart=${cartString}&editIndex=${index}`;

        pedidoDiv.innerHTML += `
            <div class="cart-item">
                <div class="cart-info">
                    <strong>${item.nombre}</strong>
                    <p class="extras-small">${item.extras || 'Personalizado'}</p>
                    <span class="price-tag">$${parseFloat(item.total).toFixed(2)}</span>
                </div>
                <div class="cart-actions">
                    <button class="action-btn" onclick="location.href='${urlEditar}'">✏️</button>
                    <button class="action-btn" onclick="eliminarPlato(${index})">🗑️</button>
                </div>
            </div>`;
    });

    if (totalSpan) totalSpan.innerText = totalGlobal.toFixed(2);
    if (totalBox) totalBox.style.display = "block";
}

// 3. Función principal para generar el Ticket
function procesarFinalizado() {
    // Captura de inputs
    const nom = document.getElementById("nombre").value.trim();
    const ci = document.getElementById("cedula").value.trim();
    const tel = document.getElementById("telefono").value.trim();
    const dir = document.getElementById("direccion").value.trim();

    // Validación
    if (!nom || !ci || !tel || !dir) {
        alert("⚠️ Por favor, completa todos los campos.");
        return;
    }

    const ahora = new Date();
    const cart = getCartFromURL();

    // Objeto final
    const datosTicket = {
        codigo: "MF-" + Math.floor(100000 + Math.random() * 900000),
        cliente: nom,
        cedula: ci,
        telefono: tel,
        direccion: dir,
        productos: cart,
        total: document.getElementById("total-global").innerText,
        fecha: ahora.toLocaleDateString('es-ES'),
        hora: ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Guardar en el almacenamiento del navegador
    localStorage.setItem("ticketAPK", JSON.stringify(datosTicket));
    
    // Redirigir a la vista del ticket
    window.location.href = "ver-ticket.html";
}

// 4. Funciones de Navegación
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

// Ejecutar al cargar
window.onload = mostrarPedido;