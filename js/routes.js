import { initRegister, initRegisterSupabase } from './register.js';
import { initLoginSupabase } from './login.js';

let homeHTML = '';  // Global para home

export function initRouter(initialHomeHTML) {
    homeHTML = initialHomeHTML;
    const main = document.querySelector("#mainContent");
    const header = document.querySelector("header");
    const btnRegister = document.querySelector("#btnRegister");

    // RENDERIZAR VISTA
    async function loadView(path) {
        const res = await fetch(path);
        const html = await res.text();
        if (main) main.innerHTML = html;
    }

    // INICIAR VISTA INICIAL
    const initHome = () => {

        // LAZY LOADING
        const images = document.querySelectorAll('[data-src]');
        const options = { rootMargin: "200px" };
        const callBack = (entries, self) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.src = entry.target.getAttribute("data-src");
                    self.unobserve(entry.target);
                }
            });
        };
        const observer2 = new IntersectionObserver(callBack, options);
        images.forEach((image) => observer2.observe(image));

        // API FRASES
        const phraseContainer = document.querySelector('#motivationalPhrase');
        const authorContainer = document.querySelector('#authorText');
        if (!phraseContainer || !authorContainer) {
            console.error('Faltan elementos DOM');
            return;
        }

        const autoresMap = {
            1: "Maya Angelou", 2: "Albert Einstein", 3: "Marcus Aurelius",
            4: "Rumi", 5: "Thich Nhat Hanh", 6: "Oprah Winfrey",
            7: "Frida Kahlo", 8: "Gabriela Mistral", 9: "Julio Cortázar",
            10: "Gabriel García Márquez", 11: "Mario Vargas Llosa",
            12: "Miguel de Cervantes", 13: "Miguel de Cervantes", null: "Anónimo"
        };

        async function fetchMotivationalPhrase() {
            phraseContainer.textContent = 'Cargando...';
            try {
                const response = await fetch('https://positive-api.online/phrase/esp');
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                if (!data.text) throw new Error('Sin frase');
                const authorName = autoresMap[data.author_id] || 'anónimo';
                phraseContainer.innerHTML = `"${data.text}"`;
                authorContainer.textContent = `${authorName}`;
            } catch (error) {
                console.error('Error API:', error);
                phraseContainer.textContent = 'Frase no disponible hoy.';
                authorContainer.textContent = '';
            }
        }
        fetchMotivationalPhrase();
    };

    // Manejo de rutas
    async function hashRoutes() {
        window.scrollTo(0, 0);
        const route = location.hash || "#/home";
        const isHome = route === "#/" || route === "#/home";

        if (header) header.classList.toggle("light-theme", !isHome);
        if (btnRegister) btnRegister.style.display = route === "#/register" ? "none" : "flex";

        switch (route) {
            case "#/home":
                if (main) main.innerHTML = homeHTML;
                initHome();
                break;
            case "#/login":
                await loadView("pages/login.html");
                await initLoginSupabase();
                break;
            case "#/about":
                await loadView("pages/about.html");
                break;
            case "#/contact":
                await loadView("pages/contact.html");
                break;
            case "#/register":
                await loadView("pages/register.html");
                await initRegister();
                await initRegisterSupabase();
                break;
            default:
                if (main) main.innerHTML = 'Página no encontrada';
        }
    }

    // Eventos
    window.addEventListener("hashchange", hashRoutes);
    hashRoutes();
}