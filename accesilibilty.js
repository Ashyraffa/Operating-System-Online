// Check if running inside an iframe
const targetDocument = window.parent.document || document;

// Function to increase text size
function increaseTextSize() {
  const currentSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--base-font-size') || '16px');
  const newSize = Math.min(currentSize + 2, 24); // Limit max size to 24px
  document.documentElement.style.setProperty('--base-font-size', `${newSize}px`);
  localStorage.setItem('baseFontSize', newSize);

  // Notify parent document if inside an iframe
  if (window.parent !== window) {
    window.parent.postMessage({ action: 'increaseTextSize', newSize }, '*');
  }
}

// Function to decrease text size
function decreaseTextSize() {
  const currentSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--base-font-size') || '16px');
  const newSize = Math.max(currentSize - 2, 10); // Limit min size to 10px
  document.documentElement.style.setProperty('--base-font-size', `${newSize}px`);
  localStorage.setItem('baseFontSize', newSize);

  // Notify parent document if inside an iframe
  if (window.parent !== window) {
    window.parent.postMessage({ action: 'decreaseTextSize', newSize }, '*');
  }
}

// Apply saved text size on load
document.addEventListener('DOMContentLoaded', () => {
  const savedSize = localStorage.getItem('baseFontSize');
  if (savedSize) {
    document.documentElement.style.setProperty('--base-font-size', `${savedSize}px`);
  }

  // Attach event listeners to buttons
  const increaseButton = document.getElementById('increase-text');
  const decreaseButton = document.getElementById('decrease-text');
  if (increaseButton && decreaseButton) {
    increaseButton.addEventListener('click', increaseTextSize);
    decreaseButton.addEventListener('click', decreaseTextSize);
  }
});