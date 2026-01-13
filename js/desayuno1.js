const basePrice = 7.50;
const ingredients = {
    ternera: { name: "Ternera", price: 2.5, calories: 210, protein: 26, fat: 11, carbs: 0, qty: 1, included: true },
    pimientos: { name: "Mix Pimientos", price: 0.6, calories: 30, protein: 1, fat: 0.2, carbs: 6, qty: 1, included: true },
    cebolla: { name: "Cebolla Morada", price: 0.4, calories: 40, protein: 1.1, fat: 0.1, carbs: 9, qty: 1, included: true },
    tortilla: { name: "Tortilla de Trigo", price: 0.5, calories: 90, protein: 3, fat: 2, carbs: 18, qty: 1, included: true }
};

let editIndex = null;

// Funciones cargarConfiguracion, addIng y removeIng son idénticas al archivo anterior...

function updateUI() {
    let totalCal = 0, totalPro = 0, totalFat = 0, totalCarb = 0, totalPrice = basePrice;

    for (let key in ingredients) {
        const ing = ingredients[key];
        document.getElementById(`${key}-qty`).innerText = ing.qty;
        
        const c = ing.calories * ing.qty;
        const p = ing.protein * ing.qty;
        const f = ing.fat * ing.qty;
        const cb = ing.carbs * ing.qty;

        if(document.getElementById(`cal-${key}`)) document.getElementById(`cal-${key}`).innerText = Math.round(c);
        if(document.getElementById(`pro-${key}`)) document.getElementById(`pro-${key}`).innerText = p.toFixed(1);
        if(document.getElementById(`fat-${key}`)) document.getElementById(`fat-${key}`).innerText = f.toFixed(1);
        if(document.getElementById(`carb-${key}`)) document.getElementById(`carb-${key}`).innerText = cb.toFixed(1);

        totalCal += c; totalPro += p; totalFat += f; totalCarb += cb;

        if (ing.included) {
            if (ing.qty === 0) totalPrice -= ing.price;
            else if (ing.qty > 1) totalPrice += (ing.qty - 1) * ing.price;
        } else {
            totalPrice += ing.qty * ing.price;
        }
    }

    document.getElementById("total-calories").innerText = Math.round(totalCal);
    document.getElementById("total-protein").innerText = totalPro.toFixed(1);
    document.getElementById("total-fat").innerText = totalFat.toFixed(1);
    document.getElementById("total-carbs").innerText = totalCarb.toFixed(1);
    document.getElementById("total-price").innerText = totalPrice.toFixed(2);
}

// ... Función confirmarPedido (cambiando el nombre del plato y la página)