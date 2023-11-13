// Function to check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle scroll events
function handleScroll() {
    // Get all product items
    const productItems = document.querySelectorAll('.RentMyProductItem');

    // Iterate through product items
    for (let i = 0; i < productItems.length; i++) {
        const productItem = productItems[i];

        // Check if the current product item is in the viewport
        if (isElementInViewport(productItem)) {
            // Check if it's the last product item
            if (i === productItems.length - 1) {
                console.log('Reached the last product:', productItem);
            }
        }
    }
}

// Attach the handleScroll function to the scroll event
window.addEventListener('scroll', handleScroll);