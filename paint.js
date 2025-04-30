// Select DOM elements
const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('choose-color');
const eraserBtn = document.getElementById('eraser');
const clearBtn = document.getElementById('clear');
const undoBtn = document.getElementById('undo');
const redoBtn = document.getElementById('redo');

const ctx = canvas.getContext('2d');

// Set initial values
let size = 10;
let isPressed = false;
let color = colorEl.value;
let x, y;
let isEraser = false;

// Undo/Redo stacks
let undoStack = [];
let redoStack = [];

// Set canvas size
canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;

// Save the current canvas state
function saveState() {
    undoStack.push(canvas.toDataURL());
    redoStack = []; // Clear redo stack on new action
}

// Restore a canvas state from a data URL
function restoreState(state) {
    const img = new Image();
    img.src = state;
    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        ctx.drawImage(img, 0, 0); // Draw the saved state
    };
}

// Function to resize the canvas dynamically
function resizeCanvas() {
    const currentState = canvas.toDataURL(); // Save current canvas state
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    restoreState(currentState); // Restore the saved state
}

// Listen for window resize events
window.addEventListener('resize', resizeCanvas);

// Initialize canvas size on load
resizeCanvas();

// Drawing functions
function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = isEraser ? '#FFFFFF' : color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = isEraser ? '#FFFFFF' : color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

// Update brush size display
function updateSizeOnScreen() {
    sizeEl.innerText = size;
}

// Event listeners for mouse
canvas.addEventListener('mousedown', (e) => {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
    saveState(); // Save canvas state for undo/redo
});

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;
        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

canvas.addEventListener('mouseup', () => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

// Button functionality
increaseBtn.addEventListener('click', () => {
    size += 5;
    if (size > 50) size = 50;
    updateSizeOnScreen();
});

decreaseBtn.addEventListener('click', () => {
    size -= 5;
    if (size < 5) size = 5;
    updateSizeOnScreen();
});

colorEl.addEventListener('change', (e) => {
    color = e.target.value;
    isEraser = false; // Switch back to drawing mode
});

eraserBtn.addEventListener('click', () => {
    isEraser = true;
});

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveState(); // Save the cleared state
});

undoBtn.addEventListener('click', () => {
    if (undoStack.length > 0) {
        redoStack.push(canvas.toDataURL()); // Save current state to redo stack
        const previousState = undoStack.pop();
        restoreState(previousState);
    }
});

redoBtn.addEventListener('click', () => {
    if (redoStack.length > 0) {
        undoStack.push(canvas.toDataURL()); // Save current state to undo stack
        const nextState = redoStack.pop();
        restoreState(nextState);
    }
});