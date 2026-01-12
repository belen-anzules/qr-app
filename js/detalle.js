const basePrice = 7.99;
const ingredients = {
    arroz: { name: "Arroz", price: 1.5, qty: 0 },
    pollo: { name: "Pollo", price: 2.0, qty: 0 },
    frejol: { name: "Frejol", price: 1.0, qty: 0 }
};

// 1. FUNCIÓN QUE CARGA LO QUE DEJASTE ANTES
function cargarDesdeURL() {
    const params = new URLSearchParams(window.location.search);
    for (let key in ingredients) {
        if (params.has(key)) {
            ingredients[key].qty = parseInt(params.get(key));
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
    let totalEl = document.getElementById("total-price");
    if (totalEl) totalEl.innerText = total.toFixed(2);
}

function addIng(name) { ingredients[name].qty++; updateUI(); }
function removeIng(name) { if (ingredients[name].qty > 0) ingredients[name].qty--; updateUI(); }

function confirmarPedido() {
    let totalFinal = basePrice;
    let extrasArray = [];
    
    // Construimos una cadena de texto para los parámetros de la URL
    let urlParams = "";
    
    for (let k in ingredients) {
        if (ingredients[k].qty > 0) {
            extrasArray.push(ingredients[k].qty + "x " + ingredients[k].name);
            totalFinal += ingredients[k].qty * ingredients[k].price;
        }
        // Guardamos la cantidad individual para poder editarla luego
        urlParams += `&${k}=${ingredients[k].qty}`;
    }

    const extrasTexto = extrasArray.join(", ");
    const precioTexto = totalFinal.toFixed(2);

    // Enviamos TODO por URL: texto para mostrar y números para editar
    const destino = `pedido.html?nombre=Bowl Chipsotle&extras=${encodeURIComponent(extrasTexto)}&total=${precioTexto}${urlParams}`;
    
    window.location.href = destino;
}

// Ejecutar al cargar la página
window.onload = cargarDesdeURL;