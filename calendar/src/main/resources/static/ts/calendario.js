var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getEvents, createEvent, deleteEvent } from "./eventiService";
// ✅ Variabili globali per gestire lo stato del calendario e della data selezionata
let selectedDate = null;
let calendar;
// ✅ Ottieni la data di oggi
function getToday() {
    const today = new Date();
    return today.toISOString().split("T")[0];
}
// ✅ Carica dinamicamente il calendario
function loadCalendar() {
    return __awaiter(this, void 0, void 0, function* () {
        const today = getToday(); // Prende la data odierna
        // 🔥 Recupera automaticamente gli eventi di oggi
        const events = yield getEvents(`${today}T00:00`, `${today}T23:59`);
        const calendarEl = document.getElementById("calendar");
        calendarEl.innerHTML = "";
        calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            initialView: "timeGridDay", // Vista iniziale giornaliera
            initialDate: today, // Imposta la data di partenza su oggi
            editable: true,
            selectable: true,
            headerToolbar: {
                left: "prev,next today",
                center: "title",
                right: "timeGridDay,dayGridMonth",
            },
            events: events,
            eventContent: function (info) {
                return {
                    html: `<div>
                  <b>${info.event.title}</b><br>
                  <small>${info.event.extendedProps.tag}</small>
              </div>`,
                };
            },
            dateClick: (info) => openEventForm(info.dateStr),
            eventClick: (info) => __awaiter(this, void 0, void 0, function* () {
                if (confirm(`Vuoi eliminare l'evento: ${info.event.title}?`)) {
                    yield deleteEvent(Number(info.event.id));
                    calendar.refetchEvents(); // 🔄 Ricarica gli eventi
                }
            }),
        });
        calendar.render(); // Mostra il calendario
    });
}
// ✅ Apre il form per creare un nuovo evento
function openEventForm(date) {
    selectedDate = date; // Memorizza la data selezionata
    const form = document.getElementById("addEventForm");
    form.style.display = "block"; // Mostra il form per creare l'evento
}
// ✅ Salva l'evento dal form e lo invia al backend
function saveEvent() {
    return __awaiter(this, void 0, void 0, function* () {
        const title = document.getElementById("eventTitle")
            .value; // Recupera il titolo dell'evento dal form
        const time = document.getElementById("eventTime").value; // Recupera l'orario dell'evento dal form
        const description = document.getElementById("eventDescription").value; // Recupera la descrizione dell'evento dal form
        // ✅ Verifica che tutti i campi siano compilati
        if (selectedDate && title && time) {
            const newEvent = {
                titolo: title, // Titolo dell'evento
                descrizione: description, // Descrizione dell'evento
                dataInizio: `${selectedDate}T${time}:00`, // Data e ora di inizio
                dataFine: `${selectedDate}T${time}:00`, // Data e ora di fine
                colore: "#2196F3", // Colore predefinito dell'evento
                tag: "Generale", // Tag predefinito dell'evento
            };
            yield createEvent(newEvent); // 🔥 Salva l'evento nel backend
            calendar.refetchEvents(); // 🔄 Ricarica gli eventi aggiornati
            closeEventForm(); // ✅ Chiude il form dopo il salvataggio
        }
        else {
            alert("Completa tutti i campi prima di salvare!"); // ⚠️ Messaggio di errore se mancano campi
        }
    });
}
// ✅ Chiude il form per la creazione dell'evento
function closeEventForm() {
    const form = document.getElementById("addEventForm");
    form.style.display = "none"; // Nasconde il form
    resetForm(); // ✅ Resetta i campi del form
}
// ✅ Resetta i campi del form
function resetForm() {
    document.getElementById("eventTitle").value = ""; // Pulisce il campo del titolo
    document.getElementById("eventTime").value = ""; // Pulisce il campo dell'orario
    document.getElementById("eventDescription").value =
        ""; // Pulisce il campo della descrizione
    selectedDate = null; // Resetta la data selezionata
}
// ✅ Aggiunge i listener per il form
document.getElementById("saveEvent").addEventListener("click", saveEvent); // Assegna al pulsante "Salva" la funzione `saveEvent`
document
    .getElementById("cancelEvent")
    .addEventListener("click", closeEventForm); // Assegna al pulsante "Annulla" la funzione `closeEventForm`
// ✅ Avvia il calendario quando la pagina viene caricata
document.addEventListener("DOMContentLoaded", loadCalendar); // Chiama `loadCalendar` al caricamento della pagina
