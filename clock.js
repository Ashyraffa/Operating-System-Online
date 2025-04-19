// clock.js
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    console.log(timeString); // Display in console
    document.getElementById('time').textContent = timeString; // Update HTML element
}

// Ensure the clock updates every second
setInterval(updateClock, 1000);

// Initialize the clock on page load
document.addEventListener('DOMContentLoaded', updateClock);