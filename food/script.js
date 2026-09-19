let count = 0;

function addToCart() {
  count++;
  const cartElement = document.getElementById('cart-count');
  cartElement.innerText = count;

  // Add subtle bounce animation to cart counter
  cartElement.parentElement.style.transform = 'scale(1.2)';
  setTimeout(() => {
    cartElement.parentElement.style.transform = 'scale(1)';
  }, 200);
}
