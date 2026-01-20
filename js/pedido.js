/* ==========================================
   MACRO FIT - LÓGICA DE PEDIDO Y TICKET
   ========================================== */

const pedidoDiv = document.getElementById("pedido-lista");

// 1. Obtener los platos desde la URL
function getCartFromURL() {
    const params = new URLSearchParams(window.location.search);
    const cartData = params.get('cart');
    return cartData ? JSON.parse(decodeURIComponent(cartData)) : [];
}

// 2. Renderizar la lista de platos en el resumen
function mostrarPedido() {
    const cart = getCartFromURL();
    const totalBox = document.getElementById("total-box");
    const totalSpan = document.getElementById("total-global");

    if (cart.length === 0) {
        if(pedidoDiv) {
            pedidoDiv.innerHTML = `
                <div style="text-align:center; padding:60px 20px; color:#ccc;">
                    <div style="font-size:80px; opacity:0.3;">🛒</div>
                    <p>No hay platos en tu lista</p>
                </div>`;
        }
        if(totalBox) totalBox.style.display = "none";
        return;
    }

    pedidoDiv.innerHTML = "";
    let totalGlobal = 0;

    cart.forEach((item, index) => {
        totalGlobal += parseFloat(item.total);
        
        let configParams = "";
        for (let key in item.config) {
            configParams += `&${key}=${item.config[key]}`;
        }

        const cartString = encodeURIComponent(JSON.stringify(cart));
        const urlEditar = `${item.page}?cart=${cartString}&editIndex=${index}${configParams}`;

        pedidoDiv.innerHTML += `
            <div class="cart-item">
                <div class="cart-info">
                    <strong style="font-size:1.1rem">${item.nombre}</strong>
                    <p style="font-size:0.85rem; color:#888; margin:4px 0;">${item.extras || ''}</p>
                    <span class="price-tag">$${parseFloat(item.total).toFixed(2)}</span>
                </div>
                <div class="cart-actions" style="display:flex; gap:10px;">
                    <button style="border:none; background:#f0f0f0; border-radius:10px; padding:8px;" onclick="location.href='${urlEditar}'">✏️</button>
                    <button style="border:none; background:#f0f0f0; border-radius:10px; padding:8px;" onclick="eliminarPlato(${index})">🗑️</button>
                </div>
            </div>
        `;
    });

    if(totalSpan) totalSpan.innerText = totalGlobal.toFixed(2);
    if(totalBox) totalBox.style.display = "block";
}

// 3. Validar si el carrito está vacío antes de pedir datos
function validarYConfirmar() {
    const cart = getCartFromURL();
    if (cart.length === 0) {
        document.getElementById("modal-vacio").style.display = "flex";
    } else {
        document.getElementById("modal-registro").style.display = "flex";
    }
}

// 4. Cerrar ventanas emergentes
function cerrarModales() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none');
}

// 5. PROCESAR EL TICKET FINAL (Persistencia para APK y GitHub)
function procesarFinalizado() {
    const nom = document.getElementById("nombre").value.trim();
    const ci = document.getElementById("cedula").value.trim();
    const tel = document.getElementById("telefono").value.trim();

    if (!nom || !ci || !tel) { 
        alert("⚠️ Por favor completa todos tus datos."); 
        return; 
    }

    // Generar datos del ticket
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

    // GUARDAR EN LOCALSTORAGE: Esto es lo que permite que el ticket "valga" en la app
    localStorage.setItem('ticketAPK', JSON.stringify(datosTicket));

    // Cambiar contenido del modal para mostrar éxito
    const container = document.getElementById("modal-content-registro");
    container.innerHTML = `
        <div style="font-size: 50px;">✨</div>
        <h2 style="margin:10px 0;">¡Pedido Exitoso!</h2>
        <p style="color:#666">Presenta este código en caja para pagar:</p>
        <div class="order-code" style="font-size: 2.5rem; font-weight: 900; color: #4CAF50; margin: 20px 0; border: 3px dashed #4CAF50; padding: 15px;">
            ${cod}
        </div>
        <div style="background:#f9f9f9; padding:15px; border-radius:20px; text-align:left; font-size:0.9rem; margin-bottom:15px;">
            <strong>Cliente:</strong> ${nom}<br>
            <strong>Cédula:</strong> ${ci}
        </div>
        <button onclick="window.location.href='menu.html'" 
                style="background:#4CAF50; color:white; border:none; padding:15px; width:100%; border-radius:15px; font-weight:bold; cursor:pointer;">
            VOLVER AL MENÚ
        </button>
    `;
}

// 6. Funciones de navegación y limpieza
function eliminarPlato(index) {
    let cart = getCartFromURL();
    cart.splice(index, 1);
    window.location.href = `pedido.html?cart=${encodeURIComponent(JSON.stringify(cart))}`;
}

function irAMenu() {
    const cart = getCartFromURL();
    window.location.href = `menu.html?cart=${encodeURIComponent(JSON.stringify(cart))}`;
}

// Carga inicial
window.onload = mostrarPedido;