const basePrice = 7.99;

const ingredients = {
    arroz: { name: "Arroz Blanco", price: 0.8, calories: 198, protein: 4, fat: 0.4, carbs: 44, qty: 1 },
    pollo: { name: "Pollo Desmechado", price: 0.9, calories: 165, protein: 31, fat: 3.6, carbs: 0, qty: 1 },
    frijoles: { name: "Frijoles Rojos", price: 0.5, calories: 76, protein: 5, fat: 0.3, carbs: 13.5, qty: 1 },
    guacamole: { name: "Guacamole", price: 0.3, calories: 80, protein: 1, fat: 7.4, carbs: 4, qty: 1 },
    tortilla: { name: "Tortilla Chips", price: 0.7, calories: 74, protein: 1, fat: 1.5, carbs: 15, qty: 1 },
    pico: { name: "Pico de Gallo", price: 0.7, calories: 11, protein: 0.4, fat: 0.1, carbs: 2.5, qty: 1 },
    salsa: { name: "Salsa Chipotle", price: 0.7, calories: 45, protein: 0.3, fat: 4, carbs: 2, qty: 1 },
    lcl: { name: "Lechuga, Cilantro y Limón", price: 0.7, calories: 12, protein: 0.8, fat: 0.1, carbs: 2, qty: 1 }
};

let editIndex = null;

function cargarConfiguracion() {
    updateUI();
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
}

function updateUI() {
    let totalCal = 0, totalPro = 0, totalFat = 0, totalCarb = 0;
    let totalPrice = basePrice;

    for (let key in ingredients) {
        const ing = ingredients[key];

        setText(`${key}-qty`, ing.qty);
        setText(`cal-${key}`, ing.calories * ing.qty);
        setText(`pro-${key}`, (ing.protein * ing.qty).toFixed(1));
        setText(`fat-${key}`, (ing.fat * ing.qty).toFixed(1));
        setText(`carb-${key}`, (ing.carbs * ing.qty).toFixed(1));

        totalCal += ing.calories * ing.qty;
        totalPro += ing.protein * ing.qty;
        totalFat += ing.fat * ing.qty;
        totalCarb += ing.carbs * ing.qty;

        if (ing.qty === 0) totalPrice -= ing.price;
        if (ing.qty > 1) totalPrice += (ing.qty - 1) * ing.price;
    }

    setText("total-calories", totalCal);
    setText("total-protein", totalPro.toFixed(1));
    setText("total-fat", totalFat.toFixed(1));
    setText("total-carbs", totalCarb.toFixed(1));
    setText("total-price", totalPrice.toFixed(2));
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
    alert("Pedido confirmado ✅");
}

window.onload = cargarConfiguracion;
