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
    name: "Yogur Griego Natural",
    price: 0.9,
    calories: 120,
    protein: 10,
    fat: 4,
    carbs: 6,
    qty: 1,
    included: true
  },
  leche: {
    name: "Leche de Almendras",
    price: 0.5,
    calories: 30,
    protein: 1,
    fat: 2.5,
    carbs: 1,
    qty: 1,
    included: true
  },
  zucchini: {
    name: "Zucchini",
    price: 0.3,
    calories: 20,
    protein: 1,
    fat: 0.2,
    carbs: 4,
    qty: 1,
    included: true
  },
  nueces: {
    name: "Nueces Picadas",
    price: 0.7,
    calories: 90,
    protein: 2.2,
    fat: 9,
    carbs: 3,
    qty: 1,
    included: true
  },
  arandanos: {
    name: "Arándanos Frescos",
    price: 0.6,
    calories: 40,
    protein: 0.5,
    fat: 0.1,
    carbs: 9,
    qty: 1,
    included: true
  },
  miel: {
    name: "Miel de Abeja",
    price: 0.4,
    calories: 60,
    protein: 0,
    fat: 0,
    carbs: 17,
    qty: 0,
    included: false // opcional
  }
};

function updateUI() {
  let totalCal = 0;
  let totalPro = 0;
  let totalFat = 0;
  let totalCarb = 0;
  let totalPrice = basePrice;

  for (let key in ingredients) {
    const ing = ingredients[key];

    // actualizar cantidades
    document.getElementById(`${key}-qty`).innerText = ing.qty;

    // valores nutricionales
    const cal = ing.calories * ing.qty;
    const pro = ing.protein * ing.qty;
    const fat = ing.fat * ing.qty;
    const carb = ing.carbs * ing.qty;

    document.getElementById(`cal-${key}`).innerText = cal;
    document.getElementById(`pro-${key}`).innerText = pro.toFixed(1);
    document.getElementById(`fat-${key}`).innerText = fat.toFixed(1);
    document.getElementById(`carb-${key}`).innerText = carb.toFixed(1);

    totalCal += cal;
    totalPro += pro;
    totalFat += fat;
    totalCarb += carb;

    // lógica de precio
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

  document.getElementById("total-calories").innerText = totalCal;
  document.getElementById("total-protein").innerText = totalPro.toFixed(1);
  document.getElementById("total-fat").innerText = totalFat.toFixed(1);
  document.getElementById("total-carbs").innerText = totalCarb.toFixed(1);
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
  let extras = [];

  for (let key in ingredients) {
    const ing = ingredients[key];
    if (ing.qty === 0 && ing.included) extras.push(`Sin ${ing.name}`);
    if (ing.qty > 1) extras.push(`${ing.qty}x ${ing.name}`);
    if (!ing.included && ing.qty > 0) extras.push(`${ing.qty}x ${ing.name}`);
  }

  const item = {
    nombre: "Overnight Oats Zucchini Bread",
    total: document.getElementById("total-price").innerText,
    extras: extras.join(", ") || "Receta estándar"
  };

  localStorage.setItem("pedido", JSON.stringify(item));
  window.location.href = "pedido.html";
}

// inicial
updateUI();
