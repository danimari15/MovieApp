async function fetchDaTMDB(endpoint) {
  try {
    // chiamata API
    const response = await fetch(
      `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=it-IT`,
    );

    if (!response.ok) {
      // gestione errori
      throw new Error("Errore nella chiamata API");
    }

    // estrazione dati
    const data = await response.json();
    return data.results;
  } catch (error) {
    // catch errori di codice
    console.error(error);
    return null;
  }
}
