/* ==========================================
   MACRO FIT - VER TICKET
   ========================================== */

function obtenerTicket() {
    let ticket = localStorage.getItem("ticketAPK");

    // Backup para WebView / APK
    if (!ticket) {
        ticket = localStorage.getItem("ticketAPK_BACKUP");
    }

    return ticket ? JSON.parse(ticket) : null;
}

function mostrarTicket() {
    const display = document.getElementById("app");
    const t = obtenerTicket();

    if (!t) {
        display.innerHTML = `
            <h3>Sin tickets activos</h3>
            <p>No tienes ningún pedido pendiente.</p>
            <button class="btn-verde" onclick="window.location.href='menu.html'">
                IR AL MENÚ
            </button>
        `;
        return;
    }

    display.innerHTML = `
        <div style="font-size:40px">🧾</div>
        <h2>Mi Ticket</h2>
        <div class="codigo-box">${t.codigo}</div>
        <div class="info-txt">
            <strong>👤 Cliente:</strong> ${t.cliente}<br>
            <strong>📅 Fecha:</strong> ${t.fecha}<br>
            <strong>⏰ Hora:</strong> ${t.hora}
        </div>
        <button class="btn-verde" onclick="window.location.href='menu.html'">
            VOLVER
        </button>
    `;
}

window.onload = mostrarTicket;
