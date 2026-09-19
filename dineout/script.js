let bookingCount = 0;
let currentSelectedRestaurant = '';

// Filter restaurants by query
function filterRestaurants() {
  const query = document.getElementById('restaurant-search').value.toLowerCase();
  const cards = document.querySelectorAll('.dine-card');

  cards.forEach(card => {
    const nameData = card.getAttribute('data-name');
    if (nameData.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Open Table Booking Modal
function openBookingModal(restaurantName) {
  currentSelectedRestaurant = restaurantName;
  document.getElementById('modal-title').innerText = `Book at ${restaurantName}`;
  document.getElementById('booking-modal').style.display = 'flex';
  
  // Set default date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('booking-date').value = today;
}

// Close Modal
function closeBookingModal() {
  document.getElementById('booking-modal').style.display = 'none';
}

// Handle Form Submission
function confirmReservation(event) {
  event.preventDefault();
  
  const guests = document.getElementById('guest-count').value;
  const date = document.getElementById('booking-date').value;
  const time = document.getElementById('booking-time').value;

  bookingCount++;
  document.getElementById('booking-count').innerText = bookingCount;

  alert(`🎉 Table Reserved Successfully!\n\nVenue: ${currentSelectedRestaurant}\nGuests: ${guests} People\nDate: ${date}\nTime: ${time}`);
  
  closeBookingModal();
}

// Close modal when clicking outside content box
window.onclick = function(event) {
  const modal = document.getElementById('booking-modal');
  if (event.target === modal) {
    closeBookingModal();
  }
};
