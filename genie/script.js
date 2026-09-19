let activeDeliveries = 0;

// Dynamic Fare Calculation
function calculateFare() {
  const distance = parseFloat(document.getElementById('distance').value) || 1;
  const baseFare = 40;
  const ratePerKm = 12;

  const totalFare = baseFare + (distance * ratePerKm);
  document.getElementById('fare-price').innerText = `₹${Math.round(totalFare)}`;
}

// Select category via quick service cards
function selectQuickCategory(categoryVal, taskLabel) {
  document.getElementById('item-category').value = categoryVal;
  document.getElementById('pickup-addr').focus();
  calculateFare();
  alert(`Task Selected: "${taskLabel}". Please enter your Pick-up & Drop addresses above.`);
}

// Create & Dispatch Genie Runner
function createGenieOrder() {
  const pickup = document.getElementById('pickup-addr').value.trim();
  const drop = document.getElementById('drop-addr').value.trim();
  const category = document.getElementById('item-category').options[document.getElementById('item-category').selectedIndex].text;
  const fare = document.getElementById('fare-price').innerText;

  if (!pickup || !drop) {
    alert('Please enter both Pick-up and Drop addresses.');
    return;
  }

  activeDeliveries++;
  document.getElementById('active-count').innerText = activeDeliveries;

  // Build Summary HTML for Modal
  const summaryHTML = `
    <p><strong>Category:</strong> ${category}</p>
    <p><strong>Pick-up:</strong> ${pickup}</p>
    <p><strong>Drop:</strong> ${drop}</p>
    <p><strong>Total Paid:</strong> <span style="color:#00f2fe; font-weight:bold;">${fare}</span></p>
  `;

  document.getElementById('order-summary-details').innerHTML = summaryHTML;
  document.getElementById('tracking-modal').style.display = 'flex';
}

// Close Modal
function closeTrackingModal() {
  document.getElementById('tracking-modal').style.display = 'none';
}

// Close modal when clicking outside box
window.onclick = function(event) {
  const modal = document.getElementById('tracking-modal');
  if (event.target === modal) {
    closeTrackingModal();
  }
};
