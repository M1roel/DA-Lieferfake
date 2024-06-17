let menues = data;

show();


function show() {
    let orderElement = document.getElementById('orderElement');
    orderElement.innerHTML = '';

    for (let i = 0; i < menues.length; i++) {
        const menuType = menues.type[i];
        const menuPrice = menues.price[i];
        orderElement.innerHTML += generateMenu(menuType, menuPrice);        
    }
}

function generateMenu(menuType, menuPrice) {
    return `git
    <div class='menu'>
        <h3 class='menu-type'>${menuType}</h3>
        <span class='menu-price'>${menuPrice}</span>
    </div>
    `;
}