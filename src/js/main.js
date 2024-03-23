import Alert from "./alert.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const alert = new Alert();
alert.init();

alert.renderAlert(
  "Promo Code!",
  "Use this promocode: #5234234123 to get a 10% off on tents!",
  "success",
);
