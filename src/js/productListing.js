import { getParams, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";

const category = getParams("category");

const dataSource = new ExternalServices(category);
const productList = document.querySelector(".product-list");

const myList = new ProductListing(category, dataSource, productList);
myList.init();

loadHeaderFooter();
