function initHome() {
  const phraseContainer = document.getElementById('motivational-phrase');
  const refreshBtn = document.getElementById('refresh-btn');

  if (!phraseContainer) return;

  async function fetchMotivationalPhrase() {
    phraseContainer.textContent = 'Cargando frase motivacional...';

    try {
      const response = await fetch('https://positive-api.online/phrase/esp');

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (!data || !data.text) {
        throw new Error('Estructura inesperada en la respuesta');
      }

      phraseContainer.textContent = data.text;

    } catch (error) {
      console.error('Error al obtener la frase:', error);
      phraseContainer.textContent =
        'No fue posible cargar la frase en este momento.';
    }
  }

  fetchMotivationalPhrase();

  if (refreshBtn) {
    refreshBtn.addEventListener('click', fetchMotivationalPhrase);
  }
}