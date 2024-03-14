import { getParams, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import productDetails from "./productDetails.mjs";

loadHeaderFooter();

const productId = getParams("product");
const dataSource = new ProductData("tents");

const product = new productDetails(productId, dataSource);
product.init();
