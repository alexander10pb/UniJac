document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // SPA ROUTER
    // =========================
    const main = document.querySelector("#mainContent");
    const homeHTML = main ? main.innerHTML : "";

    async function loadView(path) {
        const res = await fetch(path);
        const html = await res.text();
        if (main) main.innerHTML = html;
    }

    // =========================
    // RENDER POR HASH
    // =========================
    function render() {
        const route = location.hash || "#/";
        window.scrollTo(0, 0);

        const isHome = route === "#/" || route === "#/home";
        const isAuth = route === "#/login" || route === "#/register";

        if (header) header.classList.toggle("light-theme", !isHome);

        if (isHome) {
            if (main) main.innerHTML = homeHTML;
            return;
        }

        if (isAuth) {
            if (route === "#/login") return loadView("pages/login.html");
            return loadView("pages/register.html");
        }

        if (main) {
            main.innerHTML = `
                <div class="not-found">
                    <div>Página no encontrada <span class="code">404</span></div>
                </div>
            `;
        }
    }

    window.addEventListener("hashchange", render);
    render();

})