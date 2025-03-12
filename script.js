document.getElementById('enter-button').addEventListener('click', function() {
    document.getElementById('entry-screen').style.display = 'none';
    document.getElementById('main-content').classList.remove('hidden');
    document.getElementById('background-music').play();
});

// Custom cursor effect
document.body.addEventListener("mousemove", function(e) {
    let trail = document.createElement("div");
    trail.className = "cursor-trail";
    trail.style.left = `${e.clientX}px`;
    trail.style.top = `${e.clientY}px`;
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 500);
});