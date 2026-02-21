document.addEventListener('DOMContentLoaded', () => {

    // MODAL DE BIENVENIDA
    const welcomeModal = document.querySelector('#welcomeModal');
    const overlay = document.querySelector('#overlay')
    setTimeout(() => {
        welcomeModal?.classList.add('active');
    }, 1);

    // Cerrar modal
    const continueBtn = document.querySelector('#continueBtn')
    continueBtn.addEventListener("click", () => {
        welcomeModal?.classList.remove('active');
        overlay?.classList.remove('active')
    })
    // =================================================


    // NAVEGACIÓN

    // Temas
    const btnTheme = document.querySelector('#btnTheme');
    const html = document.documentElement;

    btnTheme.addEventListener('click', () => {
        if (html.getAttribute('data-theme') === 'dark') {
            html.removeAttribute('data-theme');
        } else {
            html.setAttribute('data-theme', 'dark');
        }
    });


    const openPanel = document.querySelector('#panelNav');
    const menuLeft = document.querySelector('#menuLeft')

    // Abrir menú
    openPanel?.addEventListener('click', () => {
        menuLeft?.classList.add('is-open');
    });

    // Cerrar al click fuera
    document.addEventListener('click', (e) => {
        if (menuLeft && !menuLeft.contains(e.target) && !openPanel?.contains(e.target)) {
            menuLeft.classList.remove('is-open');
        }
    });
    // =================================================

});
