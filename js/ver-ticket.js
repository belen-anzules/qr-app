document.addEventListener("DOMContentLoaded", function() {
    const app = document.getElementById("app");
    
    // 1. LA CONEXIÓN: Buscamos en la memoria interna el ticket guardado
    const datosGuardados = localStorage.getItem("ticketActual");
    const ticket = datosGuardados ? JSON.parse(datosGuardados) : null;

    // 2. VERIFICACIÓN: Si existe el ticket, lo mostramos
    if (ticket && ticket.id) {
        app.innerHTML = `
            <div style="font-size:50px; margin-bottom:10px;">✅</div>
            <h2 style="margin:0 0 10px 0;">¡Pedido Confirmado!</h2>
            <p style="color:#888; margin-bottom:20px;">Presenta este ticket en caja</p>
            
            <div class="codigo-box" style="background:#e8f5e9; color:#2e7d32; padding:15px; border-radius:15px; font-size:1.5rem; font-weight:900; border:2px dashed #4CAF50; margin-bottom:20px;">
                ${ticket.id}
            </div>

            <div class="cuadro" style="text-align:left; background:#fff; padding:20px; border-radius:20px; box-shadow:0 4px 15px rgba(0,0,0,0.05);">
                <strong>👤 Cliente:</strong> ${ticket.cliente}<br>
                <strong>📄 Cédula:</strong> ${ticket.cedula}<br>
                <strong>📱 Teléfono:</strong> ${ticket.telefono}<br>
                <strong>📍 Dirección:</strong> ${ticket.direccion}<br> 
                <hr style="border:0; border-top:1px solid #eee; margin:15px 0;">
                <div style="display:flex; justify-content:space-between;">
                    <span><strong>📅 Fecha:</strong> ${ticket.fecha}</span>
                    <span><strong>⏰ Hora:</strong> ${ticket.hora}</span>
                </div>
                <div style="font-size:1.4rem; margin-top:15px; color:#4CAF50; text-align:center;">
                    <strong>TOTAL: $${ticket.total}</strong>
                </div>
            </div>

            <div style="margin-top:25px; display:grid; gap:10px;">
                <button class="btn-verde" style="background:#4CAF50; color:white; border:none; padding:18px; border-radius:15px; font-weight:bold; width:100%; cursor:pointer;" onclick="window.print()">
                    🖨️ IMPRIMIR O CAPTURAR
                </button>
                <button class="btn-verde btn-outline" style="background:transparent; color:#4CAF50; border:2px solid #4CAF50; padding:15px; border-radius:15px; font-weight:bold; width:100%; cursor:pointer;" onclick="nuevoPedido()">
                    🥗 NUEVO PEDIDO
                </button>
            </div>
        `;
    } else {
        // Si no hay conexión de datos, mostramos error
        app.innerHTML = `
            <div style="font-size:60px;">⚠️</div>
            <h2>No hay pedido activo</h2>
            <p>Parece que no hay datos de tu compra.</p>
            <button class="btn-verde" style="background:#4CAF50; color:white; border:none; padding:15px 30px; border-radius:15px; font-weight:bold; cursor:pointer;" onclick="location.href='menu.html'">
                IR AL MENÚ
            </button>
        `;
    }
});

function nuevoPedido() {
    localStorage.removeItem("ticketActual"); // Limpiamos el ticket viejo
    location.href = 'menu.html';
}