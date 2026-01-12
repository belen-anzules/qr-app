const basePrice = 7.99;

// Agregamos frejol que faltaba en tu objeto anterior
const ingredients = {
    arroz: { name: "Arroz", price: 1.5, qty: 0 },
    pollo: { name: "Pollo", price: 2.0, qty: 0 },
    frejol: { name: "Frejol", price: 1.0, qty: 0 }
};

function updateTotal() {
    let total = basePrice;
    for (let k in ingredients) {
        total += ingredients[k].qty * ingredients[k].price;
        // Actualiza el número en el HTML
        const qtyElement = document.getElementById(k + "-qty");
        if (qtyElement) qtyElement.innerText = ingredients[k].qty;
    }
    // Actualiza el precio total en el HTML
    const totalElement = document.getElementById("total-price");
    if (totalElement) totalElement.innerText = total.toFixed(2);
}

function addIng(name) {
    if (ingredients[name]) {
        ingredients[name].qty++;
        updateTotal();
    }
}

function removeIng(name) {
    if (ingredients[name] && ingredients[name].qty > 0) {
        ingredients[name].qty--;
        updateTotal();
    }
}

function confirmarPedido() {
    try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        let extras = [];
        let totalFinal = basePrice;

        for (let k in ingredients) {
            if (ingredients[k].qty > 0) {
                extras.push({
                    name: ingredients[k].name,
                    qty: ingredients[k].qty
                });
                totalFinal += ingredients[k].qty * ingredients[k].price;
            }
        }

        cart.push({
            name: "Bowl Chipsotle",
            extras: extras,
            total: totalFinal.toFixed(2)
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        
        // En APKs es mejor usar window.location.href
        window.location.href = "pedido.html";
        
    } catch (error) {
        alert("Error al guardar: " + error);
    }
}

// Inicializar al cargar
updateTotal();