window.addEventListener("load", () => {

    // LOADER INICIAL
    const contentLoader = document.querySelector("#contentLoader");
    if (contentLoader) {
        contentLoader.style.opacity = "0";
        contentLoader.style.visibility = "hidden";
    }
    // =================================================
})

window.addEventListener("DOMContentLoaded", () => {

    // DELEGACIONES
    document.addEventListener('click', (e) => {
        if (e.target.closest('#scrollBtn')) {
            window.scrollTo(0, 0);
        }
    });

    window.addEventListener('scroll', () => {
        const btnScroll = document.querySelector('#scrollBtn');

        btnScroll?.classList.toggle('is-visible', window.scrollY >= 600);
        header?.classList.toggle('on-scroll', window.scrollY >= 50);
    });
    // =================================================



    // MENÚ HAMBURGUESA AL SER RESPONSIVE
    const btnMenu = document.querySelector("#btnMenu");
    const menu = document.querySelector("#menuContainer");

    const openMenu = () => menu && menu.classList.add("is-open");
    const closeMenu = () => menu && menu.classList.remove("is-open");

    btnMenu?.addEventListener("click", openMenu);

    document.addEventListener("click", (e) => {
        if (!btnMenu || !menu) return;
        if (btnMenu.contains(e.target)) return;
        if (!menu.contains(e.target)) closeMenu();
    });
    // =================================================



    // FORMULARIO REGISTRO Y LOGIN
    document.addEventListener('click', (e) => {
        const step1 = document.querySelector("#step1Content");
        const step2 = document.querySelector("#step2Content");

        if (e.target.closest('#nextStep')) {

            //todo (Expresiones regulares) - Tarea

            document.querySelector("#currentStep").textContent = 'Paso 2 de 2';
            step1?.classList.add('next');
            step2?.classList.add('active');

            const backStep1 = document.querySelector("#backStep1")
            backStep1.classList.add('visible');
        }

        if (e.target.closest('#backStep1')) {

            step1?.classList.remove('next');
            step2?.classList.remove('active');
            backStep1.classList.remove('visible');

            document.querySelector("#currentStep").textContent = 'Paso 1 de 2';
        }
    });
    // =================================================


});
