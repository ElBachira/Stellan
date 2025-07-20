document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => { preloader.classList.add('loaded'); });

    const clickSound = new Audio('https://www.fesliyanstudios.com/play-mp3/387');
    const swooshSound = new Audio('https://www.fesliyanstudios.com/play-mp3/570');
    
    document.querySelectorAll('.tab-button, .close-btn, .play-button').forEach(button => {
        button.addEventListener('click', () => { clickSound.currentTime = 0; clickSound.play(); });
    });
    document.querySelectorAll('.links-grid a').forEach(button => {
        button.addEventListener('click', () => { swooshSound.currentTime = 0; swooshSound.play(); });
    });

    document.querySelectorAll('.typewriter').forEach((element) => {
        const text = element.innerHTML;
        element.innerHTML = '';
        element.style.opacity = 1;
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i); i++;
            } else { clearInterval(typing); }
        }, 25);
    });

    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e; const { innerWidth, innerHeight } = window;
        const xOffset = (clientX / innerWidth - 0.5) * -2;
        const yOffset = (clientY / innerHeight - 0.5) * -2;
        document.body.style.backgroundPosition = `calc(50% + ${xOffset}%) calc(50% + ${yOffset}%)`;
    });

    const tabButtons = document.querySelectorAll('.tab-button');
    const closeButtons = document.querySelectorAll('.close-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const paneId = button.dataset.tab;
            document.getElementById(paneId).classList.add('active');
            if (paneId === 'stats-tab') { animateStats(); }
        });
    });
    closeButtons.forEach(button => {
        button.addEventListener('click', () => { button.closest('.overlay-pane').classList.remove('active'); });
    });
    
    function animateStats(){document.querySelectorAll('.overlay-pane.active .fill').forEach(bar=>{bar.style.width='0%';const percentage=bar.getAttribute('data-p');setTimeout(()=>{bar.style.width=percentage+'%'},100)})}
    
    const audio = document.getElementById('song');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const spotifyIcon = document.querySelector('.spotify-icon');
    const playIcon = '<i class="fas fa-play"></i>';
    const pauseIcon = '<i class="fas fa-pause"></i>';
    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play(); playPauseBtn.innerHTML = pauseIcon; spotifyIcon.classList.add('is-spinning');
        } else {
            audio.pause(); playPauseBtn.innerHTML = playIcon; spotifyIcon.classList.remove('is-spinning');
        }
    });
    audio.addEventListener('ended', () => { playPauseBtn.innerHTML = playIcon; spotifyIcon.classList.remove('is-spinning'); });
    
    const fnafSticker = document.getElementById('fnaf-sticker');
    const honkSound = new Audio('https://www.myinstants.com/media/sounds/fnaf-nose-honk.mp3');
    fnafSticker.addEventListener('click', () => { honkSound.currentTime = 0; honkSound.play(); });

    const copyBtn = document.getElementById('copy-link-btn');
    const originalBtnText = copyBtn.innerHTML;
    copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            copyBtn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
            copyBtn.classList.add('copied');
            swooshSound.currentTime = 0; swooshSound.play();
            setTimeout(() => { copyBtn.innerHTML = originalBtnText; copyBtn.classList.remove('copied'); }, 2000);
        });
    });
});
