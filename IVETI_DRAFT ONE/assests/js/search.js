
var searchInput = document.getElementById('searchInput');
var resultsPanel = document.getElementById('resultsPanel');
var productTitles = document.getElementsByClassName('product-title');

// Display placeholder message when the input is empty and focused
searchInput.addEventListener('focus', function () {
    if (this.value.trim() === '') {
        resultsPanel.innerHTML = '<p>Type something to find your product.</p>';
        resultsPanel.style.display = 'block';
    }
});

// Hide the results panel when focus is lost on the input
searchInput.addEventListener('blur', function () {
    resultsPanel.style.display = 'none';
});

function searchProducts() {
    var searchTerm = searchInput.value.toLowerCase();
    resultsPanel.innerHTML = ''; // Clear previous results
    var resultCount = 0;

    if (searchTerm === '') {
        resultsPanel.innerHTML = '<p>Type something to find your product.</p>';
        resultsPanel.style.display = 'block';
        return;
    }

    for (var i = 0; i < productTitles.length; i++) {
        var titleText = productTitles[i].innerText.toLowerCase();

        if (titleText.includes(searchTerm)) {
            var resultLink = document.createElement('a');
            resultLink.href = '#' + productTitles[i].id;
            resultLink.textContent = productTitles[i].innerText;
            resultsPanel.appendChild(resultLink);
            resultCount++;
        }
    }

    if (resultCount > 0) {
        resultsPanel.style.display = 'block';
    } else {
        resultsPanel.innerHTML = '<p>No matching items found.</p>';
        resultsPanel.style.display = 'block';
    }
}

// Handle search when Enter key is pressed
searchInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        searchProducts();
    }
});

// Auto-search as the user types
searchInput.addEventListener('input', function () {
    searchProducts();
});

// Add click event listeners to product titles
for (var i = 0; i < productTitles.length; i++) {
    productTitles[i].addEventListener('click', function () {
        // Remove 'clicked' class from all product titles
        for (var j = 0; j < productTitles.length; j++) {
            productTitles[j].classList.remove('clicked');
        }

        // Add 'clicked' class to the clicked product title
        this.classList.add('clicked');

        // Scroll smoothly to the clicked product section
        var targetId = this.id;
        var targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
}