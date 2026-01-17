const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');
const interactiveElements = document.querySelectorAll('a, button');

document.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    setTimeout(() => {
        outline.style.left = `${posX - 15}px`;
        outline.style.top = `${posY - 15}px`;
    }, 40);
});

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
