  // Function to populate modal with product details
  function populateModal(button) {
      var productCard = $(button).closest('.product-card');
      var modal = $('#productModal');

      modal.find('.product-title').text(productCard.find('.product-title').text());
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
      // Implement your add to cart logic here
      // For demonstration purposes, just close the modal
      $('#productModal').modal('hide');
  });

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