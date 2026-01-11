const DISH = {
  name: "Bowl Chipsotle",
  basePrice: 7.99
};

const ingredients = {
  arroz: { name: "Arroz integral", price: 1.5, qty: 0 },
  pollo: { name: "Pollo", price: 2.0, qty: 0 },
  frejol: { name: "Frejol", price: 1.0, qty: 0 }
};

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateUI() {
  let total = DISH.basePrice;

  for (let key in ingredients) {
    document.getElementById(`${key}-qty`).textContent = ingredients[key].qty;
    total += ingredients[key].qty * ingredients[key].price;
  }

  document.getElementById("total-price").textContent = total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {

  // ➕ ➖ INGREDIENTES
  document.querySelectorAll(".plus").forEach(btn => {
    btn.addEventListener("click", () => {
      ingredients[btn.dataset.ing].qty++;
      updateUI();
    });
  });

  document.querySelectorAll(".minus").forEach(btn => {
    btn.addEventListener("click", () => {
      const ing = ingredients[btn.dataset.ing];
      if (ing.qty > 0) ing.qty--;
      updateUI();
    });
  });

  // 🧾 ICONO PEDIDO
  document.getElementById("go-order").addEventListener("click", () => {
    location.assign("pedido.html");
  });

  // 🥗 PLATO BASE
  document.getElementById("add-base").addEventListener("click", () => {
    const cart = getCart();

    cart.push({
      name: DISH.name,
      extras: [],
      totalPrice: DISH.basePrice
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    // ✅ APK SAFE
    setTimeout(() => {
      location.assign("pedido.html");
    }, 200);
  });

  // 💪 PLATO PERSONALIZADO
  document.getElementById("add-custom").addEventListener("click", () => {
    const cart = getCart();
    const extras = [];
    let total = DISH.basePrice;

    for (let key in ingredients) {
      if (ingredients[key].qty > 0) {
        extras.push({ ...ingredients[key] });
        total += ingredients[key].qty * ingredients[key].price;
      }
    }

    cart.push({
      name: DISH.name,
      extras,
      totalPrice: total
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    // ✅ APK SAFE
    setTimeout(() => {
      location.assign("pedido.html");
    }, 200);
  });

  updateUI();
});
