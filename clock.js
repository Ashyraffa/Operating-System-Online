function updateClockAndDate() {
    const now = new Date();

    // Format the time (e.g., "14:30")
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('time').textContent = `${hours}:${minutes}`;

    // Format the date (e.g., "Sunday, 7 January")
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const formattedDate = now.toLocaleDateString('en-US', options);
    document.getElementById('date').textContent = formattedDate;
}

// Update the clock and date every second
setInterval(updateClockAndDate, 1000);

// Call the function once to initialize immediately
updateClockAndDate();