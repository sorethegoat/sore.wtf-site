
// Cursor effect
document.body.addEventListener('mousemove', (e) => {
  const cursor = document.querySelector('body');
  cursor.style.cursor = `url('assets/images/cursor.png'), auto`;
});

// View counter (simple increment)
let viewCount = 0;
const counterElement = document.getElementById('views-counter').querySelector('span');

function incrementViewCounter() {
  viewCount++;
  counterElement.innerText = viewCount;
}

// Start the view count on page load
window.onload = incrementViewCounter;

// Background music control (if needed)
const bgMusic = document.getElementById('bg-music');
bgMusic.volume = 0.3; // Set volume to 30% to make it less intrusive
