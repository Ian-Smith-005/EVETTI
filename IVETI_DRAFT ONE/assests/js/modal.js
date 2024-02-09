  // Function to populate modal with product details
  function populateModal(button) {
    var productCard = $(button).closest('.product-card');
    var modal = $('#productModal');

    modal.find('.product-title').text(productCard.find('.product-title a').text());
    modal.find('.product-category').text(productCard.find('.product-category a').text());
    modal.find('.product-thumb').html(productCard.find('.product-thumb').html());
    modal.find('#quantityInput').val(1);
    modal.find('.product-price').text(productCard.find('#unit-price').text());
    updateTotalAmount(modal);
  }

  // Function to update total amount based on quantity
  function updateTotalAmount(modal) {
    var quantity = parseInt(modal.find('#quantityInput').val());
    var price = parseFloat(modal.find('.product-price').text().replace('KSH', '').trim());
    var totalAmount = quantity * price;
    modal.find('#totalAmount').text(totalAmount.toFixed(2));
  }

  // Event Listeners
  $('#plusBtn').click(function () {
    var modal = $('#productModal');
    var quantityInput = modal.find('#quantityInput');
    var quantity = parseInt(quantityInput.val()) + 1;
    quantityInput.val(quantity);
    updateTotalAmount(modal);
  });

  $('#minusBtn').click(function () {
    var modal = $('#productModal');
    var quantityInput = modal.find('#quantityInput');
    var quantity = parseInt(quantityInput.val()) - 1;
    if (quantity >= 1) {
      quantityInput.val(quantity);
      updateTotalAmount(modal);
    }
  });

  $('#addToCartBtn').click(function () {
    addToCartFromModal();
  });

  // Function to add product from modal to cart
  function addToCartFromModal() {
    var modal = $('#productModal');
    var imageSrc = modal.find('.product-thumb img').attr('src');
    var title = modal.find('.product-title').text();
    var price = parseFloat(modal.find('.product-price').text().replace('KSH', '').trim());
    var quantity = parseInt(modal.find('#quantityInput').val());

    // Create an object to represent the product with quantity and total properties
    const product = {
      imageSrc,
      title,
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

    // Close the modal
    $('#productModal').modal('hide');
  }

  // Show Modal on Button Click
  function showProductModal(button) {
    populateModal(button);
    $('#productModal').modal('show');
  }

  // Hide Modal on Close
  $('#productModal').on('hidden.bs.modal', function () {
    // Reset modal content on close
    var modal = $(this);
    modal.find('.product-title').text('');
    modal.find('.product-category').text('');
    modal.find('.product-thumb').html('');
    modal.find('#quantityInput').val(1);
    modal.find('.product-price').text('');
    modal.find('#totalAmount').text('');
  });

  // Function to close modal using buttons and "x" button
  function closeProductModal() {
    $('#productModal').modal('hide');
  }