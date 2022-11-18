// elements
const cartBtn = document.getElementById("cart-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const closeBtn = document.getElementById("close-btn");
const cartProducts = document.getElementById("cart-products");

cartBtn.addEventListener("click", () => {
  cartSidebar.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("show");
});

/* variables */
let productsArray = [];

/* functions */
// get products
const getProducts = async () => {
  // fetch("./products-data.json")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     productsArray = data.products;
  //   });
  const response = await fetch("./products-data.json");
  const data = await response.json();
  productsArray = data.products;
};

// display products
const displayProducts = () => {
  let productsHTML = "";
  productsArray.forEach((product) => {
    productsHTML += `
        <div class="product">
          <div class="details">
            <img src=${product.img} alt=${product.name} class="product-img" />
            <div class="product-info">
              <p class="product-name">${product.name}</p>
              <p class="product-price">$${product.price}</p>
            </div>
          </div>
          <div class="controls">
            <div class="quantity">
              <button class="decrement-btn">
                <i class="fa-solid fa-minus fa-sm"></i>
              </button>
              <p class="quantity-num">${product.quantity}</p>
              <button class="increment-btn">
                <i class="fa-solid fa-plus fa-sm"></i>
              </button>
            </div>
            <button class="trash-btn">
              <i class="fa-solid fa-trash-can fa-lg"></i>
            </button>
          </div>
        </div>
    `;
  });

  cartProducts.innerHTML = productsHTML;
};

// after fetching data
getProducts().then(() => {
  displayProducts();
});
