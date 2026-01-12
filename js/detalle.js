const basePrice = 7.99;
const ingredients = {
    arroz: { name: "Arroz", price: 1.5, qty: 0 },
    pollo: { name: "Pollo", price: 2.0, qty: 0 },
    frejol: { name: "Frejol", price: 1.0, qty: 0 }
};

// 1. Obtener el carrito actual de la URL
function getCartFromURL() {
    const params = new URLSearchParams(window.location.search);
    const cartData = params.get('cart');
    return cartData ? JSON.parse(decodeURIComponent(cartData)) : [];
}

function updateUI() {
    let total = basePrice;
    for (let k in ingredients) {
        let el = document.getElementById(k + "-qty");
        if (el) {
            el.innerText = ingredients[k].qty;
            total += ingredients[k].qty * ingredients[k].price;
        }
    }
    let totalEl = document.getElementById("total-price");
    if (totalEl) totalEl.innerText = total.toFixed(2);
}

function addIng(name) { ingredients[name].qty++; updateUI(); }
function removeIng(name) { if (ingredients[name].qty > 0) ingredients[name].qty--; updateUI(); }

function confirmarPedido() {
    const cart = getCartFromURL(); // Traemos los platos que ya estaban
    
    let totalItem = basePrice;
    let extrasArray = [];
    let configActual = {}; // Guardamos las cantidades para poder editar luego

    for (let k in ingredients) {
        configActual[k] = ingredients[k].qty;
        if (ingredients[k].qty > 0) {
            extrasArray.push(`${ingredients[k].qty}x ${ingredients[k].name}`);
            totalItem += ingredients[k].qty * ingredients[k].price;
        }
    }

    // Creamos el nuevo objeto de plato
    const nuevoPlato = {
        nombre: "Bowl Chipsotle",
        extras: extrasArray.join(", ") || "Sin extras",
        total: totalItem.toFixed(2),
        config: configActual
    };

    // LO AÑADIMOS AL CARRITO EXISTENTE
    cart.push(nuevoPlato);

    // Convertimos todo el carrito a texto para la URL
    const cartString = encodeURIComponent(JSON.stringify(cart));
    window.location.href = `pedido.html?cart=${cartString}`;
}

window.onload = () => {
    // Si estuviéramos editando, aquí se cargarían los datos (opcional por ahora)
    updateUI();
};