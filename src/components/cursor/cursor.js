const dot = document.getElementById('custom-mouse-dot');
const outline = document.getElementById('custom-mouse-ring');
const interactiveElements = document.querySelectorAll('a, button, .navbar-menu-item');

if (window.matchMedia("(pointer: coarse)").matches) {
    dot.style.display = 'none';
    outline.style.display = 'none';
}

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;
}, { passive: true });

document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;
}, { passive: true });

function animate() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    outline.style.left = `${outlineX - 15}px`;
    outline.style.top = `${outlineY - 15}px`;

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;

    requestAnimationFrame(animate);
}
animate();

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        outline.style.transform = 'scale(1.8)';
        outline.style.background = 'rgba(30, 22, 19, 0.05)';
    });

    el.addEventListener('mouseleave', () => {
        outline.style.transform = 'scale(1)';
        outline.style.background = 'transparent';
    });

    el.addEventListener('mousedown', () => {
        outline.style.transform = 'scale(0.9)';
    });

    el.addEventListener('mouseup', () => {
        outline.style.transform = 'scale(1.8)';
    });

});
