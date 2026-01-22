const nav = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (nav) {
        const isTiny = window.scrollY > 50;
        nav.classList.toggle('nav-compact', isTiny);
    }
});

if (nav) {
    nav.addEventListener('mousemove', (e) => {
        const rect = nav.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        nav.style.setProperty('--grad', `radial-gradient(circle at ${x}px ${y}px, rgba(249,115,22,0.8), transparent 120px)`);
    });

    nav.addEventListener('mouseleave', () => {
        nav.style.setProperty('--grad', 'transparent');
    });
}
