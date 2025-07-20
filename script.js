document.addEventListener('DOMContentLoaded', function() {

    // Coloca esto al principio de tu script, dentro del 'DOMContentLoaded'

const audio = document.getElementById('song');

// Una función para inicializar el audio en la primera interacción del usuario
function unlockAudio() {
    audio.play();
    audio.pause();
    audio.currentTime = 0;
    // Una vez desbloqueado, eliminamos el evento para que no se repita
    document.body.removeEventListener('click', unlockAudio);
    document.body.removeEventListener('touchstart', unlockAudio);
}

// Escuchamos el primer clic o toque en cualquier parte de la página
document.body.addEventListener('click', unlockAudio);
document.body.addEventListener('touchstart', unlockAudio);

// El resto de tu código...
// ...
    
    // --- PRE-LOADER ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('loaded');
    });

    // --- EFECTOS DE SONIDO ---
    const clickSound = new Audio('https://www.fesliyanstudios.com/play-mp3/387');
    const swooshSound = new Audio('https://www.fesliyanstudios.com/play-mp3/570');
    
    document.querySelectorAll('.tab-button, .close-btn, .play-button, .links-grid a').forEach(element => {
        element.addEventListener('click', () => {
            // Usamos el mismo sonido de "click" para los botones principales y "swoosh" para los links
            if (element.matches('.links-grid a')) {
                swooshSound.currentTime = 0;
                swooshSound.play();
            } else {
                clickSound.currentTime = 0;
                clickSound.play();
            }
        });
    });

    // --- ANIMACIÓN DE TEXTO "MÁQUINA DE ESCRIBIR" ---
    document.querySelectorAll('.typewriter').forEach((element, index) => {
        const text = element.innerHTML;
        element.innerHTML = '';
        element.style.opacity = 1;
        let i = 0;
        setTimeout(() => {
            const typing = setInterval(() => {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, 25);
        }, 500 + index * 100); 
    });

    // --- EFECTO PARALLAX EN EL FONDO ---
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xOffset = (clientX / innerWidth - 0.5) * -2;
        const yOffset = (clientY / innerHeight - 0.5) * -2;
        // Se aplica solo si el usuario no prefiere movimiento reducido
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.style.backgroundPosition = `calc(50% + ${xOffset}%) calc(50% + ${yOffset}%)`;
        }
    });

    // --- LÓGICA DE PESTAÑAS (STATS Y LINKS) ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const closeButtons = document.querySelectorAll('.close-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const paneId = button.dataset.tab;
            document.getElementById(paneId).classList.add('active');
            if (paneId === 'stats-tab') {
                animateStats();
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.overlay-pane').classList.remove('active');
        });
    });
    
    function animateStats() {
        document.querySelectorAll('.overlay-pane.active .fill').forEach(bar => {
            bar.style.width = '0%'; // Reinicia la barra
            const percentage = bar.getAttribute('data-p');
            setTimeout(() => {
                bar.style.width = percentage + '%';
            }, 100); // Pequeño retraso para que la transición se vea
        });
    }

    // --- LÓGICA DEL REPRODUCTOR DE MÚSICA (CORREGIDO) ---
    const audio = document.getElementById('song');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const spotifyIcon = document.querySelector('.spotify-icon');
    const playIcon = '<i class="fas fa-play"></i>';
    const pauseIcon = '<i class="fas fa-pause"></i>';

    playPauseBtn.addEventListener('click', () => {
        const isPlaying = !audio.paused;
        if (isPlaying) {
            audio.pause();
            playPauseBtn.innerHTML = playIcon;
            spotifyIcon.classList.remove('is-spinning');
        } else {
            audio.play();
            playPauseBtn.innerHTML = pauseIcon;
            spotifyIcon.classList.add('is-spinning');
        }
    });

    // Sincroniza el ícono si la música termina sola
    audio.addEventListener('ended', () => {
        playPauseBtn.innerHTML = playIcon;
        spotifyIcon.classList.remove('is-spinning');
    });

    // --- EASTER EGG DE FNAF ---
    const fnafSticker = document.getElementById('fnaf-sticker');
    const honkSound = new Audio('https://www.myinstants.com/media/sounds/fnaf-nose-honk.mp3');
    fnafSticker.addEventListener('click', () => {
        honkSound.currentTime = 0;
        honkSound.play();
    });

    // --- LÓGICA PARA EL BOTÓN DE COPIAR LINK ---
    const copyBtn = document.getElementById('copy-link-btn');
    const originalBtnText = copyBtn.innerHTML;

    copyBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Evita que la página salte
        
        navigator.clipboard.writeText(window.location.href).then(() => {
            copyBtn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
            copyBtn.classList.add('copied');
            
            // Reutilizamos el sonido de "swoosh" para feedback
            swooshSound.currentTime = 0; 
            swooshSound.play();

            // Vuelve al texto original después de 2 segundos
            setTimeout(() => {
                copyBtn.innerHTML = originalBtnText;
                copyBtn.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar el enlace: ', err);
            copyBtn.innerHTML = 'Error al copiar';
        });
    });
});
