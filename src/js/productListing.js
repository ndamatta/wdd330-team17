import { getParams, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const category = getParams("category");

const dataSource = new ProductData(category);
const productList = document.querySelector(".product-list");

const myList = new ProductListing(category, dataSource, productList);
myList.init();

loadHeaderFooter();
