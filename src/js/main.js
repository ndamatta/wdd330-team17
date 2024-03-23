import Alert from "./alert.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import NewsLetterSignUp from "./signUpDialog.mjs";

const newsLetter = new NewsLetterSignUp();
newsLetter.init();

loadHeaderFooter();

const alert = new Alert();
alert.init();

alert.renderAlert(
  "Promo Code!",
  "Use this promocode: #5234234123 to get a 10% off on tents!",
  "success",
);
