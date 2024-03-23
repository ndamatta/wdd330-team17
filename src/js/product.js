import { getParams, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import productDetails from "./productDetails.mjs";

loadHeaderFooter();
const productId = getParams("product");
const dataSource = new ExternalServices("tents");

const product = new productDetails(productId, dataSource);
product.init();
