const basePrice = 7.50;
const ingredients = {
    ternera: { name: "Ternera Magra", price: 2.5, calories: 210, protein: 26, fat: 11, carbs: 0, qty: 1, included: true },
    pimientos: { name: "Mix Pimientos", price: 0.6, calories: 30, protein: 1, fat: 0.2, carbs: 6, qty: 1, included: true },
    tortilla: { name: "Tortilla Trigo", price: 0.5, calories: 90, protein: 3, fat: 2, carbs: 18, qty: 2, included: true }
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
        const qtyElement = document.getElementById(`${key}-qty`);
        
        if (qtyElement) {
            qtyElement.innerText = ing.qty;
            
            const c = ing.calories * ing.qty;
            const p = ing.protein * ing.qty;
            const f = ing.fat * ing.qty;
            const cb = ing.carbs * ing.qty;

            if(document.getElementById(`cal-${key}`)) document.getElementById(`cal-${key}`).innerText = c;
            if(document.getElementById(`pro-${key}`)) document.getElementById(`pro-${key}`).innerText = p.toFixed(1);

            totalCal += c; totalPro += p; totalFat += f; totalCarb += cb;

            // Lógica de precio: resta si es 0, suma si es extra
            if (ing.included) {
                if (ing.qty === 0) totalPrice -= ing.price;
                else if (ing.qty > (key === 'tortilla' ? 2 : 1)) {
                    totalPrice += (ing.qty - (key === 'tortilla' ? 2 : 1)) * ing.price;
                }
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
        if (ingredients[k].qty > (k === 'tortilla' ? 2 : 1)) {
            extrasArray.push(`${ingredients[k].qty}x ${ingredients[k].name}`);
        } else if (ingredients[k].qty === 0) {
            extrasArray.push(`Sin ${ingredients[k].name}`);
        }
    }

    const item = {
        nombre: "Fajitas de Ternera",
        page: "cena3.html", 
        extras: extrasArray.join(", ") || "Receta estándar",
        total: document.getElementById("total-price").innerText,
        config: configActual
    };

    if (editIndex !== null) cart[editIndex] = item;
    else cart.push(item);

    alert("¡Fajitas añadidas!");
    window.location.href = `pedido.html?cart=${encodeURIComponent(JSON.stringify(cart))}`;
}

window.onload = cargarConfiguracion;