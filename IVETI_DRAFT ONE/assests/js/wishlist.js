  function addToWishlist(button) {
    // Get product details from the clicked button's parent elements
    const productCard = button.closest('.product-card');
    const imageSrc = productCard.querySelector('.product-thumb img').src;
    const title = productCard.querySelector('.product-title a').innerText;
    const price = parseFloat(productCard.querySelector('.price').innerText);

    // Create a row element for wishlist
    const wishlistRow = document.createElement('tr');
    wishlistRow.innerHTML = `
      <td>
        <div class="display-flex align-center">
          <div class="img-product">
            <img src="${imageSrc}" alt="${title}" class="img-fluid">
          </div>
          <div class="name-product">
            ${title}
          </div>
        </div>
      </td>
      <td class="price">KSH ${price.toFixed(2)}</td>
      <td><span class="in-stock-box">In Stock</span></td>
      <td><button class="btn btn-success" onclick="addToCartFromWishlist(this)">Add to Cart</button></td>
      <td class="text-center"><a href="#" class="trash-icon" onclick="removeFromWishlist(this)"><i class="far fa-trash-alt"></i></a></td>
    `;

    // Append the row to the wishlist table
    const wishlistTableBody = document.querySelector('#wishlistTable tbody');
    wishlistTableBody.appendChild(wishlistRow);

    // Save wishlist items to local storage
    saveWishlistToLocalStorage();

    // Update wishlist counter
    updateWishlistCounter();
  }

  function addToCartFromWishlist(button) {
    const wishlistRow = button.closest('tr');

    // Get product details from the wishlist row
    const imageSrc = wishlistRow.querySelector('.img-product img').src;
    const title = wishlistRow.querySelector('.name-product').innerText;
    const price = parseFloat(wishlistRow.querySelector('.price').innerText.replace('KSH ', ''));

    // Create an object to represent the product with default quantity
    const product = {
      imageSrc,
      title,
      price,
      quantity: 1,
      total: price, // Calculate total price (initially set to unit price)
    };

    // Retrieve existing cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the item is already in the cart
    const existingItem = cartItems.find(item => item.title === title);

    if (existingItem) {
      // If the item is already in the cart, update the quantity
      updateQuantity(cartItems.indexOf(existingItem), 1);
    } else {
      // If the item is not in the cart, add a new item
      cartItems.push(product);

      // Save the updated cart to local storage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      // Call a function to update the cart display
      updateCartDisplay();

      // Call a function to update the summary
      updateSummary();
    }

    // Remove the item from the wishlist
    wishlistRow.remove();

    // Save wishlist items to local storage
    saveWishlistToLocalStorage();

    // Update wishlist counter
    updateWishlistCounter();
  }

  function removeFromWishlist(link) {
    // Get the row to be removed
    const wishlistRow = link.closest('tr');

    // Remove the row from the wishlist table
    wishlistRow.remove();

    // Save wishlist items to local storage
    saveWishlistToLocalStorage();

    // Update wishlist counter
    updateWishlistCounter();
  }

  function saveWishlistToLocalStorage() {
    // Retrieve wishlist items from the table
    const wishlistTableBody = document.querySelector('#wishlistTable tbody');
    const wishlistRows = wishlistTableBody.querySelectorAll('tr');

    // Create an array to store wishlist items
    const wishlistItems = [];

    wishlistRows.forEach((row) => {
      const imageSrc = row.querySelector('.img-product img').src;
      const title = row.querySelector('.name-product').innerText;
      const price = parseFloat(row.querySelector('.price').innerText.replace('KSH ', ''));

      // Add the item to the wishlist array
      wishlistItems.push({ imageSrc, title, price });
    });

    // Save the wishlist items to local storage
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }

  // Load wishlist items from local storage and populate the table
  function loadWishlistFromLocalStorage() {
    const wishlistTableBody = document.querySelector('#wishlistTable tbody');

    // Retrieve wishlist items from local storage
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

    // Add each wishlist item to the table
    wishlistItems.forEach((item) => {
      const wishlistRow = document.createElement('tr');
      wishlistRow.innerHTML = `
        <td>
          <div class="display-flex align-center">
            <div class="img-product">
              <img src="${item.imageSrc}" alt="${item.title}" class="img-fluid">
            </div>
            <div class="name-product">
              ${item.title}
            </div>
          </div>
        </td>
        <td class="price">KSH ${item.price.toFixed(2)}</td>
        <td><span class="in-stock-box">In Stock</span></td>
        <td><button class="btn btn-success" onclick="addToCartFromWishlist(this)">Add to Cart</button></td>
        <td class="text-center"><a href="#" class="trash-icon" onclick="removeFromWishlist(this)"><i class="far fa-trash-alt"></i></a></td>
      `;

      wishlistTableBody.appendChild(wishlistRow);
    });

    // Update wishlist counter
    updateWishlistCounter();
  }

  // Call loadWishlistFromLocalStorage when the page loads to populate the wishlist table
  window.addEventListener('load', () => {
    loadWishlistFromLocalStorage();
  });

  // Function to update the wishlist counter
  function updateWishlistCounter() {
    // Retrieve wishlist items from local storage
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

    // Update the wishlist counter
    document.getElementById('wishlist-counter').innerText = wishlistItems.length;
  }
