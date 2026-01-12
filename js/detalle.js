const basePrice = 7.99;
const ingredients = {
    arroz: { name: "Arroz", price: 1.5, qty: 0 },
    pollo: { name: "Pollo", price: 2.0, qty: 0 },
    frejol: { name: "Frejol", price: 1.0, qty: 0 }
};

let editIndex = null; // Para saber si estamos editando

function cargarConfiguracion() {
    const params = new URLSearchParams(window.location.search);
    
    // 1. ¿Estamos editando?
    if (params.has('editIndex')) {
        editIndex = params.get('editIndex');
        // Cargamos las cantidades que vienen en la URL
        for (let k in ingredients) {
            if (params.has(k)) {
                ingredients[k].qty = parseInt(params.get(k));
            }
        }
    }
    updateUI();
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
    document.getElementById("total-price").innerText = total.toFixed(2);
}

function addIng(name) { ingredients[name].qty++; updateUI(); }
function removeIng(name) { if (ingredients[name].qty > 0) ingredients[name].qty--; updateUI(); }

function confirmarPedido() {
    const params = new URLSearchParams(window.location.search);
    let cart = params.get('cart') ? JSON.parse(decodeURIComponent(params.get('cart'))) : [];

    let totalItem = basePrice;
    let extrasArray = [];
    let configActual = {};

    for (let k in ingredients) {
        configActual[k] = ingredients[k].qty;
        if (ingredients[k].qty > 0) {
            extrasArray.push(`${ingredients[k].qty}x ${ingredients[k].name}`);
            totalItem += ingredients[k].qty * ingredients[k].price;
        }
    }

    const platoActualizado = {
        nombre: "Bowl Chipsotle",
        extras: extrasArray.join(", ") || "Sin extras",
        total: totalItem.toFixed(2),
        config: configActual
    };

    // SI ESTÁBAMOS EDITANDO, REEMPLAZAMOS EN LA MISMA POSICIÓN
    if (editIndex !== null) {
        cart[editIndex] = platoActualizado;
    } else {
        // SI ES NUEVO, LO AGREGAMOS AL FINAL
        cart.push(platoActualizado);
    }

    const cartString = encodeURIComponent(JSON.stringify(cart));
    window.location.href = `pedido.html?cart=${cartString}`;
}

window.onload = cargarConfiguracion;