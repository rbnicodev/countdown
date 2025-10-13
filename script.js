const targetDate = new Date('2025-11-11T17:00:00');

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if(diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2,'0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2,'0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2,'0');
}

setInterval(updateCountdown, 1000);
updateCountdown();
