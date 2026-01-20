/* ==========================================
   MACRO FIT - VER TICKET
========================================== */

function obtenerTicketSeguro() {
    let t = localStorage.getItem("ticketAPK");

    if (!t) {
        t = localStorage.getItem("ticketAPK_BACKUP");
    }

    if (!t) return null;

    return JSON.parse(t);
}

function mostrarTicket() {
    const display = document.getElementById("app");
    const t = obtenerTicketSeguro();

    if (!t) {
        display.innerHTML = `
            <h3>Sin ticket activo</h3>
            <p>No se encontró ningún pedido.</p>
            <button class="btn-verde" onclick="location.href='menu.html'">
                IR AL MENÚ
            </button>
        `;
        return;
    }

    display.innerHTML = `
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

window.onload = mostrarTicket;
