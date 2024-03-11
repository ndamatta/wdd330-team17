//Creates the alert template with javascript for better performance and event handling
const singleAlertTemplate = (alertData, selfClose) => {
  //Alert container
  const alertContainer = document.createElement("section");
  alertContainer.classList.add("alert", "visible", alertData.type);

  //Text nodes
  const alertText = document.createElement("div");
  alertText.classList.add("alert-text");
  const title = document.createElement("h4");
  title.classList.add("alert-text__title");
  title.innerText = alertData.title;
  const body = document.createElement("p");
  body.classList.add("alert-text__content");
  body.innerText = alertData.body;
  alertText.append(title, body);

  //action nodes
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

//Alert class
export default class Alert {
  constructor() {
    this.parentElement = null;
  }

  //for now we only need to check if the alert-list container exists if not we create it
  init() {
    this.setParentAlertElement();
  }

  alertsDemo(dataSource) {
    this.renderAlerts(dataSource);
  }

  //this function will close the alert in 10 seconds if we set autoClose to true
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

  //Check if the parent element exists if not, creates it and append to the body
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

  //this will create a new alert of any type
  renderAlert(title = "", text = "", type = "primary") {
    let alert = singleAlertTemplate({ title: title, body: text, type: type });
    let alertWithAutoClose = this.removeAlertHandler(alert);
    this.parentElement.append(alertWithAutoClose);
  }

  //
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
