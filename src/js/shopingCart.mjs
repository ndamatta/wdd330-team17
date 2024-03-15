import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  // console.log(item)
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
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
    renderListWithTemplate(
      cartItemTemplate,
      this.parentElement,
      this.cartItems,
    );
  }

  renderTotalsInCart() {
    if (this.totalPrice!==0){
      const totalPriceHtml = `Total: $${this.totalPrice}`;
      document.querySelector(".cart-total").innerHTML = totalPriceHtml;
    }
    
  }
}
