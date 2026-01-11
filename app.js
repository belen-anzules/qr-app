/* ===================== */
/* CONFIGURACIÓN BASE */
/* ===================== */
const basePrice = 7.99;

const ingredients = {
  arroz: { kcal: 215, price: 1.5, qty: 0 },
  pollo: { kcal: 200, price: 2.0, qty: 0 },
  frejol: { kcal: 110, price: 1.0, qty: 0 }
};

/* ===================== */
/* INGREDIENTES */
/* ===================== */
function addIngredient(name) {
  if (!ingredients[name]) return;
  ingredients[name].qty++;
  updateUI();
}

function removeIngredient(name) {
  if (!ingredients[name]) return;
  if (ingredients[name].qty > 0) {
    ingredients[name].qty--;
    updateUI();
  }
}

function updateUI() {
  let totalKcal = 0;
  let extraPrice = 0;

  for (let key in ingredients) {
    const ing = ingredients[key];

    const qtyEl = document.getElementById(`${key}-qty`);
    if (qtyEl) qtyEl.innerText = ing.qty;

    totalKcal += ing.kcal * ing.qty;
    extraPrice += ing.price * ing.qty;
  }

  const kcalEl = document.getElementById("total-kcal");
  const priceEl = document.getElementById("total-price");

  if (kcalEl) kcalEl.innerText = totalKcal;
  if (priceEl) priceEl.innerText = (basePrice + extraPrice).toFixed(2);
}

/* ===================== */
/* CARRITO (APK SAFE) */
/* ===================== */
function addToCart() {
  let hasItems = false;

  for (let key in ingredients) {
    if (ingredients[key].qty > 0) {
      hasItems = true;
      break;
    }
  }

  if (!hasItems) {
    alert("Agrega al menos un ingrediente 🥗");
    return;
  }

  // CLONAR OBJETO (CRÍTICO PARA APK)
  const clonedIngredients = JSON.parse(JSON.stringify(ingredients));

  const order = {
    ingredients: clonedIngredients,
    totalKcal: document.getElementById("total-kcal")?.innerText || "0",
    totalPrice: document.getElementById("total-price")?.innerText || "0"
  };

  try {
    localStorage.setItem("order", JSON.stringify(order));
  } catch (e) {
    console.log("LocalStorage no disponible");
  }

  // MOSTRAR BOTÓN DE PEDIDO (FORMA CORRECTA)
  const btn = document.getElementById("view-order");
  if (btn) {
    btn.classList.remove("hidden");
  }
}

/* ===================== */
/* NAVEGACIÓN */
/* ===================== */
function goToOrder() {
  window.location.href = "pedido.html";
}

/* ===================== */
/* MODAL BIENVENIDA */
/* ===================== */
function openWelcome(type) {
  const modal = document.getElementById("welcome-modal");
  const title = document.getElementById("modal-title");
  const text = document.getElementById("modal-text");

  if (!modal || !title || !text) return;

  if (type === "guest") {
    title.innerText = "¡Buen comienzo! 🥗";
    text.innerText =
      "Elegir cuidar tu alimentación ya es un gran paso. Explora nuestro menú y arma tu plato saludable.";
  } else {
    title.innerText = "¡Bienvenido a Macro Fit 💪";
    text.innerText =
      "Registrar tu cuenta te ayudará a llevar un mejor control de tu nutrición y hábitos saludables.";
  }

  modal.classList.remove("hidden");
}

function closeWelcome() {
  const modal = document.getElementById("welcome-modal");
  if (modal) modal.classList.add("hidden");
}
