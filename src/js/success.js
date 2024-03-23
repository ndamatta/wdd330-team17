import { loadHeaderFooter, getParams } from "./utils.mjs";

const orderId = getParams("orderId");

document.querySelector(".orderNumber").innerHTML = orderId;

loadHeaderFooter();
