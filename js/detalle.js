const basePrice = 7.99;

const ingredients = {
  arroz: { price: 1.5, qty: 0 },
  pollo: { price: 2.0, qty: 0 }
};

function updateTotal() {
  let total = basePrice;
  for (let k in ingredients) {
    total += ingredients[k].qty * ingredients[k].price;
    document.getElementById(k).innerText = ingredients[k].qty;
  }
  document.getElementById("total").innerText = total.toFixed(2);
}

function addIng(name) {
  ingredients[name].qty++;
  updateTotal();
}

function removeIng(name) {
  if (ingredients[name].qty > 0) ingredients[name].qty--;
  updateTotal();
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function goPedido() {
  location.href = "pedido.html";
}

function addBase() {
  const cart = getCart();
  cart.push({
    name: "Bowl Chipsotle",
    extras: [],
    total: basePrice
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  location.href = "pedido.html";
}

function addCustom() {
  const cart = getCart();
  let total = basePrice;
  let extras = [];

  for (let k in ingredients) {
    if (ingredients[k].qty > 0) {
      extras.push({
        name: k,
        qty: ingredients[k].qty
      });
      total += ingredients[k].qty * ingredients[k].price;
    }
  }

  cart.push({
    name: "Bowl Chipsotle",
    extras,
    total
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  location.href = "pedido.html";
}

updateTotal();
