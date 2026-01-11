function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

const container = document.getElementById("order-container");
let cart = getCart();

function renderOrder() {
  container.innerHTML = "";

  if (!cart.length) {
    container.innerHTML = "<p class='empty'>Pedido vacío 🍽️</p>";
    return;
  }

  let total = 0;

  cart.forEach((item, i) => {
    total += item.totalPrice;

    container.innerHTML += `
      <div class="order-item">
        <div class="emoji">🥗</div>
        <div class="order-info">
          <strong>${item.name}</strong>
          ${item.extras.length
            ? "<ul>" + item.extras.map(e => `<li>${e.qty}× ${e.name}</li>`).join("") + "</ul>"
            : "<small>Plato base</small>"}
          <p>${item.totalKcal} kcal</p>
        </div>
        <div class="order-buttons">
          <button onclick="removeItem(${i})">🗑️</button>
        </div>
        <strong>$${item.totalPrice.toFixed(2)}</strong>
      </div>
    `;
  });

  container.innerHTML += `<div class="order-summary">Total: $${total.toFixed(2)}</div>`;
}

function removeItem(i) {
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderOrder();
}

function goToDish() {
  window.location.href = "detalle.html";
}

function confirmOrder() {
  alert("¡Pedido confirmado! 🎉");
  localStorage.removeItem("cart");
  window.location.href = "menu.html";
}

renderOrder();
