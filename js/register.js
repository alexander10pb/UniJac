function initRegister() {
    initLocalidades();
    initBarriosListener();
    initRegisterSupabase();
}

/* =========================
   LOCALIDADES
========================= */

function initLocalidades() {
    const selectLocalidad = document.getElementById('localidad');
    if (!selectLocalidad) return;

    fetchLocalidades(selectLocalidad);
}

async function fetchLocalidades(selectLocalidad) {

    selectLocalidad.disabled = true;
    selectLocalidad.innerHTML =
        '<option selected disabled hidden>Cargando localidades...</option>';

    try {
        const response = await fetch(
            'https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/ordenamientoterritorial/entidadterritorial/MapServer/0/query?where=1%3D1&outFields=LOCALIDAD,COD_LOC&returnDistinctValues=true&returnGeometry=false&f=json'
        );

        const data = await response.json();

        selectLocalidad.innerHTML =
            '<option selected disabled hidden>Selecciona tu localidad</option>';

        data.features
            .sort((a, b) =>
                a.attributes.LOCALIDAD.localeCompare(b.attributes.LOCALIDAD)
            )
            .forEach(feature => {
                const { LOCALIDAD, COD_LOC } = feature.attributes;

                const option = document.createElement('option');
                option.value = LOCALIDAD; // usamos el nombre
                option.textContent = LOCALIDAD;

                selectLocalidad.appendChild(option);
            });

    } catch (error) {
        selectLocalidad.innerHTML =
            '<option disabled selected>Error cargando localidades</option>';
        console.error(error);
    } finally {
        selectLocalidad.disabled = false;
    }
}

/* =========================
   BARRIOS
========================= */

function initBarriosListener() {
    const selectLocalidad = document.getElementById('localidad');
    const selectBarrios = document.getElementById('barrios');

    if (!selectLocalidad || !selectBarrios) return;

    selectLocalidad.addEventListener('change', () => {
        const localidadSeleccionada = selectLocalidad.value;
        fetchBarrios(localidadSeleccionada, selectBarrios);
    });
}

async function fetchBarrios(localidad, selectBarrios) {

    selectBarrios.disabled = true;
    selectBarrios.innerHTML =
        '<option selected disabled hidden>Cargando barrios...</option>';

    try {

        const url = `https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/ordenamientoterritorial/entidadterritorial/MapServer/0/query?where=LOCALIDAD%3D%27${encodeURIComponent(localidad)}%27&outFields=BARRIOCOMU,LOCALIDAD,COD_LOC,COD_POLBAR,ESTADO&returnGeometry=false&f=json`;

        const response = await fetch(url);
        const data = await response.json();

        selectBarrios.innerHTML =
            '<option selected disabled hidden>Selecciona tu barrio</option>';

        data.features
            .sort((a, b) =>
                a.attributes.BARRIOCOMU.localeCompare(b.attributes.BARRIOCOMU)
            )
            .forEach(feature => {
                const { BARRIOCOMU } = feature.attributes;

                const option = document.createElement('option');
                option.value = BARRIOCOMU;
                option.textContent = BARRIOCOMU;

                selectBarrios.appendChild(option);
            });

    } catch (error) {
        selectBarrios.innerHTML =
            '<option disabled selected>Error cargando barrios</option>';
        console.error(error);
    } finally {
        selectBarrios.disabled = false;
    }
}

function initRegisterSupabase() {

    const form = document.querySelector(".form-content form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const localidad = document.getElementById("localidad").value;
        const barrio = document.getElementById("barrios").value;
        const correo = document.getElementById("correo").value;
        const password = document.getElementById("password").value;

        try {

            /* ===== CREAR USUARIO ===== */

            const { data, error } = await supabaseClient.auth.signUp({
                email: correo,
                password: password
            });

            if (error) {
                alert(error.message);
                return;
            }

            const user = data.user;

            if (!user) {
                alert("No se pudo crear el usuario");
                return;
            }

            /* ===== ACTUALIZAR DATOS ADICIONALES ===== */

            const { error: updateError } = await supabaseClient
                .from("users")
                .update({
                    nombre: nombre,
                    apellido: apellido,
                    localidad: localidad,
                    barrio: barrio
                })
                .eq("id", user.id);

            if (updateError) {
                alert(updateError.message);
                return;
            }

            alert("Cuenta creada correctamente");

            /* ===== REDIRECCION ===== */

            const { data: sessionData } = await supabaseClient.auth.getSession();

            if (sessionData.session) {
                location.hash = "#/neighborhoods";
            }

        } catch (err) {

            console.error("ERROR REGISTER:", err);
            alert("Error creando la cuenta");

        }

    });

}