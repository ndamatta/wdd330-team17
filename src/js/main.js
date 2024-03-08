import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const productList = document.querySelector(".product-list");

const tentList = new ProductListing("tents", dataSource, productList);
tentList.init();
