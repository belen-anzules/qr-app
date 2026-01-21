document.addEventListener("DOMContentLoaded", function() {
    const app = document.getElementById("app");
    const params = new URLSearchParams(window.location.search);
    
    const ticket = {
        codigo: params.get('cod'),
        cliente: params.get('nom'),
        cedula: params.get('ci'),
        telefono: params.get('tel'),
        direccion: params.get('dir'), // Extrae dirección de la URL
        fecha: params.get('fec'),
        hora: params.get('hor')
    };

    if (ticket.codigo) {
        app.innerHTML = `
            <div style="font-size:40px;">✅</div>
            <h2>¡Pedido Listo!</h2>
            
            <div class="codigo-box">${ticket.codigo}</div>

            <div class="cuadro">
                <strong>👤 Cliente:</strong> ${ticket.cliente}<br>
                <strong>📄 Cédula:</strong> ${ticket.cedula}<br>
                <strong>📱 Teléfono:</strong> ${ticket.telefono}<br>
                <strong>📍 Dirección:</strong> ${ticket.direccion}<br> <hr style="border:0; border-top:1px solid #eee; margin:10px 0;">
                <strong>📅 Fecha:</strong> ${ticket.fecha}<br>
                <strong>⏰ Hora:</strong> ${ticket.hora}
            </div>

            <button class="btn-verde" onclick="window.print()">IMPRIMIR O CAPTURAR</button>
            <button class="btn-verde btn-outline" onclick="location.href='menu.html'">NUEVO PEDIDO</button>
        `;
    } else {
        app.innerHTML = `
            <div style="font-size:60px;">⚠️</div>
            <h2>Error de Datos</h2>
            <p>No se recibió la información del pedido.</p>
            <button class="btn-verde" onclick="location.href='menu.html'">VOLVER AL MENÚ</button>
        `;
    }
});