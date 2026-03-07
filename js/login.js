import { supabaseClient } from './supabase.js'

export function initLoginSupabase() {

  const form = document.querySelector(".form-content form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        alert(error.message);
        return;
      }

      /* ===== VALIDAR SESION ===== */

      const { data: sessionData } = await supabaseClient.auth.getSession();

      if (!sessionData.session) {
        alert("No se pudo iniciar sesión");
        return;
      }

      console.log("LOGIN OK:", sessionData.session);

      /* ===== REDIRECCION ===== */

      window.location.href = "./pages/dashboard/layout.html#/inicio";

    } catch (err) {

      console.error("LOGIN ERROR:", err);
      alert("Error iniciando sesión");

    }

  });

}