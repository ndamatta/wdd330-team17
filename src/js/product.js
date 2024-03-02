import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let storedItems = getLocalStorage("so-cart");
  let newStoredItems = [];
  if (storedItems !== null) {
    newStoredItems = storedItems;
  }
  newStoredItems.push(product);
  // console.log(newStoredItems)
  setLocalStorage("so-cart", newStoredItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
  //remove all item for testing
  // localStorage.removeItem("so-cart");
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
