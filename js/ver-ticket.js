document.addEventListener("DOMContentLoaded", function() {
    const app = document.getElementById("app");
    
    // CONEXIÓN: Leemos el objeto que guardamos en pedido.html
    const ticket = JSON.parse(localStorage.getItem("ticketActual"));

    if (ticket && ticket.id) {
        app.innerHTML = `
            <div style="font-size:40px; margin-bottom:10px;">✅</div>
            <h2 style="margin-bottom:20px;">¡Pedido Listo!</h2>
            
            <div class="status">ENVIADO A CAJA 🧾</div>
            <div class="codigo" style="font-size: 2rem; font-weight: 900; color: #4CAF50; margin: 15px 0;">
                ${ticket.id}
            </div>

            <div class="info" style="text-align: left; background: #fff; padding: 20px; border-radius: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); margin-bottom: 20px;">
                <div style="margin-bottom:8px;"><strong>👤 Cliente:</strong> ${ticket.cliente}</div>
                <div style="margin-bottom:8px;"><strong>📄 Cédula:</strong> ${ticket.cedula}</div>
                <div style="margin-bottom:8px;"><strong>📱 Teléfono:</strong> ${ticket.telefono}</div>
                <div style="margin-bottom:8px;"><strong>📍 Dirección:</strong> ${ticket.direccion}</div>
                <hr style="border:0; border-top:1px solid #eee; margin:12px 0;">
                <div style="margin-bottom:8px;"><strong>📅 Fecha:</strong> ${ticket.fecha}</div>
                <div style="margin-bottom:8px;"><strong>⏰ Hora:</strong> ${ticket.hora}</div>
                <div style="font-size:1.2rem; margin-top:10px; color: #333;"><strong>Total: $${ticket.total}</strong></div>
            </div>

            <button class="btn" style="background:#4CAF50; color:white; border:none; padding:15px; width:100%; border-radius:15px; font-weight:bold; margin-bottom:10px;" onclick="window.print()">IMPRIMIR O CAPTURAR</button>
            <button class="btn out" style="background:#eee; color:#333; border:none; padding:15px; width:100%; border-radius:15px; font-weight:bold;" onclick="location.href='menu.html'">NUEVO PEDIDO</button>
        `;
    } else {
        app.innerHTML = `
            <div style="font-size:60px;">⚠️</div>
            <h2>Sin Pedido Activo</h2>
            <p>No encontramos información de un pedido reciente.</p>
            <button class="btn" style="background:#4CAF50; color:white; border:none; padding:15px; border-radius:15px;" onclick="location.href='menu.html'">VOLVER AL MENÚ</button>
        `;
    }
});