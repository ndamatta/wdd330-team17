import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const cartItemsArray = Array.isArray(cartItems) ? cartItems : [];
  const htmlItems = cartItemsArray.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  attachRemoveItemListeners(); // Attach event listeners after rendering the cart contents
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-item" data-id="${item.Id}">Remove</button>
  </li>`;
  return newItem;
}

function attachRemoveItemListeners() {
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', event => {
      const productId = event.target.dataset.id;
      removeItemFromCart(productId);
    });
  });
}

function removeItemFromCart(productId) {
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems = cartItems.filter(item => item.Id !== productId);
  setLocalStorage("so-cart", cartItems);
  renderCartContents(); // Re-render the cart contents after removing the item
}

renderCartContents(); // Initial rendering of the cart contents
