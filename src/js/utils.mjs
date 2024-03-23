// utils.mjs

import Alert from "./alert.mjs";

const alert = new Alert();

export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  clear ? (parentElement.innerHTML = "") : "";
  const renderString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, renderString.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

export const loadTemplate = async (path) => {
  let data = await fetch(path).then((res) => res.text());
  return data;
};

export const loadHeaderFooter = async () => {
  let [header, footer] = await Promise.all([
    loadTemplate("/partials/header.html"),
    loadTemplate("/partials/footer.html"),
  ]);
  let parentHeader = document.querySelector("header");
  let parentFooter = document.querySelector("footer");
  renderWithTemplate(header, parentHeader);
  renderWithTemplate(footer, parentFooter);
  updateCartBadge();
};

export function updateCartBadge() {
  const cartItems = JSON.parse(localStorage.getItem("so-cart"));
  let cartCount = 0;
  if (cartItems) {
    cartCount = cartItems.reduce(
      (acumulator, item) => acumulator + item.qty,
      0,
    );
  }
  document.querySelector(".cart-count").innerHTML = cartCount;
}

export function zoomAnimation() {
  const icon = document.querySelector("#cartIconSvg");
  icon.style.transform = "scale(1.3)";
  setTimeout(() => {
    icon.style.transform = "scale(1)";
  }, 200);
}

export function removeItemFromCart(productId) {
  let cartItems = getLocalStorage("so-cart") || [];
  let item = cartItems.find((product) => product.Id === productId);
  cartItems = cartItems.filter((product) => product.Id !== productId);
  setLocalStorage("so-cart", cartItems); // Re-render the cart contents after removing the item
  updateCartBadge();
  alert.init();
  alert.renderAlert(
    "Removed",
    `Removed ${item.qty} ${item.Name} from the cart.`,
    "danger",
  );
}

export function capitalize(text) {
  return text[0].toUpperCase() + text.slice(1);
}

export function stringToDotNotation(object, textAttributes) {
  const attributes = textAttributes.split(".");
  let objs = object;
  for (let attr of attributes) {
    if (attr != "") {
      objs = objs[attr];
    }
  }
  return objs;
}

export function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  let jsonResult = {};
  formData.forEach((value, key) => (jsonResult[key] = value));
  return jsonResult;
}
