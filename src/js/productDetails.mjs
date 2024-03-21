import {
  getLocalStorage,
  setLocalStorage,
  updateCartBadge,
  zoomAnimation,
  capitalize,
} from "./utils.mjs";
import Alert from "./alert.mjs";

const alert = new Alert();

function productContent(product) {
  return `
    <section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.Name}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.Name}"
    />
    <p class="product-card__price">${product.ListPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
    </section>
  `;
}

export default class productDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    const category = capitalize(this.product.Category);
    document.querySelector("title").innerText =
      `${category} - ${this.product.Name}`;
    this.renderProductDetails("main");
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
    updateCartBadge();
  }
  addToCart() {
    let cartItems = getLocalStorage("so-cart");
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }

    let itemIndex = cartItems.findIndex((obj) => obj.Id === this.product.Id);
    itemIndex !== -1
      ? (cartItems[itemIndex].qty += 1)
      : cartItems.push({ ...this.product, qty: 1 });

     // Add new item to cart
     setLocalStorage("so-cart", cartItems);
     zoomAnimation();
     updateCartBadge();
     
     // Display alert message
     alert.renderAlert(
       "Product added!",
       `${this.product.Name} added to the cart successfully!`,
       "success"
     );
   }
  renderProductDetails(element) {
    let container = document.querySelector(element);
    let productForm = productContent(this.product);
    container.innerHTML = productForm;
  }
}
