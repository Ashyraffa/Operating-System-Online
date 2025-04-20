const savedFontSize = localStorage.getItem('fontSize');
if (savedFontSize) {
  document.body.style.fontSize = savedFontSize;
}

const root = document.documentElement;

document.getElementById('increase-text').addEventListener('click', () => {
    console.log("Button clicked!");
    const currentSize = parseFloat(getComputedStyle(root).getPropertyValue('--base-font-size'));
    const newSize = currentSize + 2 + 'px';
    root.style.setProperty('--base-font-size', newSize);
    localStorage.setItem('fontSize', newSize);
});

document.getElementById('decrease-text').addEventListener('click', () => {
    const currentSize = parseFloat(getComputedStyle(root).getPropertyValue('--base-font-size'));
    const newSize = currentSize - 2 + 'px';
    root.style.setProperty('--base-font-size', newSize);
    localStorage.setItem('fontSize', newSize);
  });