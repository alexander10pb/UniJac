const main = document.querySelector("#contentMain");


// RENDERIZAR VISTA
async function loadView(path) {
    const res = await fetch(path);
    const html = await res.text();
    main.innerHTML = html || 'No disponible';
}

// Breadcrumb posicion hash actual
function updateActiveButton() {
    const currentHash = window.location.hash || '#/inicio';
    document.querySelectorAll(".btn-action").forEach(btn => {
        btn.classList.remove("active");
        if (btn.getAttribute('href') === currentHash) {
            btn.classList.add("active");
        }
    });
}

async function hashRoutes() {
    const locateHash = document.querySelector("#locateHash")
    const nameHash = window.location.hash.slice(2);
    locateHash.textContent = nameHash.charAt(0).toUpperCase() + nameHash.slice(1);
    window.scrollTo(0, 0);

    const route = location.hash;
    switch (route) {
        case "#/inicio":
            await loadView("/pages/dashboard/summary.html");
            break;
        case "#/eventos":
            await loadView("/pages/dashboard/events.html");
            break;
        case "#/infraestructura":
            await loadView("/pages/dashboard/infrastructure.html");
            break;
        case "#/criticos":
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

