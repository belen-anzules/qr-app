/* ==========================================
   MACRO FIT - VER TICKET
========================================== */
function obtenerTicketDesdeURL() {
    const params = new URLSearchParams(window.location.search);

    if (!params.has("codigo")) return null;

    return {
        codigo: params.get("codigo"),
        cliente: params.get("cliente"),
        fecha: params.get("fecha"),
        hora: params.get("hora")
    };
}

function mostrarTicket() {
    const app = document.getElementById("app");
    const t = obtenerTicketDesdeURL();

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

window.onload = mostrarTicket;
