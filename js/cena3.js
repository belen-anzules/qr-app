const basePrice = 8.50;
const ingredients = {
    // 150g de Salmón a la plancha (Peso cocido)
    // Rico en Omega-3 y Vitamina D
    salmon: { name: "Salmón Grill", price: 3.5, calories: 312, protein: 33, fat: 19, carbs: 0, qty: 1, included: true },
    
    // 100g de Quinoa Cocida (media taza aprox.)
    quinoa: { name: "Quinoa Cocida", price: 1.0, calories: 120, protein: 4.4, fat: 1.9, carbs: 21.3, qty: 1, included: true },
    
    // 50g de Edamame (corazones/sin vaina)
    // Aporta fibra y proteína vegetal
    edamame: { name: "Edamame", price: 0.8, calories: 61, protein: 5.5, fat: 2.5, carbs: 5.1, qty: 1, included: true }
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

            // Lógica de precio: resta si se quita ingrediente incluido, suma si se aumenta
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
        nombre: "Bowl Salmón Fit",
        page: "cena3.html", 
        extras: extrasArray.join(", ") || "Receta estándar",
        total: document.getElementById("total-price").innerText,
        config: configActual
    };

    if (editIndex !== null) cart[editIndex] = item;
    else cart.push(item);

    window.location.href = `pedido.html?cart=${encodeURIComponent(JSON.stringify(cart))}`;
}

window.onload = cargarConfiguracion;