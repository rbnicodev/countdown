// targetDate (puedes conservar el literal si prefieres)
const targetDate = new Date('2025-11-11T08:30:00');

// puntos de control (usando constructor con mes 0-indexado para evitar ambigüedades)
const phase1End = new Date(2025, 10, 10, 4, 0, 0);   // 2025-11-10 04:00
const phase3Start = new Date(2025, 10, 10, 9, 30, 0); // 2025-11-10 09:30

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) return; // si ya pasó, salimos (puedes cambiar esto para mostrar "0" si quieres)

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    const daysDiv = daysEl.parentElement;
    const hoursDiv = hoursEl.parentElement;
    const minutesDiv = minutesEl.parentElement;
    const secondsDiv = secondsEl.parentElement;

    const oneDayMs = 24 * 60 * 60 * 1000;

    if (now < phase1End) {
        // Hasta 2025-11-10 04:00 -> días +1, ocultar H/M/S
        daysEl.textContent = days + 1;
        [hoursEl, minutesEl, secondsEl].forEach(el => el.textContent = '--');
        [hoursDiv, minutesDiv, secondsDiv].forEach(div => div.style.display = 'none');
        daysDiv.style.display = 'block';
    } else if (now >= phase1End && now < phase3Start) {
        // Entre 04:00 y 09:30 del 10/11/2025
        if (diff > oneDayMs) {
            // quedan >24h -> mostrar días reales (sin +1), ocultar H/M/S
            daysEl.textContent = days;
            [hoursEl, minutesEl, secondsEl].forEach(el => el.textContent = '--');
            [hoursDiv, minutesDiv, secondsDiv].forEach(div => div.style.display = 'none');
            daysDiv.style.display = 'block';
        } else {
            // quedan <=24h -> mostrar H/M/S, ocultar días
            daysEl.textContent = days;
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
            [hoursDiv, minutesDiv, secondsDiv].forEach(div => div.style.display = 'block');
            daysDiv.style.display = 'none';
        }
    } else {
        // now >= phase3Start (>= 2025-11-10 09:30) -> mostrar H/M/S (ocultar días)
        daysEl.textContent = days;
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
        [hoursDiv, minutesDiv, secondsDiv].forEach(div => div.style.display = 'block');
        daysDiv.style.display = 'none';
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();
