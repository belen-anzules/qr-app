function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

const container = document.getElementById("order-container");
const cart = getCart();

function renderOrder() {
  container.innerHTML = "";

  if (!cart.length) {
    container.innerHTML = "<p class='empty'>Pedido vacío 🍽️</p>";
    return;
  }

  cart.forEach(item => {
    container.innerHTML += `
      <div class="order-item">
        <div class="emoji">🥗</div>
        <div class="order-info">
          <strong>${item.name}</strong>
          ${item.extras.length
            ? "<ul>" + item.extras.map(e => `<li>${e.qty}× ${e.name}</li>`).join("") + "</ul>"
            : "<small>Plato base</small>"}
        </div>
        <strong>$${item.totalPrice.toFixed(2)}</strong>
      </div>
    `;
  });
}

function goToDish() {
  window.location.href = "detalle.html";
}

renderOrder();
