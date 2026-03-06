const main = document.querySelector("#contentMain");

// RENDERIZAR VISTA
async function loadView(path) {
    const res = await fetch(path);
    const html = await res.text();
    main.innerHTML = html || 'No disponible';
}

function updateActiveButton() {
    const currentHash = window.location.hash || '#/summary';
    document.querySelectorAll(".btn-action").forEach(btn => {
        btn.classList.remove("active");
        if (btn.getAttribute('href') === currentHash) {
            btn.classList.add("active");
        }
    });
}

async function hashRoutes() {
    window.scrollTo(0, 0);

    const route = location.hash;
    switch (route) {
        case "#/summary":
            await loadView("/pages/dashboard/summary.html");
            break;
        case "#/events":
            await loadView("/pages/dashboard/events.html");
            break;
        case "#/infrastucture":
            await loadView("/pages/dashboard/infrastructure.html");
            break;
        case "#/loss":
            await loadView("/pages/dashboard/loss.html");
            break;
        case "#/critic":
            await loadView("/pages/dashboard/critic.html");
            break;
        default:
            await loadView("/pages/dashboard/summary.html");
            break;
    }

    updateActiveButton();
}

window.addEventListener("hashchange", hashRoutes);
hashRoutes();

