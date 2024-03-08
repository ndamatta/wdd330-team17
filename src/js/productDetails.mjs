import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function productContent(product) {
  return `
    <section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.Name}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.Name}"
    />
    <p class="product-card__price">${product.ListPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
    </section>
  `
}

export default class productDetails {
  constructor(productId, dataSource) {
    this.productId = productId
    this.product = {}
    this.dataSource = dataSource
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId)
    this.renderProductDetails("main")
    document.getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }
  addToCart() {
    let cartItems = getLocalStorage("so-cart");
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }
    // add new item to cart
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }
  renderProductDetails(element) {
    let container = document.querySelector(element)
    let productForm = productContent(this.product)
    container.innerHTML = productForm
  }
}