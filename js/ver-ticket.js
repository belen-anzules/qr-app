document.addEventListener("DOMContentLoaded", function() {

    function obtenerTicketSeguro() {
        let t = localStorage.getItem("ticketAPK");
        if (!t) t = localStorage.getItem("ticketAPK_BACKUP");
        if (!t) return null;
        return JSON.parse(t);
    }

    function mostrarTicket() {
        const app = document.getElementById("app");
        const t = obtenerTicketSeguro();

        if (!t) {
            app.innerHTML = `
                <div style="font-size:60px; text-align:center;">🥗</div>
                <h3 style="text-align:center;">No hay tickets generados</h3>
                <p style="text-align:center;">Aún no se ha generado ningún ticket. Crea uno desde el menú.</p>
                <button class="btn-verde" style="display:block; margin:20px auto;" onclick="location.href='menu.html'">
                    IR AL MENÚ
                </button>
            `;
            return;
        }

        // Mostrar ticket existente
        app.innerHTML = `
            <div style="font-size:45px; text-align:center;">🧾</div>
            <h2 style="text-align:center;">Mi Ticket</h2>

            <div class="codigo-box" style="text-align:center;">${t.codigo}</div>

            <div class="info-txt">
                <strong>👤 Cliente:</strong> ${t.cliente}<br>
                <strong>📄 Cédula:</strong> ${t.cedula}<br>
                <strong>📱 Teléfono:</strong> ${t.telefono}<br>
                <strong>📅 Fecha:</strong> ${t.fecha}<br>
                <strong>⏰ Hora:</strong> ${t.hora}
            </div>

            <button class="btn-verde" onclick="location.href='menu.html'" style="margin-top:15px;">
                VOLVER AL MENÚ
            </button>
        `;
    }

    mostrarTicket();
});
