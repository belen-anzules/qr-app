const basePrice = 6.00;
const ingredients = {
    pollo: { name: "Pechuga Grill", price: 2.0, calories: 165, protein: 31, fat: 3.6, carbs: 0, qty: 1, included: true },
    lechuga: { name: "Mix Lechugas", price: 0.5, calories: 15, protein: 1.2, fat: 0.2, carbs: 2.8, qty: 1, included: true },
    queso: { name: "Parmesano", price: 1.0, calories: 110, protein: 10, fat: 7, carbs: 0.9, qty: 1, included: true }
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
    const item = { nombre: "Ensalada César Fit", page: "cena2.html", extras: extrasArray.join(", ") || "Receta estándar", total: document.getElementById("total-price").innerText, config: configActual };
    if (editIndex !== null) cart[editIndex] = item;
    else cart.push(item);
    window.location.href = `pedido.html?cart=${encodeURIComponent(JSON.stringify(cart))}`;
}
window.onload = cargarConfiguracion;