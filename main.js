// Select DOM elements
const themeToggle = document.getElementById('theme-toggle');
const readAloud = document.getElementById('read-aloud');
const body = document.body;

// Add smooth dark mode toggle
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    themeToggle.innerHTML = body.classList.contains('dark-mode')
        ? '<i class="fas fa-sun"></i> Toggle Light Mode'
        : '<i class="fas fa-moon"></i> Toggle Dark Mode';

    // Save preference to localStorage
    localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
});

// Load dark mode preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Toggle Light Mode';
    }
});

// Improved "Read Aloud" feature
readAloud.addEventListener('click', () => {
    const poemText = document.querySelector('.poem').innerText;
    const utterance = new SpeechSynthesisUtterance(poemText);
    utterance.lang = 'bn-BD'; // Set language to Bengali
    utterance.rate = 0.9; // Slightly slower speaking rate
    utterance.pitch = 1.1; // Adjust pitch for clarity
    utterance.onstart = () => {
        readAloud.innerHTML = '<i class="fas fa-stop"></i> Stop Reading';
    };
    utterance.onend = () => {
        readAloud.innerHTML = '<i class="fas fa-volume-up"></i> Read Aloud';
    };

    // Toggle speech synthesis
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        readAloud.innerHTML = '<i class="fas fa-volume-up"></i> Read Aloud';
    } else {
        window.speechSynthesis.speak(utterance);
    }
});

// Add accessibility-friendly keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'd' || e.key === 'D') {
        // Shortcut: Press 'D' to toggle dark mode
        themeToggle.click();
    } else if (e.key === 'r' || e.key === 'R') {
        // Shortcut: Press 'R' to read aloud
        readAloud.click();
    }
});
