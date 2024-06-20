let cart = [];

function addToCart(menuItem, totalPrice) {
    cart.push({
        type: menuItem.type,
        price: totalPrice,
        description: menuItem.discription,
        image: menuItem.img
    });
    console.log("Current cart:", cart);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');

    // Prüfen, ob das Element existiert
    if (!cartItemsContainer) {
        console.error("Das Element mit der Klasse 'cart-items' wurde nicht gefunden.");
        return;
    }

    cartItemsContainer.innerHTML = ''; // Clear previous cart items

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Fülle deinen Warenkorb und füge leckere Gerichte aus der Speisekarte hinzu.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.type}">
                <div class="cart-item-details">
                    <h4>${item.type}</h4>
                    <p>${item.description}</p>
                    <p>${item.price}€</p>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
        });
    }
}

function displayCart() {
    console.log(cart);
}
