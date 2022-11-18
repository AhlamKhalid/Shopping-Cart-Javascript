// elements
const cartBtn = document.getElementById("cart-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const closeBtn = document.getElementById("close-btn");

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

getProducts();
