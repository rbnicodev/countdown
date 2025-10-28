// target corregido a 11 Noviembre 2025 09:30 (hora local)
const targetDate = new Date('2025-11-11T09:30:00');

// punto de inicio para mostrar H/M/S: 10 Nov 2025 09:30
const phase3Start = new Date(2025, 10, 10, 9, 30, 0); // mes 10 -> noviembre (0-indexed)

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;
    const oneDayMs = 24 * 60 * 60 * 1000;

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    const daysDiv = daysEl.parentElement;
    const hoursDiv = hoursEl.parentElement;
    const minutesDiv = minutesEl.parentElement;
    const secondsDiv = secondsEl.parentElement;

    // Si ya pasó o es exactamente 0, mostramos ceros (y ocultamos lo demás)
    if (diff <= 0) {
        daysEl.textContent = '0';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        [hoursDiv, minutesDiv, secondsDiv].forEach(div => div.style.display = 'none');
        daysDiv.style.display = 'block';
        return;
    }

    // Si ya hemos alcanzado la fase 3 (>= 2025-11-10 09:30) -> mostrar H/M/S (ocultar días)
    if (now >= phase3Start) {
        const totalSeconds = Math.floor(diff / 1000);
        const hours = Math.floor((totalSeconds / 3600) % 24) + Math.floor(totalSeconds / 3600 / 24) * 24; // horas totales restantes
        // preferimos mostrar horas como "horas restantes mod 24" o "horas totales"? Si quieres horas totales (p.ej. 33h) usa la línea anterior.
        // Si prefieres hours = Math.floor((diff / (1000*60*60)) % 24); y mostrar días aparte, cambiaría la UI. Por tu requerimiento, ocultamos días y mostramos H:M:S.
        const hrs = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);

        daysEl.textContent = '0';
        hoursEl.textContent = String(hrs).padStart(2, '0');
        minutesEl.textContent = String(mins).padStart(2, '0');
        secondsEl.textContent = String(secs).padStart(2, '0');

        [hoursDiv, minutesDiv, secondsDiv].forEach(div => div.style.display = 'block');
        daysDiv.style.display = 'none';
        return;
    }

    // Antes de phase3Start -> mostrar SOLO días según la regla 04:00 -> 04:00
    // Calculamos la "marca de las 04:00" que corresponde al periodo en el que estamos:
    const anchor4 = new Date(now.getTime());
    if (anchor4.getHours() < 4 || (anchor4.getHours() === 4 && anchor4.getMinutes() === 0 && anchor4.getSeconds() === 0 && anchor4.getMilliseconds() === 0 && false)) {
        // si la hora actual es < 4:00 -> la marca es 04:00 del día anterior
        anchor4.setDate(anchor4.getDate() - 1);
    }
    anchor4.setHours(4, 0, 0, 0);

    // Días restantes = floor((target - anchor4) / 1 día)
    const daysRemaining = Math.floor((targetDate - anchor4) / oneDayMs);

    daysEl.textContent = String(daysRemaining);
    // ocultamos H/M/S
    [hoursEl, minutesEl, secondsEl].forEach(el => el.textContent = '--');
    [hoursDiv, minutesDiv, secondsDiv].forEach(div => div.style.display = 'none');
    daysDiv.style.display = 'block';
}

// Ejecutar cada segundo
setInterval(updateCountdown, 1000);
updateCountdown();