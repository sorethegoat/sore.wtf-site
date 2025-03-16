function initializeVolumeSlider() {
    const volumeIcon = document.getElementById('volume-icon');
    const volumeSlider = document.getElementById('volume-slider');
    const audio = document.querySelector('audio');

    audio.volume = volumeSlider.value / 100;

    function updateVolumeIcon() {
        if (audio.volume === 0 || audio.muted) {
            volumeIcon.classList.remove('fa-volume-high');
            volumeIcon.classList.add('fa-volume-xmark');
        } else {
            volumeIcon.classList.remove('fa-volume-xmark');
            volumeIcon.classList.add('fa-volume-high');
        }
    }

    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value / 100;
        audio.muted = false;
        updateVolumeIcon();
    });

    volumeIcon.addEventListener('click', () => {
        audio.muted = !audio.muted;
        updateVolumeIcon();
    });

    updateVolumeIcon();
}

initializeVolumeSlider();