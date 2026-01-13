const basePrice = 5.50;
const ingredients = {
    cerdo: { name: "Cerdo Magro", price: 1.5, calories: 180, protein: 22, fat: 9, carbs: 2, qty: 1, included: true },
    tortilla: { name: "Tortilla de Maíz", price: 0.5, calories: 50, protein: 1.2, fat: 0.5, carbs: 10, qty: 3, included: true },
    pina: { name: "Piña Asada", price: 0.4, calories: 25, protein: 0.2, fat: 0.1, carbs: 6, qty: 1, included: true },
    aguacate: { name: "Aguacate", price: 1.0, calories: 160, protein: 2, fat: 15, carbs: 9, qty: 0, included: false }
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

            // Lógica de precio idéntica a desayuno2.js
            if (ing.qty === 0) {
                if (ing.included) totalPrice -= ing.price;
            } else if (ing.qty > (key === 'tortilla' ? 3 : 1)) {
                let baseQty = (key === 'tortilla' ? 3 : 1);
                totalPrice += (ing.qty - baseQty) * ing.price;
            } else if (!ing.included && ing.qty > 0) {
                totalPrice += ing.qty * ing.price;
            }
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
        let baseQty = (k === 'tortilla' ? 3 : 1);
        if (ingredients[k].qty > baseQty) extrasArray.push(`${ingredients[k].qty}x ${ingredients[k].name}`);
        if (ingredients[k].qty === 0 && ingredients[k].included) extrasArray.push(`Sin ${ingredients[k].name}`);
    }

    const item = {
        nombre: "Tacos al Pastor Fit",
        page: "cena1.html",
        extras: extrasArray.join(", ") || "Receta estándar",
        total: document.getElementById("total-price").innerText,
        config: configActual
    };

    if (editIndex !== null) cart[editIndex] = item;
    else cart.push(item);

    window.location.href = `pedido.html?cart=${encodeURIComponent(JSON.stringify(cart))}`;
}

window.onload = cargarConfiguracion;