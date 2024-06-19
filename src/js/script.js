let menues = data;

function show() {
    let orderElement = document.getElementById("orderElement");
    orderElement.innerHTML = "";

    for (let i = 0; i < menues.length; i++) {
        const menuType = menues[i].type;
        const menuPrice = menues[i].price;
        const menuDiscription = menues[i].discription;
        const menuImg = menues[i].img;
        const ingredients = menues[i].ingredients;
        orderElement.innerHTML += generateMenu(menuType, menuPrice, menuDiscription, menuImg, ingredients, i);
    }
}

function generateMenu(menuType, menuPrice, menuDiscription, menuImg, ingredients, i) {
    return `
    <div class='menu'>
        <h3 class='menu-type'>${menuType}</h3>
        <span class='menu-price'>${menuPrice}€</span>
        <div class="add">
            <button onclick='displayOrder("${menuType}", ${menuPrice}, "${menuDiscription}", "${menuImg}", ${i})'>+</button>
        </div>
    </div>
    `;
}

function generateIngredientsHtml(ingredients) {
    let ingredientsHtml = '';

    ingredients.forEach((ingredient, index) => {
        ingredientsHtml += `
            <div class="ingredient">
                <input type="checkbox" id="extra_${index}" name="${ingredient.name}" value="${ingredient.name}">
                <label for="extra_${index}">${ingredient.name} (+${ingredient.cost.toFixed(2)}€)</label>
            </div>
        `;
    });

    return ingredientsHtml;
}

function displayOrder(menuType, menuPrice, menuDiscription, menuImg, index) {
    let showOrderElement = document.getElementById('orderHidden');
    showOrderElement.classList.remove('d-none');
    let ingredientsHtml = generateIngredientsHtml(menues[index].ingredients);
    let amount = menues[index].amount;

    showOrderElement.innerHTML = `
    <div class="order">
        <div class="order-head">
            <button class="order-btn" onclick='closeOrder()'>X</button>
            <h3 class='order-menu-type'>${menuType}</h3>
            <img src="${menuImg}" alt="${menuType}">
            <span class="order-discription">${menuDiscription}</span>
            <span class='order-menu-price'>${menuPrice}€</span>
            ${ingredientsHtml}
            <div class="final-order">
                <div class="amount-order">
                    <button onclick='updateAmount(${index}, 1)'>+</button>
                    <span id="amount_${index}">${amount}</span>
                    <button onclick='updateAmount(${index}, -1)'>-</button>
                </div>
                <div>
                    <button class="total-order-btn">TOTAL</button>
                </div>
            </div>
        </div>
    </div>
    `;
}

function updateAmount(index, delta) {
    if (menues[index].amount + delta >= 1) {
        menues[index].amount += delta;
        document.getElementById(`amount_${index}`).innerText = menues[index].amount;
    }
}

function totalOrder() {
    
}

function closeOrder() {
    let showOrderElement = document.getElementById('orderHidden');
    showOrderElement.classList.add('d-none');
}

show();
