import { renderListWithTemplate } from "./utils.mjs";
 
// This will define a template for generating HTML markup for a product card
function productCardTemplate(product) {
  // Return HTML markup for a product card based on the provided product data
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
      <span class="remove-item" data-id="${product.Id}">X</span>
    </a>
  </li>`;
}
 
// Export a class to handle rendering a list of products
export default class ProductList {
  constructor(category, dataSource, listElement) {
    // Initialize the ProductList with category, dataSource, and listElement properties
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
 
  // Initialize the ProductList by fetching and rendering the product list
  async init() {
    // Retrieve the product list data from the data source
    const list = await this.dataSource.getData();
    // Render the retrieved product list
    this.renderList(list);
   
    // Attach event listeners to handle item removal
    this.attachRemoveItemListeners();
  }
 
  // Render the product list using the provided template function
  renderList(list) {
    // Utilize a utility function to render the list with the specified template
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
 
  // Attach event listeners to handle removal of items from the cart
  attachRemoveItemListeners() {
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
      button.addEventListener('click', event => {
        const productId = event.target.dataset.id;
        this.removeItemFromCart(productId);
      });
    });
  }

  // Remove an item from the cart based on its ID
  removeItemFromCart(productId) {
    // Retrieve the cart contents from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Remove the item with the matching ID from the cart
    cart = cart.filter(item => item.Id !== productId);
    // Update the cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Re-render the cart list to reflect the updated cart contents
    this.init();
  }
}