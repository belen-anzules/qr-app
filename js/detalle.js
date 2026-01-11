const DISH = {
  name: "Bowl Chipsotle",
  basePrice: 7.99,
  baseKcal: 450
};

const ingredients = {
  arroz: { name: "Arroz integral", kcal: 215, price: 1.5, qty: 0 },
  pollo: { name: "Pollo", kcal: 200, price: 2.0, qty: 0 },
  frejol: { name: "Frejol", kcal: 110, price: 1.0, qty: 0 }
};

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function add(name) {
  ingredients[name].qty++;
  updateUI();
}

function remove(name) {
  if (ingredients[name].qty > 0) {
    ingredients[name].qty--;
    updateUI();
  }
}

function updateUI() {
  let price = DISH.basePrice;
  let kcal = DISH.baseKcal;

  for (let key in ingredients) {
    document.getElementById(`${key}-qty`).innerText = ingredients[key].qty;
    price += ingredients[key].price * ingredients[key].qty;
    kcal += ingredients[key].kcal * ingredients[key].qty;
  }

  document.getElementById("total-price").innerText = price.toFixed(2);
  document.getElementById("total-kcal").innerText = kcal;
}

function addBaseDish() {
  const cart = getCart();
  cart.push({
    name: DISH.name,
    extras: [],
    totalPrice: DISH.basePrice,
    totalKcal: DISH.baseKcal
  });
  saveCart(cart);
  showSuccess();
}

function addCustomDish() {
  const cart = getCart();
  const extras = [];
  let price = DISH.basePrice;
  let kcal = DISH.baseKcal;

  for (let key in ingredients) {
    if (ingredients[key].qty > 0) {
      extras.push({ ...ingredients[key] });
      price += ingredients[key].price * ingredients[key].qty;
      kcal += ingredients[key].kcal * ingredients[key].qty;
    }
  }

  cart.push({ name: DISH.name, extras, totalPrice: price, totalKcal: kcal });
  saveCart(cart);
  showSuccess();
}

function showSuccess() {
  document.getElementById("success-modal").classList.remove("hidden");
  setTimeout(() => window.location.href = "pedido.html", 1000);
}

function goToOrder() {
  window.location.href = "pedido.html";
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("add-base").onclick = addBaseDish;
  document.getElementById("add-custom").onclick = addCustomDish;
  updateUI();
});
