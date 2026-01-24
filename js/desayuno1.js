const basePrice = 5.99;
const ingredients = {
    // 1/2 taza de avena en hojuelas (aprox 40-50g)
    avena: { name: "Avena", price: 0.8, calories: 154, protein: 6, fat: 2.8, carbs: 28, qty: 1, included: true },
    
    // 150g de Yogur Griego natural descremado (alto en proteína)
    yogurt: { name: "Yogur", price: 0.9, calories: 90, protein: 15, fat: 0.4, carbs: 6, qty: 1, included: true },
    
    // 1/2 taza de leche de almendras sin azúcar
    leche: { name: "Leche Almendras", price: 0.5, calories: 15, protein: 0.5, fat: 1.2, carbs: 0.4, qty: 1, included: true },
    
    // 50g de zucchini rallado (aporta mucha fibra y agua, pocas calorías)
    zucchini: { name: "Zucchini", price: 0.3, calories: 9, protein: 0.6, fat: 0.1, carbs: 1.7, qty: 1, included: true },
    
    // 15g de nueces picadas (aprox 3-4 unidades) - Fuente de grasa saludable
    nueces: { name: "Nueces", price: 0.7, calories: 98, protein: 2.3, fat: 9.8, carbs: 2.1, qty: 1, included: true },
    
    // 30g de arándanos frescos (un puñado pequeño)
    arandanos: { name: "Arándanos", price: 0.6, calories: 17, protein: 0.2, fat: 0.1, carbs: 4.3, qty: 1, included: true },
    
    // 1 cucharadita de miel (7g aprox) - Carbohidrato simple
    miel: { name: "Miel", price: 0.4, calories: 21, protein: 0, fat: 0, carbs: 5.7, qty: 0, included: false }
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