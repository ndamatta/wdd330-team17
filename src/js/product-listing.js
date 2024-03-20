import ProductListing from "./ProductList.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");

const dataSource = new ExternalServices();
const productList = document.querySelector(".product-list");

const myList = new ProductListing(category, dataSource, productList);
myList.init();

//update title
const titleElement = document.querySelector(".products h2");
let addCategory;
if (category === "tents") {
  addCategory = ": Tents";
} else if (category === "sleeping-bags") {
  addCategory = ": Sleeping Bags";
} else if (category === "backpacks") {
  addCategory = ": Backpacks";
} else {
  addCategory = ": Hammocks";
}
titleElement.innerHTML += addCategory;
