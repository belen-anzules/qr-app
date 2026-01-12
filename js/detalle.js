const basePrice = 7.99;
let ingredients = {
    arroz: { name: "Arroz integral", price: 1.5, qty: 0 },
    pollo: { name: "Pollo", price: 2.0, qty: 0 },
    frejol: { name: "Frejol", price: 1.0, qty: 0 }
};

// Verificar si estamos EDITANDO un item del carrito
const urlParams = new URLSearchParams(window.location.search);
const editIndex = urlParams.get('edit');

window.onload = () => {
    if (editIndex !== null) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const itemToEdit = cart[editIndex];
        if (itemToEdit) {
            // Cargar cantidades previas
            itemToEdit.extras.forEach(extra => {
                if (ingredients[extra.id]) {
                    ingredients[extra.id].qty = extra.qty;
                }
            });
        }
    }
    updateUI();
};

function addIng(id) {
    ingredients[id].qty++;
    updateUI();
}

function removeIng(id) {
    if (ingredients[id].qty > 0) ingredients[id].qty--;
    updateUI();
}

function updateUI() {
    let extraTotal = 0;
    for (let id in ingredients) {
        document.getElementById(`${id}-qty`).innerText = ingredients[id].qty;
        extraTotal += ingredients[id].qty * ingredients[id].price;
    }
    const finalTotal = basePrice + extraTotal;
    document.getElementById("total-price").innerText = finalTotal.toFixed(2);
}

function saveToCart() {
    console.log("Guardando pedido..."); // Esto ayuda a debugear
    
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let extras = [];
    let total = basePrice;

    // Recopilar ingredientes
    for (let id in ingredients) {
        if (ingredients[id].qty > 0) {
            extras.push({ 
                id: id, 
                name: ingredients[id].name, 
                qty: ingredients[id].qty 
            });
            total += ingredients[id].qty * ingredients[id].price;
        }
    }

    const itemPedido = {
        name: "Bowl Chipsotle",
        extras: extras,
        total: total.toFixed(2)
    };

    // Si editIndex existe (viene de la URL), reemplazamos. Si no, agregamos.
    if (typeof editIndex !== 'undefined' && editIndex !== null) {
        cart[editIndex] = itemPedido;
    } else {
        cart.push(itemPedido);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    
    // REDIRECCIÓN COMPATIBLE CON APK
    window.location.assign("pedido.html"); 
}