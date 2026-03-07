import { inputValidator } from './register.js';
import { initRouter } from './routes.js';
import { supabaseClient } from './supabase.js'


window.location.hash = "#/home";

window.addEventListener("load", () => {
    // Loader al final del load
    const contentLoader = document.querySelector("#contentLoader");
    contentLoader?.style.setProperty('opacity', '0');
    contentLoader?.style.setProperty('visibility', 'hidden');
});

window.addEventListener("DOMContentLoaded", () => {
    // CAPTURAR homeHTML
    const main = document.querySelector("#mainContent");
    const homeHTML = main ? main.innerHTML : "";

    // =================================================
    const header = document.querySelector('header');
    const btnMenu = document.querySelector("#btnMenu");
    const menu = document.querySelector("#menuContainer");
    const btnScroll = document.querySelector('#scrollBtn');
    const btnAccesibility = document.querySelector('#contentAccesibility');
    const accessContent = document.querySelector('#accessContent');
    const overlay = document.querySelector('#overlay');
    let scrollPrev = window.scrollY;

    document.addEventListener('click', (e) => {
        // Scroll button
        if (e.target.closest('#scrollBtn')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Content buttons (formularios login/register)
        if (e.target.closest('#nextStep')) {
            const btn = e.target.closest('#nextStep');
            btn.classList.add('loadersm');


            setTimeout(() => {
                const isValid = inputValidator();

                if (isValid === true) {
                    document.querySelector("#currentStep").textContent = 'Paso 2 de 2';
                    document.querySelector("#step1Content")?.classList.add('next');
                    document.querySelector("#step2Content")?.classList.add('active');
                    document.querySelector("#backStep1")?.classList.add('visible');
                }
                btn.textContent = 'Continuar';
                btn.classList.remove('loadersm');
            }, 400);
            btn.textContent = '';
        }

        if (e.target.closest('#backStep1')) {
            document.querySelector("#step1Content")?.classList.remove('next');
            document.querySelector("#step2Content")?.classList.remove('active');
            document.querySelector("#backStep1")?.classList.remove('visible');
            document.querySelector("#currentStep").textContent = 'Paso 1 de 2';
            return;
        }

        if (!menu.contains(e.target) && !btnMenu.contains(e.target)) {
            menu.classList.remove('is-open');
            overlay.classList.remove('active');
        }

        // Abrir menu accesibilidad
        if (btnAccesibility && accessContent && accessContent.contains(e.target)) {
            btnAccesibility.classList.add('visible');
            overlay.classList.add('active');
        } else if (!menu.classList.contains('is-open')) {
            btnAccesibility.classList.remove('visible');
            overlay.classList.remove('active');
        }
    });

    // Evento scroll
    window.addEventListener('scroll', () => {
        const scrollCurrent = window.scrollY;
        if (scrollCurrent > 700 && scrollCurrent > scrollPrev) {
            header?.classList.add('hide');
        } else {
            header?.classList.remove('hide');
        }
        scrollPrev = scrollCurrent;
        btnScroll?.classList.toggle('is-visible', window.scrollY >= 600);
        header?.classList.toggle('on-scroll', window.scrollY >= 50);
    });

    btnMenu?.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('is-open');
        overlay.classList.toggle('active');
    });

    const btnAumentar = document.querySelector("#aumentarFuente");
    const btnDisminuir = document.querySelector("#disminuirFuente");
    const btnContraste = document.querySelector("#contraste");

    let tamanoFuente = 16;

    if (btnAumentar && btnDisminuir && btnContraste) {
        const html = document.documentElement;

        btnAumentar.addEventListener("click", () => {
            if (tamanoFuente <= 25) {
                tamanoFuente += 1;
                document.documentElement.style.fontSize = `${tamanoFuente}px`;
            }
        });

        btnDisminuir.addEventListener("click", () => {
            if (tamanoFuente >= 14) {
                tamanoFuente -= 1;
                document.documentElement.style.fontSize = `${tamanoFuente}px`;
            }
        });

        btnContraste.addEventListener('click', () => {
            btnContraste.classList.toggle('active');
            const current = html.getAttribute('data-theme');
            html.setAttribute('data-theme', current === '' ? 'contrast' : '');
        });
    }

    // INICIAR ROUTER
    initRouter(homeHTML);
});

supabaseClient.auth.getSession().then(({ data }) => {
    console.log("SESSION:", data.session);
});