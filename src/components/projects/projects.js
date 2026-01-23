// ESPAÇO PARA INFORMAÇÕES REAIS
const projects = [
    { title: "Tear de Crônicas", desc: "Um site minimalista para que pessoas possam escrever suas histórias e crônicas com diferentes temas visuais.", link: "https://teardecronicas.vercel.app", lkd: "https://github.com/RichardLeichter/Tear_de_Cronicas" },
    { title: "Projeto Palavra secreta", desc: "Projeto simples de palavra secreta", link: "#", lkd: "https://github.com/RichardLeichter/Palavra_secreta" },
    { title: "Projeto Fake", desc: "Descrição do projeto real focado em resultados e tecnologias corporativas.", link: "#", lkd: "https://github.com/RichardLeichter" },
    { title: "Projeto Fake", desc: "Descrição do projeto real focado em resultados e tecnologias corporativas.", link: "#", lkd: "https://github.com/RichardLeichter" }
];

const track = document.getElementById('track');

if (track) {
    [...projects, ...projects].forEach(p => {
        const el = document.createElement('div');
        el.className = 'card';
        el.innerHTML = `
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            <div class="links">
                <a href="${p.link}" class="btn">Projeto</a>
                <a href="${p.lkd}" class="btn lkd">GitHub</a>
            </div>`;
        
        el.onmousemove = e => {
            const r = el.getBoundingClientRect();
            el.style.setProperty('--x', `${e.clientX - r.left}px`);
            el.style.setProperty('--y', `${e.clientY - r.top}px`);
        };
        track.appendChild(el);
    });
}