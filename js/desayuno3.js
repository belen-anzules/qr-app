const basePrice = 3.99;
const ingredients = {
    // 200g de Yogurt Griego natural sin azúcar (aprox. 3/4 de taza)
    yogurt: { name: "Yogurt Griego", price: 0.8, calories: 118, protein: 20, fat: 0.8, carbs: 7.2, qty: 1, included: true },
    
    // 30g de Granola Artesanal (aprox. 1/4 de taza)
    granola: { name: "Granola Artesanal", price: 0.9, calories: 135, protein: 3.2, fat: 5.8, carbs: 17.5, qty: 1, included: true },
    
    // 40g de Fresas frescas (aprox. 3 unidades medianas)
    fresas: { name: "Fresas", price: 0.5, calories: 13, protein: 0.3, fat: 0.1, carbs: 3.1, qty: 1, included: true },
    
    // 30g de Arándanos (aprox. un puñado pequeño)
    arandanos: { name: "Arándanos", price: 0.3, calories: 17, protein: 0.2, fat: 0.1, carbs: 4.4, qty: 1, included: true },
    
    // 1 cucharada (15g) de Mantequilla de Almendras natural
    mantequilla: { name: "Mantequilla de Almendras", price: 0.7, calories: 92, protein: 3.1, fat: 8.2, carbs: 2.8, qty: 1, included: true },
    
    // 1 cucharada (10g) de Semillas de Hemp (Corazones de cáñamo) - Súper proteína vegetal
    semillas: { name: "Semillas de Hemp", price: 0.7, calories: 55, protein: 3.2, fat: 4.7, carbs: 0.9, qty: 1, included: true }
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
        nombre: "Superbowl Griego",
        page: "desayuno3.html", // <--- IMPORTANTE PARA EDITAR
        extras: extrasArray.join(", ") || "Receta estándar",
        total: document.getElementById("total-price").innerText,
        config: configActual
    };

    if (editIndex !== null) cart[editIndex] = item;
    else cart.push(item);

    window.location.href = `pedido.html?cart=${encodeURIComponent(JSON.stringify(cart))}`;
}

window.onload = cargarConfiguracion;
