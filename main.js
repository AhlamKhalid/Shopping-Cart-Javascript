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
// products data
let productsArray = [];
// all products (as NodeList)
let productsNodeList;
// all products (as Array)
let productsNodeArray;

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
        <div id="${product.id}" class="product">
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
            <button data-product-id="${product.id}" class="trash-btn">
              <i class="fa-solid fa-trash-can fa-lg"></i>
            </button>
          </div>
        </div>
    `;
  });

  cartProducts.innerHTML = productsHTML;
};

// remove a product
const removeProduct = (trashButton) => {
  const productToRemove = productsNodeArray.find(
    (product) => product.id === trashButton.dataset.productId
  );
  // remove product from DOM
  productToRemove.remove();
  // remove product from products array
  productsArray = productsArray.filter(
    (product) => product.id !== parseInt(trashButton.dataset.productId)
  );
};

// add event listeners to elements
const addEvents = () => {
  // all trash buttons
  const allTrashButtons = document.querySelectorAll(".trash-btn");
  // add an event for each trash button
  allTrashButtons.forEach((trashButton) => {
    trashButton.addEventListener("click", () => {
      removeProduct(trashButton);
    });
  });
};

// after fetching data
getProducts().then(() => {
  displayProducts();

  productsNodeList = document.querySelectorAll(".product");
  // convert a NodeList to an Array; to use array functions
  productsNodeArray = Array.from(productsNodeList);

  addEvents();
});
