# Movie App - Stile Netflix

**Corso:** Introduzione allo sviluppo frontend
**Autore:** Daniele Marinelli

Una web app multi-pagina in stile piattaforma di streaming, sviluppata in HTML, CSS e JavaScript Vanilla. Il progetto recupera in tempo reale le informazioni sui film e le serie TV interfacciandosi con l'API pubblica di The Movie Database (TMDB).

## Come avviare il progetto in locale

1. Clona o scarica questa repository.
2. Crea un file chiamato `config.js` all'interno della cartella `js/`.
3. Inserisci la tua API Key di TMDB all'interno del file appena creato, con questa sintassi:
   \`\`\`javascript
   const API*KEY = "INSERISCI_QUI_LA_TUA_CHIAVE_API";
   \`\`\`
   *(Nota: il file config.js è già ignorato tramite .gitignore per ragioni di sicurezza).\_
4. Apri il file `home.html` (o qualsiasi altra pagina) utilizzando un server locale. Consigliato: l'estensione **Live Server** per Visual Studio Code.

## Endpoint TMDB utilizzati

Per popolare dinamicamente le varie sezioni dell'app, vengono effettuate chiamate **GET** ai seguenti endpoint (con base URL `https://api.themoviedb.org/3`):

- **Homepage (tendenze):** `/trending/movie/week`
- **Pagina film (nelle sale):** `/movie/now_playing`
- **Pagina serie TV (in onda):** `/tv/on_the_air`

Inoltre, viene utilizzato l'endpoint base per il recupero dei poster delle locandine: `https://image.tmdb.org/t/p/w500`.

## Tecnologie utilizzate

- **HTML & CSS:** Layout full-responsive realizzato nativamente con CSS, senza l'uso di framework esterni.
- **JavaScript:** Utilizzo di funzioni asincrone (`async/await`, `fetch`), arrow functions, manipolazione del DOM (`createElement`, `appendChild`).
- **Gestione errori:** UI protetta da chiamate fallite tramite blocchi `try/catch` e messaggi a schermo in caso di API non raggiungibile.
- **Popup dettagli film/serie TV:** Cliccando sulle singole card si apre un popup dinamico contenente anno, valutazione precisa, e link esterni per ricerche rapide su Google e YouTube per cast e trailer.
