document.addEventListener('DOMContentLoaded', () => {

    // Temas
    const html = document.documentElement;
    const btnTheme = document.querySelector('#btnTheme');
    const overlay = document.querySelector('.overlay');

    const currentTheme = localStorage.getItem('data-theme');
    html.setAttribute('data-theme', currentTheme);

    btnTheme.addEventListener('click', () => {
        if (html.getAttribute('data-theme') === '') {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('data-theme', 'dark');
            btnTheme.innerHTML = `  
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M21.5 14.078A8.557 8.557 0 0 1 9.922 2.5C5.668 3.497 2.5 7.315 2.5 11.873a9.627 9.627 0 0 0 9.627 9.627c4.558 0 8.376-3.168 9.373-7.422"
                    />
                </svg>
                Tema
            `

        } else {
            html.setAttribute('data-theme', '');
            localStorage.setItem('data-theme', '');
            btnTheme.innerHTML = `
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                >
                <g fill="currentColor" stroke="currentColor" stroke-width="1">
                    <path
                    stroke-width="1.5"
                    d="M17 12a5 5 0 1 1-10 0a5 5 0 0 1 10 0Z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11.996 3h.008m-.008 18h.01m6.353-15.364h.009M5.634 18.364h.01m-.01-12.728h.01m12.714 12.729h.01M20.99 12H21M3 12h.009"
                    />
                </g>
                </svg>
                Tema
            `
        }
    });


    // Abrir menú
    const openPanel = document.querySelector('#panelNav');
    const menuLeft = document.querySelector('#menuLeft');
    openPanel.addEventListener('click', () => {
        menuLeft.classList.toggle('is-open');
    });

    // Abrir dropdown profile
    const profileContent = document.querySelector("#profileContent");
    const profileDropdown = document.querySelector("#profileDropdown");
    const arrowUp = document.querySelector('#arrowSvg');

    profileContent.addEventListener("click", () => {
        profileDropdown.classList.toggle("active");
        arrowUp.classList.toggle("rotate")

        profileDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // Abrir dropdown notificaciones
    const toastContent = document.querySelector('#toastDropdown');
    const toastBtn = document.querySelector("#toastBtn")

    toastBtn.addEventListener("click", () => {
        toastContent.classList.toggle("open");
    })


    // funcion cerrar
    function closeMenuLeft(e) {
        if (menuLeft && !menuLeft.contains(e.target) && !openPanel?.contains(e.target)) {
            menuLeft.classList.remove('is-open');
        }
    }

    function closeProfile(e) {
        if (profileContent && !profileContent.contains(e.target)) {
            profileDropdown.classList.remove("active");
            arrowUp.classList.remove("rotate");
        }
    }

    function closeToast(e) {
        if (toastContent && !toastContent.contains(e.target) && !toastBtn?.contains(e.target)) {
            toastContent.classList.remove("open");
        }
    }

    //  Botones no disponibles + modal
    const modalUnavailable = document.querySelector('#modalUnavailable');
    const unavailable = document.querySelectorAll('.unavailable');

    unavailable.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            modalUnavailable.classList.add('open');
            overlay.classList.add('active');
        });
    });

    function closeModalUnavailable(e) {
        if (modalUnavailable && !modalUnavailable.contains(e.target)) {
            modalUnavailable.classList.remove('open');
            overlay.classList.remove('active');
        }
    }

    document.addEventListener('click', (e) => {
        closeMenuLeft(e);
        closeProfile(e);
        closeToast(e)
        closeModalUnavailable(e);
    });

    // Cerrar sesión
    document.querySelector("#logOut").addEventListener("click", logout)
    function logout() {
        window.location = "/";
    }

});
