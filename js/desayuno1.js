const basePrice = 5.99;

const ingredients = {
  avena: {
    name: "Avena Integral",
    price: 0.8,
    calories: 150,
    protein: 5,
    fat: 2.5,
    carbs: 27,
    qty: 1,
    included: true
  },
  yogurt: {
    name: "Yogur Griego",
    price: 0.9,
    calories: 80,
    protein: 12,
    fat: 0.5,
    carbs: 5,
    qty: 1,
    included: true
  },
  leche: {
    name: "Leche de Almendras",
    price: 0.5,
    calories: 20,
    protein: 0.7,
    fat: 1.5,
    carbs: 0.7,
    qty: 1,
    included: true
  },
  zucchini: {
    name: "Zucchini",
    price: 0.3,
    calories: 5,
    protein: 0.4,
    fat: 0.1,
    carbs: 1,
    qty: 1,
    included: true
  },
  nueces: {
    name: "Nueces",
    price: 0.7,
    calories: 98,
    protein: 2.2,
    fat: 9,
    carbs: 2,
    qty: 1,
    included: true
  },
  arandanos: {
    name: "Arándanos",
    price: 0.6,
    calories: 18,
    protein: 0.2,
    fat: 0.1,
    carbs: 4.5,
    qty: 1,
    included: true
  },
  miel: {
    name: "Miel",
    price: 0.4,
    calories: 21,
    protein: 0,
    fat: 0,
    carbs: 6,
    qty: 0,
    included: false // EXTRA
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
    nombre: "Overnight Oats Zucchini Bread",
    total: document.getElementById("total-price").innerText,
    calorias: document.getElementById("total-calories").innerText,
    ingredientes: ingredients
  };

  localStorage.setItem("cart", JSON.stringify([pedido]));
  window.location.href = "pedido.html";
}

updateUI();
