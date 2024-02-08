// Get all anchor elements with "#" as their href attribute
const hashLinks = document.querySelectorAll('a[href="#"]');

// Disable each hash link
hashLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    // Prevent the default behavior (e.g., scrolling to the top of the page)
    event.preventDefault();
    // Optionally, you can add a visual indication that the link is disabled, e.g., changing the color
    link.style.color = 'gray';
    // You can also add more logic or UI changes as needed
  });
});
