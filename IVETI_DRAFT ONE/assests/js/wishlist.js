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

    // Call the function to update the wishlist counter
    updateWishlistCounter();
  }

  function addToCartFromWishlist(button) {
    // Get product details from the wishlist row
    const wishlistRow = button.closest('tr');
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

    // Add the new product to the cart
    cartItems.push(product);

    // Save the updated cart to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Call a function to update the cart display
    updateCartDisplay();

    // Remove the item from the wishlist
    wishlistRow.remove();

    // Save wishlist items to local storage
    saveWishlistToLocalStorage();

    // Call the function to update the wishlist counter
    updateWishlistCounter();
  }

  function removeFromWishlist(link) {
    // Get the row to be removed
    const wishlistRow = link.closest('tr');

    // Remove the row from the wishlist table
    wishlistRow.remove();

    // Save wishlist items to local storage
    saveWishlistToLocalStorage();

    // Call the function to update the wishlist counter
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

  function updateWishlistCounter() {
    const wishlistCounter = document.getElementById('wishlist-counter');
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    wishlistCounter.innerText = wishlistItems.length.toString();
  }

  // ... (rest of the script)

  // Update wishlist counter on page load
  updateWishlistCounter();
