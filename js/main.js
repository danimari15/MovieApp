const homeSection = document.getElementById("homepage-trends");
const movieSection = document.getElementById("cinema-list");
const tvSection = document.getElementById("tv-shows-list");

function generatePreviewElement(dataObj) {
  // creazione poster
  const block = document.createElement("article");
  block.className = "poster-item";

  const visualTitle = dataObj.title || dataObj.name;
  const releaseStamp = dataObj.release_date || dataObj.first_air_date;
  const releaseYear = releaseStamp ? releaseStamp.substring(0, 4) : "N/A";

  // gestione poster e popolamento
  const thumbnail = dataObj.poster_path
    ? IMAGE_BASE_URL + dataObj.poster_path
    : "https://via.placeholder.com/500x750?text=No+Cover";

  const img = document.createElement("img");
  img.src = thumbnail;
  img.alt = visualTitle;

  const itemMeta = document.createElement("div");
  itemMeta.className = "item-meta";

  const titleObj = document.createElement("h3");
  titleObj.textContent = visualTitle;

  const annoVoto = document.createElement("div");
  annoVoto.className = "anno-voto";

  const spanAnno = document.createElement("span");
  spanAnno.textContent = `Anno: ${releaseYear}`;

  const spanVoto = document.createElement("span");
  spanVoto.textContent = `Voto: ${dataObj.vote_average?.toFixed(1) || "N/A"}`;

  annoVoto.appendChild(spanAnno);
  annoVoto.appendChild(spanVoto);

  itemMeta.appendChild(titleObj);
  itemMeta.appendChild(annoVoto);

  block.appendChild(img);
  block.appendChild(itemMeta);

  block.addEventListener("click", () => {
    // creazione popup
    const popup = document.getElementById("mioPopup");
    const popupTitolo = document.getElementById("popupTitolo");
    const popupImmagine = document.getElementById("popupImmagine");
    const popupAnno = document.getElementById("popupAnno");
    const popupVoto = document.getElementById("popupVoto");
    const popupAnnoVoto = document.getElementById("popupAnno-Voto");
    const popupDescrizione = document.getElementById("popupDescrizione");
    const popupTrailer = document.getElementById("popupTrailer");
    const popupCast = document.getElementById("popupCast");
    const popupTrailerCast = document.getElementById("popupTrailerCast");

    // popolamento popup e stile

    // titolo con link a ricerca Google
    popupTitolo.innerHTML = `<a href="https://www.google.com/search?q=${visualTitle}" target="_blank" class="popup-titolo-link">${visualTitle}</a>`;
    popupTitolo.className = "popup-titolo-center";

    // immagine
    popupImmagine.src = thumbnail;
    popupImmagine.alt = visualTitle;

    // anno
    popupAnno.textContent = `Anno di uscita: ${releaseYear}`;
    popupAnno.className = "popup-block-italic";

    // voto
    popupVoto.textContent = `Valutazione: ${dataObj.vote_average?.toFixed(1) || "N/A"}/10`;
    popupVoto.className = "popup-block-italic";

    // div anno + voto
    popupAnnoVoto.className = "popup-flex-between";

    // descrizione
    popupDescrizione.textContent =
      dataObj.overview || "Nessuna trama disponibile.";

    // trailer
    popupTrailer.innerHTML = `<a href="https://www.youtube.com/results?search_query=${visualTitle}+trailer" target="_blank" class="popup-titolo-link">Guarda il trailer</a>`;
    popupTrailer.className = "popup-inline";

    // cast
    popupCast.innerHTML = `<a href="https://www.google.com/search?q=cast+${visualTitle}" target="_blank" class="popup-titolo-link">Scopri il cast</a>`;
    popupCast.className = "popup-inline";

    // div trailer + cast
    popupTrailerCast.className = "popup-flex-between";

    popup.style.display = "block";
  });

  return block;
}

function animaTitolo() {
  const title = document.querySelector(".section-title");
  if (!title) return;

  const text = title.textContent;
  title.textContent = "";

  const chars = text.split("");

  // Variabili di tempo (puoi modificarle per rendere l'effetto più lento o veloce)
  const ritardoTraLettere = 0.05; // 50ms tra una lettera e la successiva
  const durataVoloLettera = 0.5; // 300ms per il tempo di volo della singola lettera

  // Calcoliamo ESATTAMENTE quando l'ultima lettera finisce il suo atterraggio
  const tempoImpattoFinale =
    (chars.length - 1) * ritardoTraLettere + durataVoloLettera;

  chars.forEach((char, index) => {
    const span = document.createElement("span");
    span.innerHTML = char === " " ? "&nbsp;" : char;
    span.classList.add("lettera-animata");

    // Ogni lettera parte un po' dopo la precedente
    span.style.animationDelay = `${index * ritardoTraLettere}s`;
    span.style.animationDuration = `${durataVoloLettera}s`;

    title.appendChild(span);
  });

  // FASE 1: Inizia a comprimere la frase mentre le lettere sono in volo
  // La transizione durerà esattamente il tempo necessario a far atterrare l'ultima lettera
  title.style.transition = `letter-spacing ${tempoImpattoFinale}s ease-in`;

  // Usiamo requestAnimationFrame per far partire la classe CSS un istante dopo la creazione
  requestAnimationFrame(() => {
    title.classList.add("fase-compressione");
  });

  // FASE 2: L'impatto finale!
  // Appena atterra l'ultima lettera, togliamo la compressione fluida e facciamo scattare l'animazione della molla
  setTimeout(() => {
    title.style.transition = ""; // Rimuove la transizione JS
    title.classList.remove("fase-compressione");
    title.classList.add("fase-molla");
  }, tempoImpattoFinale * 1000); // Moltiplicato per 1000 per avere i millisecondi
}

document.addEventListener("DOMContentLoaded", () => {
  animaTitolo();
  // gestione chiusura popup
  const popup = document.getElementById("mioPopup");
  const btnChiudi = document.getElementById("chiudiPopup");

  // chiusura cliccando "X"
  btnChiudi.onclick = function () {
    popup.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == popup) {
      // chiusura anche cliccando zona fuori dal popup
      popup.style.display = "none";
    }
  };
  const popupImmagineContainer = document.querySelector(
    ".popup-immagine-container",
  );

  // gestione lightbox
  const lightboxOverlay = document.getElementById("lightboxOverlay");
  const lightboxImmagine = document.getElementById("lightboxImmagine");
  const popupImmagine = document.getElementById("popupImmagine");

  // click immagine popup per ingrandire
  popupImmagineContainer.onclick = function () {
    lightboxImmagine.src = popupImmagine.src;
    lightboxOverlay.style.display = "flex";
  };

  // chiusura lightbox
  lightboxOverlay.onclick = function () {
    lightboxOverlay.style.display = "none";
  };
});

async function buildUIList(targetUrl, domTarget) {
  // loader
  domTarget.innerHTML =
    '<p class="loader-text">Recupero informazioni in corso...</p>';

  const dataset = await fetchDaTMDB(targetUrl);

  if (!dataset) {
    // messaggio errore
    domTarget.innerHTML =
      '<p class="error-text">Impossibile stabilire una connessione con il servizio streaming.</p>';
    return;
  }

  domTarget.innerHTML = "";

  // iterazioni che non ritornano un nuovo array
  // Sostituisci il vecchio forEach con questo:
  dataset.forEach((singleRow, index) => {
    const generatedVisual = generatePreviewElement(singleRow);

    // Assegna un ritardo crescente (es: 0s, 0.1s, 0.2s, 0.3s...)
    generatedVisual.style.animationDelay = `${index * 0.1}s`;

    // TRUCCO PRO: Quando l'animazione di volo finisce, la rimuoviamo.
    // Questo permette al tuo effetto :hover originale di tornare a funzionare perfettamente!
    generatedVisual.addEventListener("animationend", () => {
      generatedVisual.style.animation = "none";
      generatedVisual.style.opacity = "1";
    });

    domTarget.appendChild(generatedVisual);
  });
}

if (homeSection) {
  // endpoint per i trend del momento
  buildUIList("/trending/movie/week", homeSection);
}

if (movieSection) {
  // endpoint per i film in uscita
  buildUIList("/movie/now_playing", movieSection);
}

if (tvSection) {
  // endpoint per le serie TV
  buildUIList("/tv/on_the_air", tvSection);
}
