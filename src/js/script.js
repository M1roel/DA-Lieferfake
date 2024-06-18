let menues = data;

function show() {
  let orderElement = document.getElementById("orderElement");
  orderElement.innerHTML = "";

  for (let i = 0; i < menues.length; i++) {
    const menuType = menues[i].type;
    const menuPrice = menues[i].price;
    const menuDiscription = menues[i].discription;
    orderElement.innerHTML += generateMenu(menuType, menuPrice, menuDiscription, i);
  }
}

function generateMenu(menuType, menuPrice, menuDiscription, i) {
  return `
    <div class='menu'>
        <h3 class='menu-type'>${menuType}</h3>
        <span class='menu-price'>${menuPrice}€</span>
        <div class="add">
            <button onclick='showOrder("${menuType}", ${menuPrice}, "${menuDiscription}")'>+</button>
        </div>
    </div>
    `;
}

function showOrder(menuType, menuPrice, menuDiscription) {
  let showOrderElement = document.getElementById('orderHidden');
  showOrderElement.classList.remove('d-none');
  showOrderElement.innerHTML = `
    <div class="order">
      <div class="order-head">
        <h3 class='menu-type'>${menuType}</h3>
        <span class="order-discription">"${menuDiscription}"</span>
        <span class='menu-price'>${menuPrice}€</span>
      </div>
    </div>
  `;
}

show();
