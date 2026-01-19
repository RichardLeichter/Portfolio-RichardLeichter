const textElement = document.getElementById('typewriter');
textElement.style.whiteSpace = 'pre-line';
const textToType = "RICHARD S. LEICHTER. \n Full-Stack Developer.";

let charIndex = 0;

function typeWriter() {
    if (charIndex < textToType.length) {
        textElement.textContent += textToType.charAt(charIndex);

        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

window.onload = () => {
    setTimeout(typeWriter, 500);
}