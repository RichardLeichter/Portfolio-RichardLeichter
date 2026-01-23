const nav = document.getElementById('navbar');

const updateNav = () => {
    if (nav) {
        const isTiny = window.scrollY > 50 || window.innerWidth < 1024;
        nav.classList.toggle('nav-compact', isTiny);
    }
};

window.addEventListener('scroll', updateNav);
window.addEventListener('resize', updateNav);
updateNav();

if (nav) {
    let navTicking = false;
    nav.addEventListener('mousemove', (e) => {
        if (!navTicking) {
            window.requestAnimationFrame(() => {
                const rect = nav.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                nav.style.setProperty('--grad', `radial-gradient(circle at ${x}px ${y}px, rgba(249,115,22,0.8), transparent 120px)`);
                navTicking = false;
            });
            navTicking = true;
        }
    });

    nav.addEventListener('mouseleave', () => {
        nav.style.setProperty('--grad', 'transparent');
    });
}
