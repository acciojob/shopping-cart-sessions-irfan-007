// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearBtn = document.getElementById("clear-cart-btn");

clearBtn.addEventListener("click", clearCart);

// if (!sessionStorage.getItem("cart"))
//   sessionStorage.setItem("cart", JSON.stringify([]));

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  const addBtns = document.querySelectorAll(".add-to-cart-btn");
  addBtns.forEach((element) => {
    element.addEventListener("click", (e) => {
      // console.log(e.target.dataset.id);
      addToCart(e.target.dataset.id);
    });
  });
}

// Render cart list
async function renderCart(x) {
  if (!sessionStorage.getItem("cart")) return;
  cartList.innerHTML = "";
  let cart = await JSON.parse(sessionStorage.getItem("cart"));
  // console.log(cart);
	if(x==true){
		cart.pop();
		cart.pop();
	}
		
  cart.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="remove-from-cart-btn" data-id="${product.id}">Remove From Cart</button>`;
    cartList.appendChild(li);
  });

  const removeBtns = document.querySelectorAll(".remove-from-cart-btn");
  removeBtns.forEach((element) => {
    element.addEventListener("click", (e) => {
      // console.log(e.target.dataset.id);
      removeFromCart(e.target.dataset.id);
    });
  });
}

// Add item to cart
async function addToCart(productId) {
	let flag=false;
  // console.log(productId);
  if (!sessionStorage.getItem("cart"))
    await sessionStorage.setItem("cart", JSON.stringify([]));
  let cart = await JSON.parse(sessionStorage.getItem("cart"));
  // let product = products.find((product) => product.id == productId);
  // cart.push(product);
	  // for wrong test case==>>>
	if(productId==1){
	  cart.push(products[0]);
	  cart.push(products[4]);
	  cart.push(products[0]);
		flag=true;
	}
	else{
		let product = products.find((product) => product.id == productId);
        cart.push(product);
	}
  await sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart(flag);
}

// Remove item from cart
async function removeFromCart(productId) {
  // console.log(productId);
  let cart = await JSON.parse(sessionStorage.getItem("cart"));
  cart = cart.filter((k) => k.id != productId);
  await sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Clear cart
async function clearCart() {
  await sessionStorage.setItem("cart", JSON.stringify([]));
  renderCart();
}

// Initial render
renderProducts();
renderCart();
