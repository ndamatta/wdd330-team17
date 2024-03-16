import ShopingCart from "./shopingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const parentElement = document.querySelector(".product-list");
const cart = new ShopingCart(parentElement);
cart.init();
