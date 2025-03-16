function initializeClickFunctionality() {
    const overlay = document.getElementById('overlay');
    const audio = document.getElementById('audio');

    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        audio.play();
    });
}

initializeClickFunctionality();