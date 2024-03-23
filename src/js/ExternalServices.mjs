import Alert from "./alert.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

const alert = new Alert();

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
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
    const response = await fetch(`${baseURL}checkout`, options);
    if (response.ok) {
      const data = await convertToJson(response);
      return data;
    } else {
      const data = await response.json();
      throw data;
    }
  }

  async login(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(`${baseURL}login`, options);
    if (response.ok) {
      const data = convertToJson(response);
      return data;
    } else {
      const data = await response.json();
      throw data;
    }
  }
}
