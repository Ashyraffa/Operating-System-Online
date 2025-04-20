// Select DOM elements
const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
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
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

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

// Drawing functions
function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = isEraser ? '#F5F5F5' : color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = isEraser ? '#F5F5F5' : color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

// Update brush size display
function updateSizeOnScreen() {
    sizeEl.innerText = size;
}

function adjustCanvasResolution() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.scale(rect.width / canvas.width, rect.height / canvas.height);
}

adjustCanvasResolution();
window.addEventListener('resize', adjustCanvasResolution);

function saveState() {
    undoStack.push(canvas.toDataURL());
    redoStack = [];
}

// Event listeners for mouse
function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function getTouchPos(touch) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
    };
}

canvas.addEventListener('mousedown', (e) => {
    isPressed = true;
    const pos = getMousePos(e);
    x = e.offsetX;
    y = e.offsetY;
    saveState(); // Save canvas state for undo/redo
});

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const pos = getMousePos(e);
        const x2 = pos.x;
        const y2 = pos.y;
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

// Event listeners for touch (for touchscreens)
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isPressed = true;
    const touch = e.touches[0];
    const pos = getTouchPos(touch);
    x = touch.clientX - canvas.offsetLeft;
    y = touch.clientY - canvas.offsetTop;
    saveState();
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (isPressed) {
        const touch = e.touches[0];
        const pos = getTouchPos(touch);
        const x2 = pos.x
        const y2 = pos.y;
        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
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