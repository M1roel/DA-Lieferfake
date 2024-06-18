let menues = data;

function show() {
  let orderElement = document.getElementById("orderElement");
  orderElement.innerHTML = "";

  for (let i = 0; i < menues.length; i++) {
    const menuType = menues[i].type;
    const menuPrice = menues[i].price;
    const menuDiscription = menues[i].discription;
    const menuImg = menues[i].img;
    orderElement.innerHTML += generateMenu(
      menuType,
      menuPrice,
      menuDiscription,
      menuImg,
      i
    );
  }
}

function generateMenu(menuType, menuPrice, menuDiscription, menuImg, i) {
  return `
    <div class='menu'>
        <h3 class='menu-type'>${menuType}</h3>
        <span class='menu-price'>${menuPrice}€</span>
        <div class="add">
            <button onclick='showOrder("${menuType}", ${menuPrice}, "${menuDiscription}", "${menuImg}")'>+</button>
        </div>
    </div>
    `;
}

function showOrder(menuType, menuPrice, menuDiscription, menuImg) {
  let showOrderElement = document.getElementById("orderHidden");
  showOrderElement.classList.remove("d-none");
  showOrderElement.innerHTML = `
    <div class="order">
      <div class="order-head">
        <button class="order-btn" onclick='closeOrder()'>X</button>
        <h3 class='order-menu-type'>${menuType}</h3>
        <img src="${menuImg}" alt="${menuType}>
        <span class="order-discription">"${menuDiscription}"</span>
        <span class='order-menu-price'>${menuPrice}€</span>
      </div>
    </div>
  `;
}

function closeOrder() {
  let showOrderElement = document.getElementById("orderHidden");
  showOrderElement.classList.add("d-none");
}

show();
