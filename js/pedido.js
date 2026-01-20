/* ==========================================
   MACRO FIT - LÓGICA DE PEDIDO (pedido.js)
   ========================================== */

const pedidoDiv = document.getElementById("pedido-lista");

// 1. Obtener los platos desde la URL (Mantiene la persistencia entre páginas)
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

// 2. Renderizar la lista de platos y calcular el total
function mostrarPedido() {
    const cart = getCartFromURL();
    const totalBox = document.getElementById("total-box");
    const totalSpan = document.getElementById("total-global");

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
        
        // Reconstrucción de la configuración para volver a editar el plato
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

// 3. Validar si hay platos antes de mostrar el formulario de pago
function validarYConfirmar() {
    const cart = getCartFromURL();
    if (cart.length === 0) {
        document.getElementById("modal-vacio").style.display = "flex";
    } else {
        document.getElementById("modal-registro").style.display = "flex";
    }
}

// 4. Cerrar ventanas emergentes (Modales)
function cerrarModales() {
    const modales = document.querySelectorAll('.modal-overlay');
    modales.forEach(m => m.style.display = 'none');
}

// 5. Generar código de ticket y guardar en memoria local
function procesarFinalizado() {
    const nom = document.getElementById("nombre").value.trim();
    const ci = document.getElementById("cedula").value.trim();
    const tel = document.getElementById("telefono").value.trim();

    if (!nom || !ci || !tel) { 
        alert("⚠️ Por favor, completa todos los campos para generar tu ticket."); 
        return; 
    }

    const cod = "TK-" + Math.floor(1000 + Math.random() * 9000);
    const ahora = new Date();
    
    const datosTicket = {
        codigo: cod,
        cliente: nom,
        cedula: ci,
        telefono: tel,
        fecha: ahora.toLocaleDateString(),
        hora: ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Guardar para que el icono del ticket aparezca en el menú
    localStorage.setItem('ticketAPK', JSON.stringify(datosTicket));

    // Cambiar dinámicamente el contenido del modal para mostrar el código generado
    const container = document.getElementById("modal-content-registro");
    container.innerHTML = `
        <div style="font-size: 50px;">✨</div>
        <h2 style="margin:10px 0;">¡Pedido Exitoso!</h2>
        <div class="order-code">
            ${cod}
        </div>
        <p style="color:#666; font-size: 0.9rem;">Presenta este código en caja para pagar y retirar tu pedido.</p>
        <button onclick="window.location.href='menu.html'" 
                style="background:#4CAF50; color:white; border:none; padding:15px; width:100%; border-radius:15px; font-weight:bold; cursor:pointer; margin-top:10px;">
            VOLVER AL INICIO
        </button>
    `;
}

// 6. Funciones de navegación (Importantes para no perder los platos)
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
    function guardarTicketSeguro(datos) {
    try {
        const ticketFinal = {
            ...datos,
            creado: new Date().toISOString(),
            ts: Date.now()
        };

        localStorage.setItem("ticketAPK", JSON.stringify(ticketFinal));
        localStorage.setItem("ticketAPK_BACKUP", JSON.stringify(ticketFinal));

        const test = localStorage.getItem("ticketAPK");
        return !!test;
    } catch (e) {
        console.error("Fallo guardando ticket", e);
        return false;
    }
}
localStorage.setItem('ticketAPK', JSON.stringify(datosTicket));
const ok = guardarTicketSeguro(datosTicket);

if (!ok) {
    alert("No se pudo guardar el ticket. Intenta nuevamente.");
    return;
}


// Carga inicial al abrir la página
window.onload = mostrarPedido;
