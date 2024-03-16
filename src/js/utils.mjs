// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
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
  updateCartBadge(getCartCount());
};

export function setCartCount(count) {
  localStorage.setItem("cartCount", count);
}

export function getCartCount() {
  return parseInt(localStorage.getItem("cartCount")) || 0;
}

export function updateCartBadge(data) {
  const cartCountElement = document.querySelector(".cart-count");

  if (cartCountElement) {
    if (data !== undefined) {
      cartCountElement.innerText = data.toString();
    } else {
      const cartCount = getCartCount();
      cartCountElement.innerText = cartCount.toString();
    }
  }
}
export function zoomAnimation() {
  const icon = document.querySelector("#cartIconSvg");
  icon.style.transform = "scale(1.3)";
  setTimeout(() => {
    icon.style.transform = "scale(1)";
  }, 200);
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
