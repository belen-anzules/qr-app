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

/* ===================== */
/* HELPERS */
/* ===================== */
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function saveCurrentDish() {
  sessionStorage.setItem("currentDish", JSON.stringify(ingredients));
}

function loadCurrentDish() {
  const saved = sessionStorage.getItem("currentDish");
  if (!saved) return;

  const data = JSON.parse(saved);
  for (let key in ingredients) {
    ingredients[key].qty = data[key]?.qty || 0;
  }
}

/* ===================== */
/* INGREDIENTES */
/* ===================== */
function add(name) {
  ingredients[name].qty++;
  saveCurrentDish();
  updateUI();
}

function remove(name) {
  if (ingredients[name].qty > 0) {
    ingredients[name].qty--;
    saveCurrentDish();
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
/* GUARDAR PLATO */
/* ===================== */
function saveDish(isBase = false) {
  const cart = getCart();
  const editIndex = sessionStorage.getItem("editIndex");

  let extras = [];
  let totalPrice = DISH.basePrice;
  let totalKcal = DISH.baseKcal;

  if (!isBase) {
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
  }

  const dish = {
    name: DISH.name,
    extras,
    totalPrice,
    totalKcal
  };

  if (editIndex !== null) {
    cart[editIndex] = dish;
    sessionStorage.removeItem("editIndex");
  } else {
    cart.push(dish);
  }

  saveCart(cart);
  sessionStorage.removeItem("currentDish");

  showSuccess(() => {
    window.location.href = "pedido.html";
  });
}

/* ===================== */
/* UI */
/* ===================== */
function showSuccess(callback) {
  const modal = document.getElementById("success-modal");
  modal.classList.remove("hidden");

  setTimeout(() => {
    modal.classList.add("hidden");
    if (callback) callback();
  }, 1200);
}

function goToOrder() {
  window.location.href = "pedido.html";
}

/* ===================== */
/* INIT */
/* ===================== */
document.addEventListener("DOMContentLoaded", () => {
  loadCurrentDish();
  updateUI();

  const baseBtn = document.getElementById("add-base");
  const customBtn = document.getElementById("add-custom");

  if (baseBtn) baseBtn.onclick = () => saveDish(true);
  if (customBtn) customBtn.onclick = () => saveDish(false);
});
