const DISH = {
  id: Date.now(),
  name: "Bowl Chipsotle",
  basePrice: 7.99,
  baseKcal: 450
};

const ingredients = {
  arroz: { name: "Arroz integral", kcal: 215, price: 1.5, qty: 0 },
  pollo: { name: "Pollo", kcal: 200, price: 2.0, qty: 0 },
  frejol: { name: "Frejol", kcal: 110, price: 1.0, qty: 0 }
};

/* ===================== */
/* HELPERS */
/* ===================== */
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ===================== */
/* INGREDIENTES */
/* ===================== */
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
  let extraPrice = 0;
  let extraKcal = 0;

  for (let key in ingredients) {
    const ing = ingredients[key];
    document.getElementById(`${key}-qty`).innerText = ing.qty;
    extraPrice += ing.price * ing.qty;
    extraKcal += ing.kcal * ing.qty;
  }

  document.getElementById("total-price").innerText =
    (DISH.basePrice + extraPrice).toFixed(2);

  document.getElementById("total-kcal").innerText =
    DISH.baseKcal + extraKcal;
}

/* ===================== */
/* BOTÓN 1: PLATO BASE */
/* ===================== */
function addBaseDish() {
  const cart = getCart();

  cart.push({
    id: Date.now(),
    name: DISH.name,
    extras: [],
    totalPrice: DISH.basePrice,
    totalKcal: DISH.baseKcal
  });

  saveCart(cart);
  showSuccess();
}

/* ===================== */
/* BOTÓN 2: PLATO PERSONALIZADO */
/* ===================== */
function addCustomDish() {
  const extras = [];
  let totalPrice = DISH.basePrice;
  let totalKcal = DISH.baseKcal;

  for (let key in ingredients) {
    const ing = ingredients[key];
    if (ing.qty > 0) {
      extras.push({
        name: ing.name,
        qty: ing.qty,
        price: ing.price,
        kcal: ing.kcal
      });
      totalPrice += ing.price * ing.qty;
      totalKcal += ing.kcal * ing.qty;
    }
  }

  const cart = getCart();

  cart.push({
    id: Date.now(),
    name: DISH.name,
    extras,
    totalPrice,
    totalKcal
  });

  saveCart(cart);
  showSuccess();
}

/* ===================== */
/* UI */
/* ===================== */
function showSuccess() {
  document.getElementById("success-modal").classList.remove("hidden");
}

function goToOrder() {
  window.location.href = "pedido.html";
}

/* ===================== */
/* EVENTOS */
/* ===================== */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("add-base").onclick = addBaseDish;
  document.getElementById("add-custom").onclick = addCustomDish;
});
