import SearchProducts from "./searchProducts.mjs";
import { getParams, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const searchAttrubute = getParams("searchAttribute");
const searchText = getParams("searchText");
const listConatiner = document.querySelector(".product-list");

const searchResult = new SearchProducts(
  listConatiner,
  searchAttrubute,
  searchText,
);
searchResult.init();
