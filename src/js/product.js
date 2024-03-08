import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParams("product")
const dataSource = new ProductData("tents");

const product = new productDetails(productId, dataSource)
product.init()

