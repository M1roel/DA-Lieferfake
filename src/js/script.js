let menues = data;

function show() {
  let orderElement = document.getElementById("orderElement");
  orderElement.innerHTML = "";

  for (let i = 0; i < menues.length; i++) {
    const menuType = menues[i].type;
    const menuPrice = menues[i].price;
    orderElement.innerHTML += generateMenu(menuType, menuPrice, i);
  }
}

function generateMenu(menuType, menuPrice, i) {
  return `
    <div class='menu'>
        <h3 class='menu-type'>${menuType}</h3>
        <span class='menu-price'>${menuPrice}</span>
        <div class="add">
            <button onclick='showOrder(${i})'>+</button>
        </div>
    </div>
    `;
}

function showOrder(i) {
  let showOrderElement = document.getElementById('orderHidden');
  showOrderElement.classList.remove('d-none');
}

show();
