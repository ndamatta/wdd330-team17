// checkout.js

import { loadHeaderFooter } from "./utils.mjs";

import CheckoutProcess from "./checkoutModule.mjs";
import ExternalServices from "./ExternalServices.mjs";
import Alert from "./alert.mjs";

const alert = new Alert();
alert.init();
loadHeaderFooter();
const formData = document.querySelector(".checkout");
const containerElement = document.querySelector(".orderSumaryContent");
const checkout = new CheckoutProcess("so-cart", containerElement, formData);
checkout.init();

const externalServices = new ExternalServices();

const submitButton = document.querySelector(".checkoutButton");

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    // Perform checkout process
    const response = await externalServices.checkout(
      checkout.generatePayload(),
    );

    // Show success message and redirect to success page
    alert.renderAlert(
      response.message,
      `The order has been placed successfully, the order number is ${response.orderId}, you will receive a confirmation email shortly.`,
      "success",
    );
    checkout.resetData();

    // Redirect to success page
    window.location.href = `/success.html?orderId=${response.orderId}`;
  } catch (error) {
    // Handle errors
    const errors = `${Object.values(error).join("\n")}`;
    alert.renderAlert("Error", `${errors}`, "danger");
  }

  // Clear form data
  formData.reset();
});
