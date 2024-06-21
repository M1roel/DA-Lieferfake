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
        let totalSum = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.type}">
                <div class="cart-item-details">
                    <h4>${item.type}</h4>
                    <p>${item.description}</p>
                    <p id="price_${index}">${parseFloat(item.price).toFixed(2)}€</p>
                    <div class="cart-amount">
                        <button onclick='updateCartAmount(${index}, -1)'>-</button>
                        <span id="cart_amount_${index}">${item.amount}</span>
                        <button onclick='updateCartAmount(${index}, 1)'>+</button>
                        <button class="remove-item" onclick='removeFromCart(${index})'>X</button>
                    </div>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
            totalSum += parseFloat(item.price);
        });

        const cartSumContainer = document.createElement('div');
        cartSumContainer.classList.add('cart-sum');
        cartSumContainer.innerHTML = `
            <div>
                <button class="total-order-btn" onclick="clearCart()">BEZAHLEN: (${totalSum.toFixed(2)}€)</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartSumContainer);
    }
}

function updateCartAmount(index, delta) {
    if (cart[index].amount + delta >= 1) {
        cart[index].amount += delta;
        const basePrice = menues.find(item => item.type === cart[index].type).price;
        cart[index].price = (basePrice * cart[index].amount).toFixed(2);
        updateCartDisplay();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function clearCart() {
    cart = [];
    updateCartDisplay();
}

function displayCart() {
    console.log(cart);
}
