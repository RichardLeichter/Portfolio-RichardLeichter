const textElement = document.getElementById('typewriter');
const phrases = ["RICHARD S. LEICHTER.", "FULL-STACK DEVELOPER."];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
     }

    setTimeout(typeLoop, typeSpeed);
 }  

function setupInterface() {
    if (!document.querySelector('nav')) {
        const nav = document.createElement('nav');
        nav.innerHTML = `
            <div class="logo">RICHARD S. LEICHTER <span class="accent-text">//</span> 2026</div>
            <div class="nav-right">
            </div>
        `;
        document.body.prepend(nav);
    }
 }

window.onload = () => {
    setupInterface();
    setTimeout(typeLoop, 500);
}