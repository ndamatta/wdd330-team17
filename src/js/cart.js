import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  const cartItemsArray = Array.isArray(cartItems) ? cartItems : [];

  let total = 0;

  const htmlItems = cartItemsArray.map((item) => {
    total += item.FinalPrice;
    return cartItemTemplate(item);
  });
  //show content

  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  //show total price
  const totalPriceHtml = `$${total}`;
  if (total !== 0) {
    document.querySelector(".hide").style.display = "block";
    document.querySelector(".cart-total").innerHTML += totalPriceHtml;
  }
}

function cartItemTemplate(item) {
  // Calculate the discount percentage
  const discountedPrice = item.FinalPrice * 0.8;

  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <p class="cart-card__discount">20% OFF: $${discountedPrice.toFixed(2)}</p>
</li>`;

  return newItem;
}

renderCartContents();
