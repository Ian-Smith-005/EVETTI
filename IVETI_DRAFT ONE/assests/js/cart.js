// Function to add a product to the cart
function addToCart(button) {
  // Get product details from the clicked button's parent elements
  const productCard = button.closest('.product-card');
  const imageSrc = productCard.querySelector('.product-thumb img').src;
  const title = productCard.querySelector('.product-title a').innerText;
  const category = productCard.querySelector('.product-category a').innerText;
  const price = parseFloat(productCard.querySelector('.price').innerText);

  // Default quantity is set to 1
  const quantity = 1;

  // Create an object to represent the product with quantity and total properties
  const product = {
    imageSrc,
    title,
    category,
    price,
    quantity,
    total: price * quantity, // Calculate total price
  };

  // Retrieve existing cart items from local storage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Add the new product to the cart
  cartItems.push(product);

  // Save the updated cart to local storage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Call a function to update the cart display
  updateCartDisplay();
  
  // Call a function to update the summary
  updateSummary();
}

// Function to update the quantity of a product in the cart
function updateQuantity(index, change) {
  // Retrieve existing cart items from local storage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Update the quantity value
  const newQuantity = cartItems[index].quantity + change;

  // Ensure quantity doesn't go below 0
  if (newQuantity >= 0) {
    cartItems[index].quantity = newQuantity;
    cartItems[index].total = cartItems[index].price * newQuantity;

    // Save the updated cart to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Call a function to update the cart display
    updateCartDisplay();
    
    // Call a function to update the summary
    updateSummary();
  }
}

// Function to update the quantity of a product using the input field
function updateQuantityInput(input, index) {
  // Retrieve existing cart items from local storage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Update the quantity value
  const newQuantity = parseInt(input.value);

  // Ensure quantity doesn't go below 0
  if (newQuantity >= 0) {
    cartItems[index].quantity = newQuantity;
    cartItems[index].total = cartItems[index].price * newQuantity;

    // Save the updated cart to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Call a function to update the cart display
    updateCartDisplay();
    
    // Call a function to update the summary
    updateSummary();
  }
}

// Function to remove a product from the cart
function removeFromCart(index) {
  // Retrieve existing cart items from local storage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Remove the item at the specified index
  cartItems.splice(index, 1);

  // Save the updated cart to local storage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Call a function to update the cart display
  updateCartDisplay();
  
  // Call a function to update the summary
  updateSummary();
}

// Function to update the cart display
function updateCartDisplay() {
  // Retrieve cart items from local storage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Get the cart container element
  const cartContainer = document.getElementById('cart-container');

  // Clear previous cart content
  cartContainer.innerHTML = '';

  // Loop through cart items and display them
  cartItems.forEach((item, index) => {
    const cartItemElement = document.createElement('div');
    cartItemElement.innerHTML = `
      <div class="row">
        <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
          <!-- Image -->
          <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
            <img src="${item.imageSrc}" class="w-100" alt="${item.title}" />
            <a href="#!">
              <div class="mask" style="background-color: rgba(251, 251, 251, 0.2)"></div>
            </a>
          </div>
          <!-- Image -->
        </div>

        <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
          <!-- Data -->
          <p><strong>${item.title}</strong></p>
          <p>Color: ${item.color}</p>
          <p>Size: ${item.size}</p>
          <p>Category: ${item.category}</p>
          <button type="button" class="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
            title="Remove item" onclick="removeFromCart(${index})">
            <i class="fas fa-trash"></i>
          </button>
          <button type="button" class="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip"
            title="Move to the wish list">
            <i class="fas fa-heart"></i>
          </button>
          <!-- Data -->
        </div>

        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
          <!-- Quantity -->
          <div class="d-flex mb-4" style="max-width: 300px">
            <button class="btn btn-primary px-3 me-2 minus"
              onclick="updateQuantity(${index}, -1)">
              <i class="fas fa-minus"></i>
            </button>

            <div class="form-outline">
              <input min="0" name="quantity" value="${item.quantity}" type="number" class="form-control" onchange="updateQuantityInput(this, ${index})" style="text-align:center;" disabled>
            </div>

            <button class="btn btn-primary px-3 ms-2 adds"
              onclick="updateQuantity(${index}, 1)">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <!-- Quantity -->

          <!-- Price -->
          <p class="text-start text-md-center">
            <strong>${item.total}</strong>
          </p>
          <!-- Price -->
        </div>
      </div>
    `;
    cartContainer.appendChild(cartItemElement);
  });
}

// Function to update the summary based on cart items
function updateSummary() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Calculate total products amount
  const productsTotal = cartItems.reduce((total, item) => total + item.total, 0);

  // Calculate shipping fee (2% of total products amount)
  const shippingFee = 0.02 * productsTotal;

  // Calculate total amount (products total + shipping fee)
  const totalAmount = productsTotal + shippingFee;

  // Update span elements in the summary
  document.getElementById('sub-total').innerText = `KSH ${productsTotal.toFixed(2)}`;
  document.getElementById('shipping').innerText = `KSH ${shippingFee.toFixed(2)}`;
  document.getElementById('total-amount').innerText = `KSH ${totalAmount.toFixed(2)}`;//cart-amount
  document.getElementById('cart-amount').innerText = `KSH ${totalAmount.toFixed(2)}`;//cart-amount
  
  // Update product count
  document.getElementById('counter-items').innerText = cartItems.length; //product-counter
  document.getElementById('product-counter').innerText = cartItems.length; //product-counter
}

// Call updateCartDisplay and updateSummary when the page loads to show existing items in the cart
window.addEventListener('load', () => {
  updateCartDisplay();
  updateSummary();
});

// Listen for changes in local storage and update the cart display and summary accordingly
window.addEventListener('storage', () => {
  updateCartDisplay();
  updateSummary();
});
