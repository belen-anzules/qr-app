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
  alert("Producto añadido al carrito 🛒");
}
