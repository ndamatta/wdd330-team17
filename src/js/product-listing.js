import ProductListing from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");
// console.log(category)

const dataSource = new ProductData();
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
