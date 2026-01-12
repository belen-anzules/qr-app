const basePrice = 3.99;

const ingredients = {
  pan: {
    name: "Pan Integral",
    price: 0.8,
    calories: 120,
    protein: 4,
    fat: 1,
    carbs: 24,
    qty: 1,
    included: true
  },
  aguacate: {
    name: "Aguacate",
    price: 0.9,
    calories: 130,
    protein: 1.5,
    fat: 12,
    carbs: 7,
    qty: 1,
    included: true
  },
  huevos: {
    name: "Huevos Poché",
    price: 0.5,
    calories: 145,
    protein: 13,
    fat: 10,
    carbs: 1,
    qty: 1,
    included: true
  },
  tomates: {
    name: "Tomates Cherry",
    price: 0.3,
    calories: 10,
    protein: 0.5,
    fat: 0.1,
    carbs: 2,
    qty: 1,
    included: true
  },
  chia: {
    name: "Semillas de Chía",
    price: 0.7,
    calories: 25,
    protein: 1,
    fat: 1.5,
    carbs: 2,
    qty: 1,
    included: true
  }
};

function updateUI() {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalFat = 0;
  let totalCarbs = 0;
  let totalPrice = basePrice;

  for (let key in ingredients) {
    const ing = ingredients[key];

    document.getElementById(`${key}-qty`).innerText = ing.qty;

    const cal = ing.calories * ing.qty;
    const pro = ing.protein * ing.qty;
    const fat = ing.fat * ing.qty;
    const carb = ing.carbs * ing.qty;

    document.getElementById(`cal-${key}`).innerText = cal;
    document.getElementById(`pro-${key}`).innerText = pro;
    document.getElementById(`fat-${key}`).innerText = fat;
    document.getElementById(`carb-${key}`).innerText = carb;

    totalCalories += cal;
    totalProtein += pro;
    totalFat += fat;
    totalCarbs += carb;

    // 🔥 SOLO AFECTA PRECIO SI:
    // 1. Es extra
    // 2. O se quitó un ingrediente base
    if (ing.included) {
      if (ing.qty === 0) {
        totalPrice -= ing.price;
      } else if (ing.qty > 1) {
        totalPrice += (ing.qty - 1) * ing.price;
      }
    } else {
      totalPrice += ing.qty * ing.price;
    }
  }

  document.getElementById("total-calories").innerText = totalCalories;
  document.getElementById("total-protein").innerText = totalProtein.toFixed(1);
  document.getElementById("total-fat").innerText = totalFat.toFixed(1);
  document.getElementById("total-carbs").innerText = totalCarbs.toFixed(1);
  document.getElementById("total-price").innerText = totalPrice.toFixed(2);
}


function addIng(key) {
  ingredients[key].qty++;
  updateUI();
}

function removeIng(key) {
  if (ingredients[key].qty > 0) {
    ingredients[key].qty--;
    updateUI();
  }
}

function confirmarPedido() {
  const pedido = {
    nombre: "Tostada con Aguacate y Huevo Poché",
    total: document.getElementById("total-price").innerText,
    calorias: document.getElementById("total-calories").innerText,
    ingredientes: ingredients
  };

  localStorage.setItem("cart", JSON.stringify([pedido]));
  window.location.href = "pedido.html";
}

updateUI();
