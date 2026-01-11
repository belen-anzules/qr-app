const DISH = { name: "Bowl Chipsotle", basePrice: 7.99 };

const ingredients = {
  arroz: { name: "Arroz integral", price: 1.5, qty: 0 },
  pollo: { name: "Pollo", price: 2, qty: 0 },
  frejol: { name: "Frejol", price: 1, qty: 0 }
};

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateUI() {
  let total = DISH.basePrice;
  for (let k in ingredients) {
    document.getElementById(`${k}-qty`).innerText = ingredients[k].qty;
    total += ingredients[k].qty * ingredients[k].price;
  }
  document.getElementById("total-price").innerText = total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
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

  document.getElementById("add-base").addEventListener("click", () => {
    const cart = getCart();
    cart.push({ name: DISH.name, extras: [], totalPrice: DISH.basePrice });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "pedido.html";
  });

  document.getElementById("add-custom").addEventListener("click", () => {
    const cart = getCart();
    const extras = Object.values(ingredients).filter(i => i.qty > 0);
    let total = DISH.basePrice;
    extras.forEach(e => total += e.qty * e.price);

    cart.push({ name: DISH.name, extras, totalPrice: total });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "pedido.html";
  });

  document.getElementById("go-order").addEventListener("click", () => {
    window.location.href = "pedido.html";
  });

  updateUI();
});
