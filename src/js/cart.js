let cart = [];

function addToCart(menuItem, totalPrice) {
    cart.push({
        type: menuItem.type,
        price: totalPrice,
        description: menuItem.discription,
        image: menuItem.img
    });
    console.log("Current cart:", cart);
}

function displayCart() {
    console.log(cart);
}
