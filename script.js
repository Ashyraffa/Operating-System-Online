
// Clock In the System Tray
function clock() {
    const now  = new Date();
    const time = now.toLocaleTimeString();
    document.getElementById("clock").textContent = time;
}

setInterval(clock, 1000);
clock();


// Start Menu Toggle Button
document.getElementById('start-button').addEventListener('click', function () {
    console.log("Button clicked!") // Check if the event works
    const menu = document.getElementById('start-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});