const projectStyles = document.createElement('style');
projectStyles.innerHTML = `
    #projetos {
        height: auto;
        min-height: 100vh;
        padding-bottom: 4rem;
    }

    #track {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        padding: 2rem;
        box-sizing: border-box;
    }

    .glass-card {
        position: relative;
        min-height: 380px;
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-radius: 24px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        padding: 2.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: transform 0.2s ease-out, background 0.3s, border-color 0.3s, box-shadow 0.3s;
        transform-style: preserve-3d;
        perspective: 1000px;
    }

    @media (max-width: 768px) {
        #track {
            grid-template-columns: 1fr;
            padding: 1rem;
            gap: 1.5rem;
        }
        .glass-card {
            min-height: auto;
            padding: 2rem;
        }
    }

    .glass-card:hover {
        background: rgba(255, 255, 255, 0.06);
        border-color: rgba(255, 94, 0, 0.3);
        box-shadow: 0 10px 40px -10px rgba(255, 94, 0, 0.15);
        z-index: 10;
    }

    .glass-card::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 24px;
        padding: 2px;
        background: radial-gradient(800px circle at var(--x) var(--y), rgba(255, 94, 0, 0.6), transparent 40%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .glass-card:hover::before {
        opacity: 1;
    }

    .watermark-num {
        position: absolute;
        top: -15px;
        right: 10px;
        font-size: 8rem;
        font-weight: 900;
        color: rgba(255, 255, 255, 0.03);
        line-height: 1;
        pointer-events: none;
        user-select: none;
        z-index: 0;
        transition: transform 0.3s, color 0.3s;
    }

    .glass-card:hover .watermark-num {
        transform: translateZ(20px) scale(1.1);
        color: rgba(255, 94, 0, 0.05);
    }

    .project-content {
        transform: translateZ(30px);
    }

    .project-links {
        transform: translateZ(40px);
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
    projects.forEach((p, index) => {
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
            
            <div class="project-content" style="position: relative; z-index: 1;">
                ${techIcons}
                <h3 style="font-size: 2rem; font-weight: 800; text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: -1px;">${p.title}</h3>
                <p style="color: #999; font-size: 0.95rem; line-height: 1.6; max-width: 90%;">${p.desc}</p>
            </div>

            <div class="project-links" style="position: relative; z-index: 1; display: flex; gap: 1rem; margin-top: 2rem;">
                <a href="${p.link}" target="_blank" style="padding: 10px 24px; background: #ff5e00; color: #000; font-weight: 700; text-decoration: none; border-radius: 50px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s;">
                    Live Demo
                </a>
                <a href="${p.lkd}" target="_blank" style="padding: 10px 24px; background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #fff; font-weight: 700; text-decoration: none; border-radius: 50px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s;">
                    GitHub
                </a>
            </div>`;
        
        el.onmousemove = e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            el.style.setProperty('--x', `${x}px`);
            el.style.setProperty('--y', `${y}px`);

            // 3D Tilt Effect
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        };

        el.onmouseleave = () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            el.style.setProperty('--x', `-1000px`);
            el.style.setProperty('--y', `-1000px`);
        };

        track.appendChild(el);
    });
}
 else {
    console.error("Erro no componente Projects: O elemento com id 'track' não foi encontrado no HTML. As seções não podem ser renderizadas.");
}