import {
  formDataToJSON,
  getLocalStorage,
  renderWithTemplate,
  setLocalStorage,
  updateCartBadge,
} from "./utils.mjs";

const renderSumary = (subtotal, shipping, tax, total) => `
    <p><span>Subtotal</span> <span>$${subtotal}</span></p>
    <p><span>Shipping estimate: </span><span>$${shipping}.00</span></p>
    <p><span>Tax: </span><span>$${tax}</span></p>
    <h3><span>Order total: </span> <span>$${total}</span></h3>
  `;

const packageItems = (items, formData, orderTotal, shipping, tax) => {
  const packedItems = items.map((item) => {
    let newItem = {
      id: item.Id,
      name: item.Name,
      price: item.ListPrice,
      quantity: item.qty,
    };
    return newItem;
  });

  let payload = formDataToJSON(formData);
  payload["items"] = packedItems;
  payload["orderDate"] = new Date(Date.now()).toISOString();
  payload["orderTotal"] = orderTotal;
  payload["shipping"] = shipping;
  payload["tax"] = tax;
  return payload;
};

export default class CheckoutProcess {
  constructor(key, outputSelector, formData) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.formData = formData;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateSummary();
    this.calculateTax();
  }

  calculateSummary() {
    this.itemTotal =
      Math.round(
        this.list.reduce(
          (acumulator, item) => acumulator + item.qty * item.ListPrice,
          0,
        ) * 100,
      ) / 100;
    this.calculateTax();
    this.calculateShipping();
    this.calculateOrderTotals();
    this.displayOrderTotals();
  }

  calculateShipping() {
    if (this.list.length > 0) {
      const totalItems = this.list.reduce(
        (acumulator, item) => acumulator + item.qty,
        0,
      );
      this.shipping = (totalItems - 1) * 2 + 10;
    } else {
      this.shipping = 0;
    }
  }

  calculateTax() {
    this.tax = Math.round(this.itemTotal * 0.06 * 100) / 100;
    Math.round();
  }

  calculateOrderTotals() {
    this.orderTotal =
      Math.round((this.itemTotal + this.shipping + this.tax) * 100) / 100;
  }

  displayOrderTotals() {
    this.outputSelector.innerHTML = "";
    const template = renderSumary(
      this.itemTotal,
      this.shipping,
      this.tax,
      this.orderTotal,
    );
    renderWithTemplate(template, this.outputSelector);
  }

  resetData() {
    this.orderTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.itemTotal = 0;
    this.displayOrderTotals();
    setLocalStorage("so-cart", []);
    updateCartBadge();
  }

  generatePayload() {
    let payload = packageItems(
      this.list,
      this.formData,
      this.orderTotal,
      this.shipping,
      this.tax,
    );
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return options;
  }
}
