const textElement = document.getElementById('typing-text');
const phrases = ["DEVELOPER."];

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

window.addEventListener('load', () => {
    setTimeout(typeLoop, 500);
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

let ticking = false;
document.addEventListener('mousemove', (e) => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;

            const shapes = document.querySelectorAll('.hero-shape');
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 1.5;
                const xOffset = x * speed;
                const yOffset = y * speed;
                
                if (shape.classList.contains('shape-1')) {
                    shape.style.transform = `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px))`;
                } else {
                    shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
                }
            });
            ticking = false;
        });
        ticking = true;
    }
});