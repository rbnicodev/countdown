const targetDate = new Date('2025-11-11T08:30:00');

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    const hoursDiv = hoursEl.parentElement;
    const minutesDiv = minutesEl.parentElement;
    const secondsDiv = secondsEl.parentElement;

    if (diff > 24 * 60 * 60 * 1000) {
        // Más de 24h → mostrar solo días +1 y ocultar el resto
        daysEl.textContent = days + 1;
        [hoursEl, minutesEl, secondsEl].forEach(el => el.textContent = '--');
        [hoursDiv, minutesDiv, secondsDiv].forEach(div => div.style.display = 'none');
    } else {
        // 24h o menos → mostrar cuenta regresiva completa
        daysEl.textContent = days;
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
        [hoursDiv, minutesDiv, secondsDiv].forEach(div => div.style.display = 'block');
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();
