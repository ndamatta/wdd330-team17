import ExternalServices from "./ExternalServices.mjs";
import { renderListWithTemplate, stringToDotNotation } from "./utils.mjs";
function productCartTemplate(product) {
  return `
  <li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="${product.Name}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.ListPrice}</p>
    </a>
  </li>
`;
}

export default class SearchProducts {
  constructor(listElement, searchValue, searchText) {
    this.listElement = listElement;
    this.dataSource = [];
    this.searchValue = searchValue;
    this.searchText = searchText;
  }

  async init() {
    document.querySelector("title").innerText = `Search results`;
    this.dataSource = await this.getAllProducts();
    let list = this.listSearchResults(this.dataSource);
    list.length > 0
      ? this.renderList(list)
      : (this.listElement.innerHTML =
          "<h2>No data found with the search criteria</h2>");
  }

  listSearchResults(dataSource) {
    return dataSource.filter((item) =>
      stringToDotNotation(item, this.searchValue)
        .toLowerCase()
        .includes(this.searchText.toLowerCase()),
    );
  }

  async getAllProducts() {
    const products = new ExternalServices();
    const tents = await products.getData("tents");
    const backpacks = await products.getData("backpacks");
    const sleepingBags = await products.getData("sleeping-bags");
    const hammocks = await products.getData("hammocks");
    return [...tents, ...backpacks, ...sleepingBags, ...hammocks];
  }

  renderList(list) {
    renderListWithTemplate(productCartTemplate, this.listElement, list);
  }
}
