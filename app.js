/* ===================================================== */
/* ================= INDEX (BIENVENIDA) ================= */
/* ===================================================== */
function openWelcome(type) {
  const modal = document.getElementById("welcome-modal");
  const title = document.getElementById("modal-title");
  const text = document.getElementById("modal-text");

  if (!modal) return;

  if (type === "register") {
    title.innerText = "¡Bienvenido a Macro Fit! 🥗";
    text.innerText = "Regístrate y empieza a mejorar tu alimentación.";
  } else {
    title.innerText = "Modo Invitado 👋";
    text.innerText = "Explora nuestros platos saludables sin registrarte.";
  }

  modal.classList.remove("hidden");
}

function closeWelcome() {
  const modal = document.getElementById("welcome-modal");
  if (modal) modal.classList.add("hidden");
}

/* ===================================================== */
/* ================= DATOS DEL PLATO =================== */
/* ===================================================== */
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

/* ===================================================== */
/* ================= STORAGE HELPERS =================== */
/* ===================================================== */
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ===================================================== */
/* ================= INGREDIENTES ====================== */
/* ===================================================== */
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
    const qtyEl = document.getElementById(`${key}-qty`);
    if (qtyEl) qtyEl.innerText = ing.qty;

    extraPrice += ing.price * ing.qty;
    extraKcal += ing.kcal * ing.qty;
  }

  const priceEl = document.getElementById("total-price");
  const kcalEl = document.getElementById("total-kcal");

  if (priceEl) priceEl.innerText = (DISH.basePrice + extraPrice).toFixed(2);
  if (kcalEl) kcalEl.innerText = DISH.baseKcal + extraKcal;
}

/* ===================================================== */
/* ================= GUARDAR PLATOS ==================== */
/* ===================================================== */
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
  const editIndex = localStorage.getItem("editIndex");

  let extras = [];
  let totalPrice = DISH.basePrice;
  let totalKcal = DISH.baseKcal;

  for (let key in ingredients) {
    const ing = ingredients[key];
    if (ing.qty > 0) {
      extras.push({ ...ing });
      totalPrice += ing.price * ing.qty;
      totalKcal += ing.kcal * ing.qty;
    }
  }

  const dish = {
    name: DISH.name,
    extras,
    totalPrice,
    totalKcal
  };

  if (editIndex !== null) {
    cart[editIndex] = dish;
    localStorage.removeItem("editIndex");
  } else {
    cart.push(dish);
  }

  saveCart(cart);
  showSuccess();
}

/* ===================================================== */
/* ================= EDITAR PLATO ====================== */
/* ===================================================== */
function loadEditDish() {
  const index = localStorage.getItem("editIndex");
  if (index === null) return;

  const cart = getCart();
  const dish = cart[index];
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

/* ===================================================== */
/* ================= UI / NAVEGACIÓN =================== */
/* ===================================================== */
function showSuccess() {
  const modal = document.getElementById("success-modal");
  if (!modal) {
    window.location.href = "pedido.html";
    return;
  }

  modal.classList.remove("hidden");

  setTimeout(() => {
    modal.classList.add("hidden");
    window.location.href = "pedido.html";
  }, 1200);
}

function goToOrder() {
  window.location.href = "pedido.html";
}

/* ===================================================== */
/* ================= INIT GLOBAL ======================= */
/* ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  loadEditDish();
  updateUI();

  const baseBtn = document.getElementById("add-base");
  const customBtn = document.getElementById("add-custom");

  if (baseBtn) baseBtn.onclick = addBaseDish;
  if (customBtn) customBtn.onclick = addCustomDish;
});
