// alert.mjs

// Creates the alert template with JavaScript for better performance and event handling
const singleAlertTemplate = (alertData) => {
  // Alert container
  const alertContainer = document.createElement("section");
  alertContainer.classList.add("alert", "visible", alertData.type);

  // Text nodes
  const alertText = document.createElement("div");
  alertText.classList.add("alert-text");
  const title = document.createElement("h4");
  title.classList.add("alert-text__title");
  title.innerText = alertData.title;
  const body = document.createElement("p");
  body.classList.add("alert-text__content");
  body.innerText = alertData.body;
  alertText.append(title, body);

  // Action nodes
  const alertActions = document.createElement("div");
  const button = document.createElement("button");
  button.classList.add("alert-action__close");
  button.innerText = "x";
  button.addEventListener("click", () => {
    alertContainer.classList.toggle("visible");
    alertContainer.classList.add("delete");
    alertContainer.addEventListener("animationend", () => {
      alertContainer.remove();
    });
  });
  alertActions.append(button);

  alertContainer.append(alertText, alertActions);

  return alertContainer;
};

// Alert class
export default class Alert {
  constructor() {
    this.parentElement = null;
  }

  // For now we only need to check if the alert-list container exists, if not we create it
  init() {
    this.setParentAlertElement();
  }

  // This function will close the alert in 10 seconds if we set autoClose to true
  removeAlertHandler(alertContainer) {
    alertContainer.addEventListener("animationend", (e) => {
      if (e.target.classList.contains("visible")) {
        setTimeout(() => {
          e.target.classList.toggle("visible");
          e.target.classList.add("delete");
        }, 10000);
      } else if (e.target.classList.contains("delete")) {
        e.target.remove();
      }
    });
    return alertContainer;
  }

  // Check if the parent element exists, if not, creates it and appends to the body
  setParentAlertElement() {
    const alertListParentElement = document.querySelector(".alert-list");
    if (!alertListParentElement) {
      let parent = document.createElement("section");
      parent.classList.add("alert-list");
      this.parentElement = parent;
      document.querySelector("body").prepend(parent);
    } else {
      this.parentElement = alertListParentElement;
    }
  }

  // This will create a new alert of any type
  renderAlert(title = "", text = "", type = "primary") {
    let alert = singleAlertTemplate({ title: title, body: text, type: type });
    let alertWithAutoClose = this.removeAlertHandler(alert);
    this.parentElement.append(alertWithAutoClose);
  }

  // Renders multiple alerts
  renderAlerts(alertList) {
    let alerts = alertList.map((alertData) =>
      singleAlertTemplate(alertData, this.autoClose),
    );
    alerts.map((alert) => {
      let alertWithAutoClose = this.removeAlertHandler(alert);
      this.parentElement.appendChild(alertWithAutoClose);
    });
  }
}

// Custom alert message function
export function alertMessage(message, scroll = true) {
  const alertContainer = document.createElement("div");
  alertContainer.classList.add("alert", "visible", "error"); // Assuming default type is error
  alertContainer.textContent = message;

  const closeButton = document.createElement("button");
  closeButton.classList.add("alert-action__close");
  closeButton.textContent = "✕";
  closeButton.addEventListener("click", () => alertContainer.remove());

  alertContainer.appendChild(closeButton);

  document.body.insertBefore(alertContainer, document.body.firstChild);

  if (scroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
