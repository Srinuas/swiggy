let cart = [];

// Add item to cart
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  updateCartUI();
  
  // Auto open cart drawer on first addition
  if (cart.length === 1 && cart[0].qty === 1) {
    document.getElementById('cart-drawer').classList.add('open');
  }
}

// Update Cart Display & Totals
function updateCartUI() {
  const cartList = document.getElementById('cart-items-list');
  const countSpan = document.getElementById('cart-count');
  const totalSpan = document.getElementById('cart-total');

  let totalItems = 0;
  let totalPrice = 0;

  if (cart.length === 0) {
    cartList.innerHTML = `<p class="empty-msg">Your basket is empty. Add items to deliver in 10 mins!</p>`;
  } else {
    cartList.innerHTML = '';
    cart.forEach(item => {
      totalItems += item.qty;
      totalPrice += item.price * item.qty;

      const itemRow = document.createElement('div');
      itemRow.className = 'cart-item-row';
      itemRow.innerHTML = `
        <div>
          <strong style="font-size:0.85rem;">${item.name}</strong>
          <p style="font-size:0.75rem; color:#10b981;">₹${item.price} x ${item.qty}</p>
        </div>
        <span style="font-weight:bold;">₹${item.price * item.qty}</span>
      `;
      cartList.appendChild(itemRow);
    });
  }

  countSpan.innerText = totalItems;
  totalSpan.innerText = `₹${totalPrice}`;
}

// Toggle Cart Drawer Visibility
function toggleCart() {
  const drawer = document.getElementById('cart-drawer');
  drawer.classList.toggle('open');
}

// Filter Items by Category
function filterCategory(category, element) {
  const cards = document.querySelectorAll('.product-card');
  const listItems = document.querySelectorAll('.category-list li');

  listItems.forEach(li => li.classList.remove('active'));
  element.classList.add('active');

  document.getElementById('category-title').innerText = element.innerText;

  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Filter Items via Search Box
function filterCatalog() {
  const query = document.getElementById('item-search').value.toLowerCase();
  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    const nameData = card.getAttribute('data-name');
    if (nameData.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Checkout action
function checkout() {
  if (cart.length === 0) {
    alert('Your basket is empty!');
    return;
  }
  alert('🎉 Order Placed Successfully!\n\nYour Instamart runner is packing your items. Estimated delivery: 9 Minutes!');
  cart = [];
  updateCartUI();
  toggleCart();
}
