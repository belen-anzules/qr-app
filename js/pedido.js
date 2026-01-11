const pedido = document.getElementById("pedido");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

if (!cart.length) {
  pedido.innerHTML = "Pedido vacío";
} else {
  cart.forEach(p => {
    pedido.innerHTML += `
      <p>
        <strong>${p.name}</strong><br>
        ${p.extras.map(e => e.qty + "x " + e.name).join("<br>")}
        <br>Total: $${p.total}
      </p><hr>
    `;
  });
}
