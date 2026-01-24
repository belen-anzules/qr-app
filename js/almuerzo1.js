const basePrice = 7.99;

const ingredients = {
    // 150g de Arroz Blanco cocido (aprox. 1 taza pequeña)
    arroz: { name: "Arroz Blanco", price: 0.8, calories: 195, protein: 4.1, fat: 0.4, carbs: 42.2, qty: 1 },
    
    // 120g de Pechuga de pollo desmechada (pesado cocido)
    pollo: { name: "Pollo Desmechado", price: 0.9, calories: 198, protein: 37, fat: 4.3, carbs: 0, qty: 1 },
    
    // 80g de Frijoles Rojos cocidos (aprox. media taza)
    frijoles: { name: "Frijoles Rojos", price: 0.5, calories: 102, protein: 6.8, fat: 0.4, carbs: 18.2, qty: 1 },
    
    // 50g de Guacamole (hecho con aguacate, limón y sal)
    guacamole: { name: "Guacamole", price: 0.3, calories: 80, protein: 1, fat: 7.4, carbs: 4.2, qty: 1 },
    
    // Una porción pequeña (15g) de Tortilla Chips para el toque "crunchy"
    tortilla: { name: "Tortilla Chips", price: 0.7, calories: 75, protein: 1.1, fat: 3.8, carbs: 9.2, qty: 1 },
    
    // 40g de Pico de Gallo fresco
    pico: { name: "Pico de Gallo", price: 0.7, calories: 11, protein: 0.5, fat: 0.1, carbs: 2.3, qty: 1 },
    
    // 2 cucharadas de Salsa Chipotle (base yogurt/mayo light)
    salsa: { name: "Salsa Chipotle", price: 0.7, calories: 50, protein: 0.5, fat: 4.8, carbs: 1.2, qty: 1 },
    
    // Mix de vegetales verdes
    lcl: { name: "Lechuga, Cilantro y Limón", price: 0.7, calories: 12, protein: 0.9, fat: 0.1, carbs: 2.1, qty: 1 }
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
        nombre: "Bowl Chips Potle",
        page: "almuerzo1.html", // <--- IMPORTANTE PARA EDITAR
        extras: extrasArray.join(", ") || "Receta estándar",
        total: document.getElementById("total-price").innerText,
        config: configActual
    };

    if (editIndex !== null) cart[editIndex] = item;
    else cart.push(item);

    window.location.href = `pedido.html?cart=${encodeURIComponent(JSON.stringify(cart))}`;
}


window.onload = cargarConfiguracion;
