import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkoutModule.mjs";
import ExternalServices from "./ExternalServices.mjs";
import Alert from "./alert.mjs";

const alert = new Alert()
alert.init()
loadHeaderFooter();
const formData = document.querySelector(".checkout")
const containerElement = document.querySelector(".orderSumaryContent")
const checkout = new CheckoutProcess("so-cart", containerElement, formData)
checkout.init()

const externalServices = new ExternalServices()

const submitButton = document.querySelector(".checkoutButton")


formData.addEventListener("change", (e) => console.log(e.target.checkValidity()))

submitButton.addEventListener("click", (e) => {
  e.preventDefault()
  externalServices.checkout(checkout.generatePayload())
    .then(res => {
      alert.renderAlert(res.message, `The order has been placed successfully, the order number is ${res.orderId}, you will receive a confirmation email shortly.`, "success")
      checkout.resetData()

    })
    .catch(error => {
      const errors = `${Object.values(error).join("\n")}`
      alert.renderAlert("Error", `${errors}`, "danger")
    })
  formData.reset()
})