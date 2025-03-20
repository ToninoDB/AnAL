// Definisce la struttura di un oggetto `Evento`, per la tipizzazione degli oggetti "evento"
interface Evento {
  id?: number; // ID univoco dell'evento (opzionale perché viene generato automaticamente dal backend)
  titolo: string; // Titolo dell'evento (obbligatorio)
  descrizione?: string; // Descrizione dell'evento (opzionale)
  dataInizio: string; // Data e ora di inizio dell'evento (formato ISO string)
  dataFine: string; // Data e ora di fine dell'evento (formato ISO string)
  colore?: string; // Colore dell'evento nel calendario (opzionale)
  tag?: string; // Tag per categorizzare l'evento (opzionale)
}
//Se non si usa export la funziona è privata alla classe di appartenenza
export async function getEvents(start: string, end: string): Promise<Evento[]> {
  // Effettua una richiesta GET al backend per ottenere gli eventi tra due date
  const response = await fetch(`/api/eventi?start=${start}&end=${end}`);

  // Controlla se la risposta è valida (status 200-299)
  if (!response.ok) throw new Error("Errore nel recupero degli eventi");

  // Converte la risposta JSON in un array di oggetti `Evento`
  return await response.json();
}

export async function createEvent(event: Evento): Promise<Evento> {
  // Effettua una richiesta POST al backend per creare un nuovo evento
  const response = await fetch("/api/eventi", {
    method: "POST", // Metodo HTTP → POST = creazione di nuova risorsa
    headers: {
      "Content-Type": "application/json", // Tipo di contenuto → JSON
    },
    body: JSON.stringify(event), // Converte l'oggetto `Evento` in JSON
  });

  // Controlla se la risposta è valida
  if (!response.ok) throw new Error("Errore nella creazione dell'evento");

  // Converte la risposta JSON in un oggetto `Evento` (con ID generato dal backend)
  return await response.json();
}

export async function deleteEvent(id: number): Promise<void> {
  // Effettua una richiesta DELETE al backend per eliminare l'evento tramite ID
  const response = await fetch(`/api/eventi/${id}`, {
    method: "DELETE", // Metodo HTTP → DELETE = eliminazione di una risorsa
  });

  // Controlla se la risposta è valida
  if (!response.ok) throw new Error("Errore nella cancellazione dell'evento");
}
