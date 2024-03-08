import { renderListWithTemplate } from "./utils.mjs";


function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/?product=${product.Id}">
        <img
          src="${product.Image}"
          alt="${product.Name}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `
}

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category
    this.dataSource = dataSource
    this.listElement = listElement
  }
  async init() {
    const list = await this.dataSource.getData()
    // render the list - to be completed
    let filterData = this.filterProduct(list)
    this.renderList(filterData)
  }
  filterProduct(list) {
    const showenProductId = ["880RR","985RF","985PR","344YJ"]
    let filterData = list.filter((product) => showenProductId.includes(product.Id))
    return filterData
  }
  renderList(list) {
    renderListWithTemplate( productCardTemplate, this.listElement, list)
    // const htmlStrings = list.map((product) => productCardTemplate(product));
    // //this.listElement.innerHTML = htmlStrings.join("");
    // this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
  }
}