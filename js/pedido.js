const pedidoDiv = document.getElementById("pedido-lista");

function getCartFromURL() {
    const params = new URLSearchParams(window.location.search);
    const cartData = params.get('cart');
    return cartData ? JSON.parse(decodeURIComponent(cartData)) : [];
}

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
                    <strong>${item.nombre}</strong>
                    <p class="extras-small">${item.extras}</p>
                    <span class="price-tag">$${parseFloat(item.total).toFixed(2)}</span>
                </div>
                <div class="cart-actions">
                    <button class="edit-btn" onclick="location.href='${urlEditar}'">✏️</button>
                    <button class="delete-btn" onclick="eliminarPlato(${index})">🗑️</button>
                </div>
            </div>
        `;
    });

    if(totalSpan) totalSpan.innerText = totalGlobal.toFixed(2);
    if(totalBox) totalBox.style.display = "block";
}

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

// ESTA FUNCIÓN PROCESA TODO Y ENVÍA AL MENÚ
function procesarFinalizado() {
    const nom = document.getElementById("nombre").value.trim();
    if (!nom) { alert("⚠️ Ingresa tu nombre"); return; }

    const cod = "TK-" + Math.floor(1000 + Math.random() * 9000);
    const ahora = new Date();
    
    const datos = {
        codigo: cod,
        cliente: nom,
        fecha: ahora.toLocaleDateString(),
        hora: ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // 1. Guardar en LocalStorage (Persistencia APK)
    localStorage.setItem('ticketAPK', JSON.stringify(datos));

    const container = document.getElementById("modal-content-registro");
    container.innerHTML = `
        <div style="font-size: 50px;">✨</div>
        <h2 style="margin:10px 0;">¡Pedido Exitoso!</h2>
        <div style="font-size: 2.5rem; font-weight: 900; color: #4CAF50; margin: 20px 0; border: 3px dashed #4CAF50; padding: 15px;">
            ${cod}
        </div>
        <button onclick="window.location.href='menu.html?tk=${cod}&nom=${encodeURIComponent(nom)}'" 
                style="background:#4CAF50; color:white; border:none; padding:15px; width:100%; border-radius:15px; font-weight:bold; cursor:pointer;">
            VOLVER AL MENÚ
        </button>
    `;
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