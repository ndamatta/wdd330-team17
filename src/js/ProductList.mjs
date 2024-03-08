import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData();
    // render the list
    this.renderList(list);
  }
  // render after doing the first stretch
  renderList(list) {
    const filteredTents = this.filterTents(list); // Filter the list of tents
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      filteredTents,
    );
  }

  // render before doing the stretch
  //  renderList(list) {
  //    const htmlStrings = list.map(productCardTemplate);
  //   this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
  //   }

  // Method to filter the list of tents
  filterTents(tentsList) {
    // Filter the list to get only the first four tents
    return tentsList.slice(0, 4);
  }
}
