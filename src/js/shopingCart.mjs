import {
  getLocalStorage,
  renderListWithTemplate,
  removeItemFromCart,
} from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="remove-item" data-id="${item.Id}">X</span>
</li>`;

  return newItem;
}

export default class ShopingCart {
  constructor(parent) {
    this.cartItems = [];
    this.parentElement = parent;
    this.totalPrice = 0;
  }

  async init() {
    this.getData();
    this.getTotalsInCart();
    this.renderCartList(this.cartItems);
    this.renderTotalsInCart();
    this.attachRemoveItemListeners();
  }

  getData() {
    const cartItems = getLocalStorage("so-cart");
    this.cartItems = Array.isArray(cartItems) ? cartItems : [];
  }

  getTotalsInCart() {
    this.totalPrice = this.cartItems.reduce(
      (acumulator, iterator) => acumulator + iterator.FinalPrice,
      0,
    );
  }

  renderCartList() {
    this.parentElement.innerHTML = "";
    renderListWithTemplate(
      cartItemTemplate,
      this.parentElement,
      this.cartItems,
    );
  }

  renderTotalsInCart() {
    const totalPriceHtml = `Total: $${this.totalPrice}`;
    document.querySelector(".cart-total").innerHTML = totalPriceHtml;
  }

  attachRemoveItemListeners() {
    const removeButtons = document.querySelectorAll(".remove-item");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.target.dataset.id;
        removeItemFromCart(productId);
        this.init();
      });
    });
  }
}
