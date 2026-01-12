const basePrice = 7.99;
const ingredients = {
    arroz: { name: "Arroz", price: 1.5, qty: 0 },
    pollo: { name: "Pollo", price: 2.0, qty: 0 },
    frejol: { name: "Frejol", price: 1.0, qty: 0 }
};

function updateUI() {
    let total = basePrice;
    for (let k in ingredients) {
        if (document.getElementById(k + "-qty")) {
            document.getElementById(k + "-qty").innerText = ingredients[k].qty;
            total += ingredients[k].qty * ingredients[k].price;
        }
    }
    if (document.getElementById("total-price")) {
        document.getElementById("total-price").innerText = total.toFixed(2);
    }
}

function addIng(name) { ingredients[name].qty++; updateUI(); }
function removeIng(name) { if (ingredients[name].qty > 0) ingredients[name].qty--; updateUI(); }

function confirmarPedido() {
    // 1. Calculamos el total y extras
    let totalFinal = basePrice;
    let extrasArray = [];

    for (let k in ingredients) {
        if (ingredients[k].qty > 0) {
            extrasArray.push(`${ingredients[k].qty}x ${ingredients[k].name}`);
            totalFinal += ingredients[k].qty * ingredients[k].price;
        }
    }

    const extrasTexto = extrasArray.join(", ");
    const precioTexto = totalFinal.toFixed(2);

    // 2. Intentamos guardar en LocalStorage (por si acaso funciona)
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: "Bowl Chipsotle", extras: extrasArray, total: precioTexto });
    localStorage.setItem("cart", JSON.stringify(cart));

    // 3. ¡EL TRUCO! Pasamos los datos por la URL para que pedido.html los reciba siempre
    // Esto asegura que al menos el último plato se vea aunque el LocalStorage falle
    const urlDestino = `pedido.html?nombre=Bowl Chipsotle&extras=${encodeURIComponent(extrasTexto)}&total=${precioTexto}`;
    
    window.location.href = urlDestino;
}

updateUI();