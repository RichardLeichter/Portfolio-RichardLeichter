const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (window.matchMedia("(pointer: coarse)").matches) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
}

let mouseX = 0, mouseY = 0, fX = 0, fY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function move() {
    fX += (mouseX - fX) * 0.12; fY += (mouseY - fY) * 0.12;
    follower.style.left = fX + 'px'; follower.style.top = fY + 'px';
    requestAnimationFrame(move);
}
move();

const selectors = 'a, button, .nav-item, .btn, .contact-card, .massive-contact-trigger';

document.addEventListener('mouseover', (e) => {
    if (e.target.closest(selectors)) {
        cursor.style.width = '100px'; 
        cursor.style.height = '100px';
        cursor.style.background = 'rgba(255, 79, 0, 0.05)';
        cursor.style.border = '1px solid var(--accent, #ff4f00)';
        follower.style.opacity = '0';
    }
});

document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(selectors);
    if (target) {
        if (e.relatedTarget && target.contains(e.relatedTarget)) return;
        cursor.style.width = '8px'; 
        cursor.style.height = '8px';
        cursor.style.background = 'var(--accent, #ff4f00)';
        cursor.style.border = 'none';
        follower.style.opacity = '1';
    }
});
