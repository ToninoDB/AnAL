// ✅ Recupera gli eventi dal backend
export async function getEvents(start: string, end: string) {
  // Esegue una richiesta GET verso il backend per ottenere gli eventi tra due date
  const response = await fetch(`/api/eventi?start=${start}&end=${end}`);

  // Controlla se la risposta è andata a buon fine
  if (!response.ok) throw new Error("Errore nel recupero degli eventi");

  // Converte la risposta in formato JSON e la restituisce
  return await response.json();
}

// ✅ Crea un nuovo evento
export async function createEvent(event: any) {
  // Esegue una richiesta POST verso il backend per creare un nuovo evento
  const response = await fetch("/api/eventi", {
    method: "POST", // Metodo HTTP POST per l'invio di dati
    headers: {
      "Content-Type": "application/json", // Definisce che i dati sono in formato JSON
    },
    body: JSON.stringify(event), // Converte l'oggetto `event` in una stringa JSON
  });

  // Controlla se la risposta è andata a buon fine
  if (!response.ok) throw new Error("Errore nella creazione dell'evento");

  // Converte la risposta in formato JSON e la restituisce
  return await response.json();
}

// ✅ Cancella un evento
export async function deleteEvent(id: number) {
  // Esegue una richiesta DELETE verso il backend per eliminare un evento tramite ID
  const response = await fetch(`/api/eventi/${id}`, {
    method: "DELETE", // Metodo HTTP DELETE per eliminare l'evento
  });

  // Controlla se la risposta è andata a buon fine
  if (!response.ok) throw new Error("Errore nella cancellazione dell'evento");
}
