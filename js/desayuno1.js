const basePrice = 5.99;
const ingredients = {
    avena: { name: "Avena", price: 0.8, calories: 150, protein: 5, fat: 2.5, carbs: 27, qty: 1, included: true },
    yogurt: { name: "Yogur", price: 0.9, calories: 80, protein: 12, fat: 0.5, carbs: 5, qty: 1, included: true },
    leche: { name: "Leche Almendras", price: 0.5, calories: 20, protein: 0.7, fat: 1.5, carbs: 0.7, qty: 1, included: true },
    zucchini: { name: "Zucchini", price: 0.3, calories: 5, protein: 0.4, fat: 0.1, carbs: 1, qty: 1, included: true },
    nueces: { name: "Nueces", price: 0.7, calories: 98, protein: 2.2, fat: 9, carbs: 2, qty: 1, included: true },
    arandanos: { name: "Arándanos", price: 0.6, calories: 18, protein: 0.2, fat: 0.1, carbs: 4.5, qty: 1, included: true },
    miel: { name: "Miel", price: 0.4, calories: 21, protein: 0, fat: 0, carbs: 6, qty: 0, included: false }
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
        document.getElementById(`${key}-qty`).innerText = ing.qty;
        
        // Nutrición
        const c = ing.calories * ing.qty;
        const p = ing.protein * ing.qty;
        const f = ing.fat * ing.qty;
        const cb = ing.carbs * ing.qty;

        document.getElementById(`cal-${key}`).innerText = c;
        document.getElementById(`pro-${key}`).innerText = p.toFixed(1);
        document.getElementById(`fat-${key}`).innerText = f.toFixed(1);
        document.getElementById(`carb-${key}`).innerText = cb.toFixed(1);

        totalCal += c; totalPro += p; totalFat += f; totalCarb += cb;

        // Lógica de precio
        if (ing.included) {
            if (ing.qty === 0) totalPrice -= ing.price;
            else if (ing.qty > 1) totalPrice += (ing.qty - 1) * ing.price;
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

function addIng(key) { ingredients[key].qty++; updateUI(); }
function removeIng(key) { if (ingredients[key].qty > 0) { ingredients[key].qty--; updateUI(); } }

function confirmarPedido() {
    const params = new URLSearchParams(window.location.search);
    let cart = params.get('cart') ? JSON.parse(decodeURIComponent(params.get('cart'))) : [];

    let extrasArray = [];
    let configActual = {};
    for (let k in ingredients) {
        configActual[k] = ingredients[k].qty;
        if (ingredients[k].qty > 1 || (!ingredients[k].included && ingredients[k].qty > 0)) {
            extrasArray.push(`${ingredients[k].qty}x ${ingredients[k].name}`);
        } else if (ingredients[k].included && ingredients[k].qty === 0) {
            extrasArray.push(`Sin ${ingredients[k].name}`);
        }
    }

    const item = {
        nombre: "Overnight Oats",
        page: "desayuno1.html", // <--- IMPORTANTE PARA EDITAR
        extras: extrasArray.join(", ") || "Receta estándar",
        total: document.getElementById("total-price").innerText,
        config: configActual
    };

    if (editIndex !== null) cart[editIndex] = item;
    else cart.push(item);

    window.location.href = `pedido.html?cart=${encodeURIComponent(JSON.stringify(cart))}`;
}

window.onload = cargarConfiguracion;