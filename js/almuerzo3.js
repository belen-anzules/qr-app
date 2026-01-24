const basePrice = 7.99;
const ingredients = {
    // 120g de Pechuga de pollo a la plancha
    pollo: { name: "Pechuga de Pollo", price: 0.8, calories: 198, protein: 37, fat: 4.5, carbs: 0, qty: 1, included: true },
    
    // 75g de Arroz cocido (una porción moderada, aprox 1/3 de taza)
    arroz: { name: "Arroz", price: 0.9, calories: 98, protein: 2.1, fat: 0.2, carbs: 21.2, qty: 1, included: true },
    
    // 50g de Garbanzos cocidos (fuente de fibra y proteína vegetal)
    garbanzos: { name: "Garbanzos", price: 0.5, calories: 82, protein: 4.5, fat: 1.3, carbs: 13.7, qty: 1, included: true },
    
    // 15g de Queso Feta desmenuzado
    queso: { name: "Queso", price: 0.3, calories: 40, protein: 2.1, fat: 3.2, carbs: 0.6, qty: 1, included: true },
    
    // Mix de 50g de Tomate cherry y Pepino (muy bajo en calorías, alto en hidratación)
    tomate: { name: "Tomate Cherry y Pepino", price: 0.7, calories: 12, protein: 0.6, fat: 0.1, carbs: 2.4, qty: 1, included: true },
    
    // 4-5 Aceitunas negras o verdes
    aceituna: { name: "Aceitunas", price: 0.7, calories: 25, protein: 0.2, fat: 2.6, carbs: 0.8, qty: 1, included: true },
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
        nombre: "Bowl Mediterraneo",
        page: "almuerzo3.html", // <--- IMPORTANTE PARA EDITAR
        extras: extrasArray.join(", ") || "Receta estándar",
        total: document.getElementById("total-price").innerText,
        config: configActual
    };

    if (editIndex !== null) cart[editIndex] = item;
    else cart.push(item);

    window.location.href = `pedido.html?cart=${encodeURIComponent(JSON.stringify(cart))}`;
}

window.onload = cargarConfiguracion;