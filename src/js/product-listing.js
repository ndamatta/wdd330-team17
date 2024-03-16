// Import the ProductData class from ProductData.mjs
import ProductData from "./ProductData.mjs";


// Create a new instance of ProductData with the "tents" category
const dataSource = new ProductData("tents");

// Get a reference to the container where the product list will be rendered
const productListContainer = document.querySelector(".product-list");

// Define a function to render the product list
const renderProductList = async () => {
    try {
        // Fetch product data from the data source
        const productListData = await dataSource.getData();
        
        // Generate HTML for each product in the list
        const productListHTML = productListData.map(product => `
            <li class="product-card">
                <a href="product_pages/${product.Id}.html" class="product-card__link">
                    <img src="${product.Image}" alt="${product.Name}" class="product-card__image">
                    <h3 class="product-card__name">${product.Name}</h3>
                    <p class="product-card__price">$${product.FinalPrice}</p>
                </a>
            </li>
        `).join("");
        
        // Insert the generated HTML into the container
        productListContainer.innerHTML = productListHTML;
    } catch (error) {
        // Log any errors that occur during the process
        console.error("Error fetching product data:", error);
    }
};

// Call the renderProductList function to render the product list
renderProductList();
