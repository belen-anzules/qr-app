// Actualiza tu objeto de ingredientes en desayuno2.js
const ingredients = {
    pan: { name: "Pan Integral", price: 0.8, calories: 138, protein: 6, fat: 1.8, carbs: 24, qty: 1, included: true },
    aguacate: { name: "Aguacate", price: 0.9, calories: 128, protein: 1.6, fat: 11.7, carbs: 6.8, qty: 1, included: true },
    huevos: { name: "Huevos Poché", price: 0.5, calories: 143, protein: 12.6, fat: 9.5, carbs: 0.7, qty: 1, included: true },
    tomates: { name: "Tomates Cherry", price: 0.3, calories: 9, protein: 0.4, fat: 0.1, carbs: 1.9, qty: 1, included: true },
    chia: { name: "Semillas Chía", price: 0.7, calories: 24, protein: 0.8, fat: 1.5, carbs: 2.1, qty: 1, included: true },
    // Nuevo: Café Negro (Acompañante clásico)
    cafe: { name: "Café Negro", price: 1.25, calories: 2, protein: 0.3, fat: 0, carbs: 0, qty: 0, included: false }
};
let editIndex = null;

function cargarConfiguracion() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('editIndex')) {
        editIndex = params.get('editIndex');
        for (let k in ingredients) {
            if (params.has(k)) ingredients[k].qty = parseInt(params.get(k));
        }
    }
    updateUI();
}

function updateUI() {
    let totalCal = 0, totalPro = 0, totalFat = 0, totalCarb = 0, totalPrice = basePrice;

    for (let key in ingredients) {
        const ing = ingredients[key];
        if(document.getElementById(`${key}-qty`)) {
            document.getElementById(`${key}-qty`).innerText = ing.qty;
            document.getElementById(`cal-${key}`).innerText = ing.calories * ing.qty;
            document.getElementById(`pro-${key}`).innerText = (ing.protein * ing.qty).toFixed(1);
            document.getElementById(`fat-${key}`).innerText = (ing.fat * ing.qty).toFixed(1);
            document.getElementById(`carb-${key}`).innerText = (ing.carbs * ing.qty).toFixed(1);

            totalCal += ing.calories * ing.qty;
            totalPro += ing.protein * ing.qty;
            totalFat += ing.fat * ing.qty;
            totalCarb += ing.carbs * ing.qty;

            if (ing.qty === 0) totalPrice -= ing.price;
            else if (ing.qty > 1) totalPrice += (ing.qty - 1) * ing.price;
        }
    }

    document.getElementById("total-calories").innerText = totalCal;
    document.getElementById("total-protein").innerText = totalPro.toFixed(1);
    document.getElementById("total-fat").innerText = totalFat.toFixed(1);
    document.getElementById("total-carbs").innerText = totalCarb.toFixed(1);
    document.getElementById("total-price").innerText = totalPrice.toFixed(2);
}

function addIng(key) { ingredients[key].qty++; updateUI(); }
function removeIng(key) { if (ingredients[key].qty > 0) { ingredients[key].qty--; updateUI(); } }

function confirmarPedido() {
    const params = new URLSearchParams(window.location.search);
    let cart = params.get('cart') ? JSON.parse(decodeURIComponent(params.get('cart'))) : [];

    let extrasArray = [];
    let configActual = {};
    for (let k in ingredients) {
        configActual[k] = ingredients[k].qty;
        if (ingredients[k].qty > 1) extrasArray.push(`${ingredients[k].qty}x ${ingredients[k].name}`);
        if (ingredients[k].qty === 0) extrasArray.push(`Sin ${ingredients[k].name}`);
    }

    const item = {
        nombre: "Bowl Lisboa",
        page: "almuerzo2.html", // <--- IMPORTANTE PARA EDITAR
        extras: extrasArray.join(", ") || "Receta estándar",
        total: document.getElementById("total-price").innerText,
        config: configActual
    };

    if (editIndex !== null) cart[editIndex] = item;
    else cart.push(item);

    window.location.href = `pedido.html?cart=${encodeURIComponent(JSON.stringify(cart))}`;
}

window.onload = cargarConfiguracion;