import { capitalize, renderListWithTemplate } from "./utils.mjs";
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

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.sortType = "";
  }

  async init() {
    const category = capitalize(this.category);
    document.querySelector("title").innerText = `Top products: ${category}`;
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    this.sortTypeListener(list);
    // this.sortBySelectedType(list);
  }

  renderList(list) {
    renderListWithTemplate(productCartTemplate, this.listElement, list);
  }
  sortTypeListener(list) {
    const sortButtons = document.querySelectorAll("input[name='sorttype']");
    sortButtons.forEach((btn) => {
      btn.addEventListener("change", (e) => {
        this.sortType = e.target.value;
        this.renderListBySort(list);
      });
    });
  }
  renderListBySort(list) {
    if (this.sortType === "Name") {
      list.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (this.sortType === "Price") {
      list.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }
    renderListWithTemplate(
      productCartTemplate,
      this.listElement,
      list,
      "afterbegin",
      true,
    );
  }

  sortList;
}
