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
  const editIndex = localStorage.getItem("editIndex");

  const dishData = {
    id: Date.now(),
    name: DISH.name,
    extras,
    totalPrice,
    totalKcal
  };

  if (editIndex !== null) {
    cart[editIndex] = dishData;
    localStorage.removeItem("editIndex");
  } else {
    cart.push(dishData);
  }

  saveCart(cart);
  showSuccess();
}

/* ===================== */
/* EDITAR PLATO */
/* ===================== */
function loadEditDish() {
  const editIndex = localStorage.getItem("editIndex");
  if (editIndex === null) return;

  const cart = getCart();
  const dish = cart[editIndex];
  if (!dish || !dish.extras) return;

  for (let key in ingredients) {
    ingredients[key].qty = 0;
  }

  dish.extras.forEach(extra => {
    for (let key in ingredients) {
      if (ingredients[key].name === extra.name) {
        ingredients[key].qty = extra.qty;
      }
    }
  });

  updateUI();
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
  const baseBtn = document.getElementById("add-base");
  const customBtn = document.getElementById("add-custom");

  if (baseBtn) baseBtn.onclick = addBaseDish;
  if (customBtn) customBtn.onclick = addCustomDish;

  loadEditDish();
});
