var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ✅ Recupera gli eventi dal backend
export function getEvents(start, end) {
    return __awaiter(this, void 0, void 0, function* () {
        // Esegue una richiesta GET verso il backend per ottenere gli eventi tra due date
        const response = yield fetch(`/api/eventi?start=${start}&end=${end}`);
        // Controlla se la risposta è andata a buon fine
        if (!response.ok)
            throw new Error("Errore nel recupero degli eventi");
        // Converte la risposta in formato JSON e la restituisce
        return yield response.json();
    });
}
// ✅ Crea un nuovo evento
export function createEvent(event) {
    return __awaiter(this, void 0, void 0, function* () {
        // Esegue una richiesta POST verso il backend per creare un nuovo evento
        const response = yield fetch("/api/eventi", {
            method: "POST", // Metodo HTTP POST per l'invio di dati
            headers: {
                "Content-Type": "application/json", // Definisce che i dati sono in formato JSON
            },
            body: JSON.stringify(event), // Converte l'oggetto `event` in una stringa JSON
        });
        // Controlla se la risposta è andata a buon fine
        if (!response.ok)
            throw new Error("Errore nella creazione dell'evento");
        // Converte la risposta in formato JSON e la restituisce
        return yield response.json();
    });
}
// ✅ Cancella un evento
export function deleteEvent(id) {
    return __awaiter(this, void 0, void 0, function* () {
        // Esegue una richiesta DELETE verso il backend per eliminare un evento tramite ID
        const response = yield fetch(`/api/eventi/${id}`, {
            method: "DELETE", // Metodo HTTP DELETE per eliminare l'evento
        });
        // Controlla se la risposta è andata a buon fine
        if (!response.ok)
            throw new Error("Errore nella cancellazione dell'evento");
    });
}
