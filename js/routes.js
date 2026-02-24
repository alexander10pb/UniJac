document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       VARIABLES BASE
    ========================= */

    const main = document.querySelector("#mainContent");
    const header = document.querySelector("header");

    const homeHTML = main ? main.innerHTML : "";

    /* =========================
       CARGAR VISTA
    ========================= */

    async function loadView(path) {
        try {
            const res = await fetch(path);

            if (!res.ok) {
                throw new Error(`Error HTTP ${res.status}`);
            }

            const html = await res.text();

            if (main) {
                main.innerHTML = html;
            }

        } catch (error) {
            if (main) {
                main.innerHTML = `
                    <div class="not-found">
                        <div>Error cargando la vista</div>
                    </div>
                `;
            }
            console.error(error);
        }
    }

    /* =========================
       ROUTER PRINCIPAL
    ========================= */

    async function render() {

        const route = location.hash || "#/";
        window.scrollTo(0, 0);

        const isHome = route === "#/" || route === "#/home";
        const isLogin = route === "#/login";
        const isRegister = route === "#/register";

        if (header) {
            header.classList.toggle("light-theme", !isHome);
        }

        /* ===== HOME ===== */

        if (isHome) {
            if (main) main.innerHTML = homeHTML;

            if (typeof initHome === "function") {
                initHome();
            }

            return;
        }

        /* ===== LOGIN ===== */

        if (isLogin) {
            await loadView("pages/login.html");
            return;
        }

        /* ===== REGISTER ===== */

        if (isRegister) {
            await loadView("pages/register.html");

            // Inicializar lógica específica
            if (typeof initRegister === "function") {
                initRegister();
            }

            return;
        }

        /* ===== 404 ===== */

        if (main) {
            main.innerHTML = `
                <div class="not-found">
                    <div>Página no encontrada <span class="code">404</span></div>
                </div>
            `;
        }
    }

    /* =========================
       EVENTOS
    ========================= */

    window.addEventListener("hashchange", render);

    render();

});