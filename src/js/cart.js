let cart = [];

function addToCart(menuItem, totalPrice, amount) {
    cart.push({
        type: menuItem.type,
        price: parseFloat(totalPrice).toFixed(2),
        description: menuItem.discription,
        image: menuItem.img,
        amount: amount
    });
    console.log("Current cart:", cart);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');

    if (!cartItemsContainer) {
        console.error("Das Element mit der Klasse 'cart-items' wurde nicht gefunden.");
        return;
    }

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Fülle deinen Warenkorb und füge leckere Gerichte aus der Speisekarte hinzu.</p>';
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.type}">
                <div class="cart-item-details">
                    <h4>${item.type}</h4>
                    <p>${item.description}</p>
                    <p id="price_${index}">${parseFloat(item.price).toFixed(2)}€</p>
                    <div class="amount-order">
                        <button onclick='updateCartAmount(${index}, -1)'>-</button>
                        <span id="cart_amount_${index}">${item.amount}</span>
                        <button onclick='updateCartAmount(${index}, 1)'>+</button>
                    </div>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
        });
    }
}

function updateCartAmount(index, delta) {
    if (cart[index].amount + delta >= 1) {
        cart[index].amount += delta;
        cart[index].price = (cart[index].price / (cart[index].amount - delta)) * cart[index].amount;
        updateCartDisplay();
    }
}

function displayCart() {
    console.log(cart);
}
