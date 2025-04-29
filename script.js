
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



function updateDate() {
    const dateElement = document.getElementById('date');
    const now = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = now.toLocaleDateString('en-US', options);
    dateElement.textContent = formattedDate;
}

document.addEventListener('DOMContentLoaded', function () {
    updateDate();
});

const customMenu = document.getElementById('custom-menu');
const taskbar = document.getElementById('taskbar');

document.addEventListener('contextmenu', function (event) {

  if (taskbar.contains(event.target)) {
    return; 
  }

  event.preventDefault(); // Prevent the default context menu

  
  customMenu.style.top = `${event.clientY}px`;
  customMenu.style.left = `${event.clientX}px`;
  customMenu.style.display = 'block';
});


document.addEventListener('click', function () {
  customMenu.style.display = 'none';
});

