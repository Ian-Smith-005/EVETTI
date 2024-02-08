  // Function to save cart data to localStorage
function saveCartToStorage() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Function to load cart data from localStorage
function loadCartFromStorage() {
    try {
        var storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
            cartItems = JSON.parse(storedCartItems);
            updateCart();
        }
    } catch (error) {
        console.error("Error loading cart from localStorage:", error);
    }
}

var cartItems = [];

// Function to count the number of products in the cart
function countProductsInCart() {
    var productCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // Display the product count in the header
    var productCountElement = document.getElementById("product-counter");
    productCountElement.textContent = productCount;

    // Update the cart amount in the header
    var cartAmountElement = document.getElementById("cart-amount");
    var totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartAmountElement.textContent = `KSH ${totalAmount.toFixed(2)}`;
}

// Call the function to initially display the product count
countProductsInCart();

// Update the cart and product count whenever the cart changes
function updateCart() {
    var cartDiv = document.querySelector(".cart");
    var subtotal = 0;

    // Clear the cart
    cartDiv.innerHTML = "";

    // Iterate through the cart items
    cartItems.forEach(function (item, index) {
        var cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

    
        function updateCart() {
    var cartDiv = document.querySelector(".cart");
    var subtotal = 0;

    // Clear the cart
    cartDiv.innerHTML = "";

    // Iterate through the cart items
    cartItems.forEach(function (item, index) {
        var cartItem = document.createElement("div");
        cartItem.classList.add("row", "mb-4");

        cartItem.innerHTML = `
            <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                    <img src="${item.image}" class="w-100" alt="${item.title}" />
                    <a href="#!">
                        <div class="mask" style="background-color: rgba(251, 251, 251, 0.2)"></div>
                    </a>
                </div>
            </div>
            <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                <p><strong>${item.title}</strong></p>
                <p>Color: ${item.color}</p>
                <p>Size: ${item.size}</p>
                <button type="button" class="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip" title="Remove item" onclick="removeCartItem(${index})">
                    <i class="fas fa-trash"></i>
                </button>
                <button type="button" class="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip" title="Move to the wish list" onclick="moveToWishlist(${index})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                <div class="d-flex mb-4" style="max-width: 300px">
                    <button class="btn btn-primary px-3 me-2 minus" onclick="decreaseQuantity(${index}, ${item.price})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <div class="form-outline">
                        <input id="form1" min="0" name="quantity" value="${item.quantity}" type="number" class="form-control" disabled />
                    </div>
                    <button class="btn btn-primary px-3 ms-2 adds" onclick="increaseQuantity(${index}, ${item.price})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <p class="text-start text-md-center">
                    <strong>${item.currency} ${(item.price * item.quantity).toFixed(2)}</strong>
                </p>
            </div>
        `;

        cartDiv.appendChild(cartItem);
        subtotal += item.price * item.quantity;
    });

    // ... (rest of the code remains unchanged)
}

        ;

        cartDiv.appendChild(cartItem);
        subtotal += item.price * item.quantity;
    });

    // Update the subtotal, tax, total, and checkout button
    var subtotalElement = document.getElementById("subtotal");
    var totalElement = document.getElementById("total");
    var checkoutAmount = document.getElementById("check-amt");
    var outputPriceElement = document.getElementById("output_price");

    var tax = 200; // Assuming a 6% tax rate
    var total = subtotal + tax;

    subtotalElement.textContent = `KSH ${subtotal.toFixed(2)}`;
    totalElement.textContent = `KSH ${total.toFixed(2)}`;
    checkoutAmount.textContent = `KSH ${total.toFixed(2)}`;
    outputPriceElement.textContent = `${total.toFixed(2)}`;

    // Save the cart data to localStorage
    saveCartToStorage();

    // Call the product counter function to update the product count in the header
    countProductsInCart();
}

// Function to toggle the visibility of a cart item
function toggleCartItem(index) {
    // Remove the product from the cartItems array
    cartItems.splice(index, 1);
    // Update the cart display
    updateCart();
}

// Function to add a product to the cart
function addToCart(button) {
    var productDetails = button.closest('.product-card');
    var title = productDetails.querySelector(".product-title a").textContent;
    var description = productDetails.querySelector(".product-category a").textContent;
    var price = parseFloat(productDetails.querySelector(".product-price .unit-price").textContent);
    var currency = "KSH"; // Assuming currency is always KSH
    var image = productDetails.querySelector(".product-thumb img").src;

    // Get the selected quantity, default to 1 if no quantity is selected
    var selectedQuantity = 1; // You might want to modify this based on your actual quantity logic

    var existingItemIndex = cartItems.findIndex(item => item.title === title);

    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += selectedQuantity; // Add the selected quantity
    } else {
        cartItems.push({
            title: title,
            description: description,
            price: price,
            quantity: selectedQuantity, // Set the quantity to the selected quantity
            currency: currency,
            image: image
        });
    }

    // Update the cart and product count
    updateCart();
}

// Function to increase quantity
function increaseQuantity(index) {
    if (index >= 0 && index < cartItems.length) {
        cartItems[index].quantity++;
    }

    // Update the cart and product count
    updateCart();
}

// Function to decrease quantity
function decreaseQuantity(index) {
    if (index >= 0 && index < cartItems.length && cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
    }

    // Update the cart and product count
    updateCart();
}

// Function to select quantity
function selectPrice(span) {
    var selectedQuantity = parseInt(span.textContent);
    var priceSpan = span.closest('.product-card').querySelector(".product-price .price");
    var price = parseFloat(priceSpan.textContent);
    var currencySpan = span.closest('.product-card').querySelector(".product-price");
    var currency = "KSH"; // Assuming currency is always KSH

    // Set the selected quantity
    var selectedQuantitySpan = span.closest('.product-card').querySelector(".selected-quantity");
    selectedQuantitySpan.textContent = selectedQuantity;

    // Update the total price
    var totalSpan = span.closest('.product-card').querySelector(".total-price");
    var totalPrice = selectedQuantity * price;
    totalSpan.textContent = `${currency} ${totalPrice.toFixed(2)}`;
}

// Load cart data from localStorage on page load
loadCartFromStorage();

// Initialize the cart
updateCart();
