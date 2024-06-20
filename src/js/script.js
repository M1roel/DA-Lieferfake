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
    orderElement.innerHTML += generateMenu(
      menuType,
      menuPrice,
      menuDiscription,
      menuImg,
      ingredients,
      i
    );
  }
}

function generateMenu(
  menuType,
  menuPrice,
  menuDiscription,
  menuImg,
  ingredients,
  i
) {
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

function generateIngredientsHtml(ingredients, menuIndex) {
  let ingredientsHtml = "";

  ingredients.forEach((ingredient, index) => {
    ingredientsHtml += `
            <div class="ingredient">
                <input type="checkbox" id="extra_${menuIndex}_${index}" name="${
      ingredient.name
    }" value="${
      ingredient.cost
    }" onchange="updateTotalPriceWithIngredients(${menuIndex})">
                <label for="extra_${menuIndex}_${index}">${
      ingredient.name
    } (+${ingredient.cost.toFixed(2)}€)</label>
            </div>
        `;
  });

  return ingredientsHtml;
}

function displayOrder(menuType, menuPrice, menuDiscription, menuImg, index) {
  let showOrderElement = document.getElementById("orderHidden");
  showOrderElement.classList.remove("d-none");
  let ingredientsHtml = generateIngredientsHtml(
    menues[index].ingredients,
    index
  );
  let amount = menues[index].amount;
  let totalPrice = (menuPrice * amount).toFixed(2);

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
              <button onclick='updateAmount(${index}, -1)'>-</button>
                  <span id="amount_${index}">${amount}</span>
                  <button onclick='updateAmount(${index}, 1)'>+</button>
              </div>
              <div>
                  <button class="total-order-btn" id="total_${index}" onclick='addToCartAndClose(menues[${index}], getCurrentTotalPrice(${index}))'>${totalPrice}€</button>
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
    updateTotalPrice(index);
  }
}

function updateTotalPrice(index) {
  let totalPrice = (menues[index].price * menues[index].amount).toFixed(2);
  let ingredientCosts = calculateIngredientCosts(index);
  let finalPrice = (parseFloat(totalPrice) + ingredientCosts).toFixed(2);
  document.getElementById(`total_${index}`).innerText = `${finalPrice}€`;
  return finalPrice;
}

function getCurrentTotalPrice(index) {
  return updateTotalPrice(index);
}

function calculateIngredientCosts(index) {
  let ingredientCosts = 0;
  const amount = menues[index].amount;
  const checkboxes = document.querySelectorAll(
    `#orderHidden .ingredient input[type="checkbox"]`
  );
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked && checkbox.id.startsWith(`extra_${index}_`)) {
      ingredientCosts += parseFloat(checkbox.value) * amount;
    }
  });
  return ingredientCosts;
}

function updateTotalPriceWithIngredients(index) {
  updateTotalPrice(index);
}

function addToCartAndClose(menuItem, totalPrice) {
  addToCart(menuItem, totalPrice);
  closeOrder();
}

function closeOrder() {
  let showOrderElement = document.getElementById("orderHidden");
  showOrderElement.classList.add("d-none");
}

show();
