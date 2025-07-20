// Espera a que todo el contenido HTML se haya cargado antes de ejecutar el script.
// ¡ESTA ES LA CORRECCIÓN MÁS IMPORTANTE! Todo tu código ahora está aquí dentro.
document.addEventListener('DOMContentLoaded', function() {

    // --- PRELOADER ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('loaded');
    });

    // --- EFECTOS DE SONIDO ---
    // Se definen aquí para que estén disponibles en todo el script.
    const clickSound = new Audio('https://www.fesliyanstudios.com/play-mp3/387');
    const swooshSound = new Audio('https://www.fesliyanstudios.com/play-mp3/570');
    const honkSound = new Audio('https://www.myinstants.com/media/sounds/fnaf-nose-honk.mp3');

    document.querySelectorAll('.tab-button, .close-btn, .play-button').forEach(button => {
        button.addEventListener('click', () => {
            clickSound.currentTime = 0;
            clickSound.play().catch(error => console.log("Error al reproducir sonido de clic:", error));
        });
    });
    
    document.querySelectorAll('.links-grid a').forEach(button => {
        button.addEventListener('click', () => {
            swooshSound.currentTime = 0;
            swooshSound.play().catch(error => console.log("Error al reproducir sonido swoosh:", error));
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
        document.body.style.backgroundPosition = `calc(50% + ${xOffset}%) calc(50% + ${yOffset}%)`;
    });

    // --- LÓGICA DE PESTAÑAS (TABS) ---
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
    
    // --- LÓGICA DE BARRAS DE ESTADÍSTICAS ---
    function animateStats() {
        document.querySelectorAll('.overlay-pane.active .fill').forEach(bar => {
            bar.style.width = '0%'; // Reinicia la barra
            const percentage = bar.getAttribute('data-p');
            setTimeout(() => {
                bar.style.width = percentage + '%';
            }, 100); // Pequeño retraso para que la transición se active
        });
    }

    // --- LÓGICA DEL REPRODUCTOR DE MÚSICA (CORREGIDA Y ORDENADA) ---
    const audio = document.getElementById('song');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const spotifyIcon = document.querySelector('.spotify-icon');
    const playIcon = '<i class="fas fa-play"></i>';
    const pauseIcon = '<i class="fas fa-pause"></i>';

    playPauseBtn.addEventListener('click', () => {
        // Verifica si la canción está pausada o no ha comenzado
        if (audio.paused) {
            // Intenta reproducir la canción. El .catch es para manejar errores si el navegador bloquea la reproducción.
            audio.play().then(() => {
                playPauseBtn.innerHTML = pauseIcon;
                spotifyIcon.classList.add('is-spinning');
            }).catch(error => {
                console.error("Error al reproducir la canción:", error);
                // Opcional: mostrar un mensaje al usuario si falla.
            });
        } else {
            audio.pause();
            playPauseBtn.innerHTML = playIcon;
            spotifyIcon.classList.remove('is-spinning');
        }
    });

    // Cuando la canción termina, vuelve al ícono de play
    audio.addEventListener('ended', () => {
        playPauseBtn.innerHTML = playIcon;
        spotifyIcon.classList.remove('is-spinning');
    });

    // --- EASTER EGG DE FNAF ---
    const fnafSticker = document.getElementById('fnaf-sticker');
    fnafSticker.addEventListener('click', () => {
        honkSound.currentTime = 0;
        honkSound.play().catch(error => console.log("Error al reproducir sonido honk:", error));
    });

    // --- LÓGICA PARA EL BOTÓN DE COPIAR LINK (AHORA DENTRO DE DOMCONTENTLOADED) ---
    const copyBtn = document.getElementById('copy-link-btn');
    const originalBtnText = copyBtn.innerHTML;

    copyBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Evita que el link "#" haga saltar la página
        
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            // Éxito al copiar
            copyBtn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
            copyBtn.classList.add('copied');
            
            // Reproduce sonido de éxito
            swooshSound.currentTime = 0;
            swooshSound.play().catch(error => console.log("Error al reproducir sonido swoosh:", error));

            // Vuelve al texto original después de 2 segundos
            setTimeout(() => {
                copyBtn.innerHTML = originalBtnText;
                copyBtn.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
    });
});
