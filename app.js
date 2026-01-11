const basePrice = 7.99;

const ingredients = {
  arroz: { kcal: 215, price: 1.5, qty: 0 },
  pollo: { kcal: 200, price: 2.0, qty: 0 },
  frejol: { kcal: 110, price: 1.0, qty: 0 }
};

function addIngredient(name) {
  ingredients[name].qty++;
  updateUI();
}

function removeIngredient(name) {
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
    document.getElementById(`${key}-qty`).innerText = ing.qty;

    totalKcal += ing.kcal * ing.qty;
    extraPrice += ing.price * ing.qty;
  }

  document.getElementById("total-kcal").innerText = totalKcal;
  document.getElementById("total-price").innerText = (basePrice + extraPrice).toFixed(2);
}

function addToCart() {
  let order = {
    ingredients,
    totalKcal: document.getElementById("total-kcal").innerText,
    totalPrice: document.getElementById("total-price").innerText
  };

  localStorage.setItem("order", JSON.stringify(order));

  document.getElementById("view-order").classList.remove("hidden");
}

function openWelcome(type) {
  const modal = document.getElementById("welcome-modal");
  const title = document.getElementById("modal-title");
  const text = document.getElementById("modal-text");

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
  document.getElementById("welcome-modal").classList.add("hidden");
}
