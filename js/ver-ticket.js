/* ==========================================
   MACRO FIT - VER TICKET (APP + WEB)
========================================== */

function obtenerTicketSeguro() {
    // Intentamos obtener el ticket principal
    let t = localStorage.getItem("ticketAPK");

    // Si no existe, usamos el backup
    if (!t) t = localStorage.getItem("ticketAPK_BACKUP");

    // Si no hay ticket, devolvemos null
    if (!t) return null;

    return JSON.parse(t);
}

function mostrarTicket() {
    const app = document.getElementById("app");
    const t = obtenerTicketSeguro();

    if (!t) {
        app.innerHTML = `
            <div style="font-size:60px">🥗</div>
            <h3>No hay ticket activo</h3>
            <p>Genera tu pedido para ver el código.</p>
            <button class="btn-verde" onclick="location.href='menu.html'">
                IR AL MENÚ
            </button>
        `;
        return;
    }

    app.innerHTML = `
        <div style="font-size:45px">🧾</div>
        <h2>Mi Ticket</h2>

        <div class="codigo-box">${t.codigo}</div>

        <div class="info-txt">
            <strong>👤 Cliente:</strong> ${t.cliente}<br>
            <strong>📅 Fecha:</strong> ${t.fecha}<br>
            <strong>⏰ Hora:</strong> ${t.hora}
        </div>

        <button class="btn-verde" onclick="location.href='menu.html'">
            VOLVER AL MENÚ
        </button>
    `;
}

// Cargar ticket al abrir la página
window.onload = mostrarTicket;
