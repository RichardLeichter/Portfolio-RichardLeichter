const projects = [
    { title: "Tear de Crônicas", desc: "Um site minimalista para que pessoas possam escrever suas histórias e crônicas com diferentes temas visuais.", link: "https://teardecronicas.vercel.app", lkd: "https://github.com/RichardLeichter/Tear_de_Cronicas", tech: ["devicon-html5-plain", "devicon-css3-plain", "devicon-javascript-plain"] },
    { title: "Projeto Palavra secreta", desc: "Projeto simples de palavra secreta", link: "#", lkd: "https://github.com/RichardLeichter/Palavra_secreta", tech: ["devicon-react-original", "devicon-css3-plain"] },
    { title: "Projeto Fake", desc: "Descrição do projeto real focado em resultados e tecnologias corporativas.", link: "#", lkd: "https://github.com/RichardLeichter", tech: ["devicon-typescript-plain", "devicon-react-original", "devicon-tailwindcss-original"] },
    { title: "Projeto Fake", desc: "Descrição do projeto real focado em resultados e tecnologias corporativas.", link: "#", lkd: "https://github.com/RichardLeichter", tech: ["devicon-python-plain", "devicon-nodejs-plain"] }
];

const track = document.getElementById('track');

if (track) {
    [...projects, ...projects].forEach((p, index) => {
        const el = document.createElement('div');
        el.className = 'card';
        const num = (index % projects.length) + 1;
        const formattedNum = num < 10 ? `0${num}` : num;
        
        const techIcons = p.tech ? `<div class="card-tech">${p.tech.map(t => `<i class="${t}"></i>`).join('')}</div>` : '';

        el.innerHTML = `
            <span class="project-number">${formattedNum}</span>
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            ${techIcons}
            <div class="links">
                <a href="${p.link}" class="btn">Projeto</a>
                <a href="${p.lkd}" class="btn lkd">GitHub</a>
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
}