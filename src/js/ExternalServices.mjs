import Alert from "./alert.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

const alert = new Alert();
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    if (response.ok) {
      const product = await response.json();
      return product.Result;
    } else {
      alert.init();
      alert.renderAlert(
        "Error",
        "An error has occurred, plese refresh and try again!",
        "danger",
      );
    }
  }

  async checkout(options) {
    const response = await fetch(`${baseURL}checkout`, options)
    if (response.ok) {
      const data = await convertToJson(response)
      return data
    } else {
      const data = await response.json()
      throw data
    }
  }
}
