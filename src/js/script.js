let menues = data;

function show() {
  let orderElement = document.getElementById("orderElement");
  orderElement.innerHTML = "";

  for (let i = 0; i < menues.length; i++) {
    const menuType = menues[i].type;
    const menuPrice = menues[i].price;
    orderElement.innerHTML += generateMenu(menuType, menuPrice);
  }
}

function generateMenu(menuType, menuPrice) {
  return `
    <div class='menu'>
        <h3 class='menu-type'>${menuType}</h3>
        <span class='menu-price'>${menuPrice}</span>
    </div>
    `;
}

show();
