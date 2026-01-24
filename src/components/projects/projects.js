const projectStyles = document.createElement('style');
projectStyles.innerHTML = `
    #track {
        display: flex;
        gap: 2.5rem;
        width: max-content;
        will-change: transform;
    }

    .glass-card {
        position: relative;
        min-width: 450px;
        height: 320px;
        background: rgba(255, 255, 255, 0.02);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border-radius: 24px;
        border: 1px solid rgba(255, 255, 255, 0.05);
        padding: 2.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), background 0.3s;
        transform: translateZ(0);
    }

    @media (max-width: 768px) {
        .glass-card {
            min-width: 80vw;
            height: auto;
            min-height: 300px;
            padding: 1.5rem;
        }
    }

    .glass-card:hover {
        background: rgba(255, 255, 255, 0.04);
        transform: translateY(-5px);
    }

    .glass-card::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 24px;
        padding: 1.5px;
        background: radial-gradient(600px circle at var(--x) var(--y), #ff5e00, transparent 40%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
        opacity: 0.8;
    }

    .watermark-num {
        position: absolute;
        top: -20px;
        right: -10px;
        font-size: 12rem;
        font-weight: 900;
        color: rgba(255, 255, 255, 0.02);
        line-height: 1;
        pointer-events: none;
        user-select: none;
        z-index: 0;
    }

    .carousel-nav {
        width: 60%;
        height: 6px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        margin: 50px auto 0;
        position: relative;
        cursor: pointer;
        overflow: hidden;
        transition: height 0.3s, background 0.3s;
    }
    .carousel-nav:hover { height: 10px; background: rgba(255, 255, 255, 0.15); }
    .carousel-progress {
        height: 100%;
        background: #ff5e00;
        border-radius: 10px;
        width: 0%;
        pointer-events: none;
    }

    .carousel-hint {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        color: rgba(255, 255, 255, 0.3);
        font-size: 0.65rem;
        margin-top: 12px;
        letter-spacing: 2px;
        text-transform: uppercase;
        font-weight: 600;
        pointer-events: none;
        transition: color 0.3s;
        user-select: none;
    }
    .carousel-nav:hover + .carousel-hint {
        color: #ff5e00;
    }
`;
document.head.appendChild(projectStyles);

const projects = [
    { title: "Tear de Crônicas", desc: "Plataforma minimalista para escrita de histórias e crônicas com temas visuais dinâmicos.", link: "https://teardecronicas.vercel.app", lkd: "https://github.com/RichardLeichter/Tear_de_Cronicas", tech: ["devicon-html5-plain", "devicon-css3-plain", "devicon-javascript-plain"] },
    { title: "Palavra Secreta", desc: "Game interativo de adivinhação de palavras desenvolvido com React e lógica avançada.", link: "#", lkd: "https://github.com/RichardLeichter/Palavra_secreta", tech: ["devicon-react-original", "devicon-css3-plain"] },
    { title: "Dashboard Corp", desc: "Esse projeto não é real, apenas demonstrativo, caso clique em Github, você será encaminhado para meu Github.", link: "#", lkd: "https://github.com/RichardLeichter", tech: ["devicon-typescript-plain", "devicon-react-original", "devicon-tailwindcss-original"] },
    { title: "API Gateway", desc: "Esse projeto não é real, apenas demonstrativo, caso clique em Github, você será encaminhado para meu Github.", link: "#", lkd: "https://github.com/RichardLeichter", tech: ["devicon-python-plain", "devicon-nodejs-plain"] }
];

const track = document.getElementById('track');

if (track) {
    // Otimização: Usando Web Animations API para evitar Reflow/Layout Thrashing
    const trackAnimation = track.animate(
        [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }],
        { duration: 15000, iterations: Infinity, easing: 'linear' }
    );

    track.addEventListener('mouseenter', () => trackAnimation.pause());
    track.addEventListener('mouseleave', () => {
        if (!isDragging) trackAnimation.play();
    });

    [...projects, ...projects].forEach((p, index) => {
        const el = document.createElement('div');
        el.className = 'glass-card';
        const num = (index % projects.length) + 1;
        const formattedNum = num < 10 ? `0${num}` : num;
        
        const techIcons = p.tech ? 
            `<div style="display: flex; gap: 15px; margin-bottom: 1.5rem;">
                ${p.tech.map(t => `<i class="${t}" style="font-size: 1.5rem; color: rgba(255,255,255,0.7); transition: 0.3s;"></i>`).join('')}
             </div>` : '';

        el.innerHTML = `
            <span class="watermark-num">${formattedNum}</span>
            
            <div style="position: relative; z-index: 1;">
                ${techIcons}
                <h3 style="font-size: 2rem; font-weight: 800; text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: -1px;">${p.title}</h3>
                <p style="color: #999; font-size: 0.95rem; line-height: 1.6; max-width: 90%;">${p.desc}</p>
            </div>

            <div style="position: relative; z-index: 1; display: flex; gap: 1rem; margin-top: 2rem;">
                <a href="${p.link}" target="_blank" style="padding: 10px 24px; background: #ff5e00; color: #000; font-weight: 700; text-decoration: none; border-radius: 50px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s;">
                    Live Demo
                </a>
                <a href="${p.lkd}" target="_blank" style="padding: 10px 24px; background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #fff; font-weight: 700; text-decoration: none; border-radius: 50px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s;">
                    GitHub
                </a>
            </div>`;
        
        el.onmousemove = e => {
            requestAnimationFrame(() => {
                const r = el.getBoundingClientRect();
                el.style.setProperty('--x', `${e.clientX - r.left}px`);
                el.style.setProperty('--y', `${e.clientY - r.top}px`);
            });
        };

        track.appendChild(el);
    });

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(scrollY / maxScroll, 1);
        
        const newDuration = 15000 + (scrollPercent * 35000);
        trackAnimation.effect.updateTiming({ duration: newDuration });
    });

    const nav = document.createElement('div');
    nav.className = 'carousel-nav';
    const progress = document.createElement('div');
    progress.className = 'carousel-progress';
    nav.appendChild(progress);

    const hint = document.createElement('div');
    hint.className = 'carousel-hint';
    hint.innerHTML = '<span style="font-size: 1.2em;">‹</span> ARRASTE <span style="font-size: 1.2em;">›</span>';

    track.parentElement.appendChild(nav);
    track.parentElement.appendChild(hint);

    let isDragging = false;

    function syncProgress() {
        if (!isDragging) {
            const timing = trackAnimation.effect.getComputedTiming();
            let percent = (timing.progress || 0) * 100;
            progress.style.width = `${percent}%`;
            requestAnimationFrame(syncProgress);
        }
    }
    requestAnimationFrame(syncProgress);

    const updateDrag = (e) => {
        const rect = nav.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        let x = clientX - rect.left;
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;
        
        const percent = (x / rect.width) * 100;
        progress.style.width = `${percent}%`;
        
        trackAnimation.cancel();
        track.style.transform = `translateX(-${percent / 2}%)`;
    };

    nav.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateDrag(e);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onDragEnd);
    });

    nav.addEventListener('touchstart', (e) => {
        isDragging = true;
        updateDrag(e);
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onDragEnd);
    });

    const onMouseMove = (e) => updateDrag(e);
    const onTouchMove = (e) => {
        if (e.cancelable) e.preventDefault();
        updateDrag(e);
    };

    const onDragEnd = () => {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onDragEnd);
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onDragEnd);
        
        const currentPercent = parseFloat(progress.style.width) || 0;
        const duration = trackAnimation.effect.getTiming().duration;
        
        track.style.transform = '';
        trackAnimation.currentTime = (currentPercent / 100) * duration;
        trackAnimation.play();
        
        requestAnimationFrame(syncProgress);
    };

    let startX = 0;
    let startProgress = 0;

    const onTrackTouchStart = (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        startProgress = parseFloat(progress.style.width) || 0;
        trackAnimation.cancel();
    };

    const onTrackTouchMove = (e) => {
        if (e.cancelable) e.preventDefault();
        const x = e.touches[0].clientX;
        const dx = x - startX;
        const trackWidth = track.scrollWidth / 2;
        const deltaPercent = -(dx / trackWidth) * 100;

        let newPercent = startProgress + deltaPercent;
        if (newPercent < 0) newPercent = 100 + (newPercent % 100);
        if (newPercent > 100) newPercent = newPercent % 100;

        progress.style.width = `${newPercent}%`;
        track.style.transform = `translateX(-${newPercent / 2}%)`;
    };

    const onTrackDragEnd = () => {
        document.removeEventListener('touchmove', onTrackTouchMove);
        document.removeEventListener('touchend', onTrackDragEnd);
        onDragEnd();
    };

    track.addEventListener('touchstart', (e) => {
        onTrackTouchStart(e);
        document.addEventListener('touchmove', onTrackTouchMove, { passive: false });
        document.addEventListener('touchend', onTrackDragEnd);
    }, { passive: false });
}