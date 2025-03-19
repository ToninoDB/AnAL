import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getEvents, createEvent, deleteEvent } from "./eventiService";

// ✅ Variabili globali per gestire lo stato del calendario e della data selezionata
let selectedDate: string | null = null;
let calendar: Calendar;

// ✅ Ottieni la data di oggi
function getToday(): string {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

// ✅ Carica dinamicamente il calendario
async function loadCalendar() {
  const today = getToday(); // Prende la data odierna

  // 🔥 Recupera automaticamente gli eventi di oggi
  const events = await getEvents(`${today}T00:00`, `${today}T23:59`);

  const calendarEl = document.getElementById("calendar")!;
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

    eventClick: async (info) => {
      if (confirm(`Vuoi eliminare l'evento: ${info.event.title}?`)) {
        await deleteEvent(Number(info.event.id));
        calendar.refetchEvents(); // 🔄 Ricarica gli eventi
      }
    },
  });

  calendar.render(); // Mostra il calendario
}

// ✅ Apre il form per creare un nuovo evento
function openEventForm(date: string) {
  selectedDate = date; // Memorizza la data selezionata
  const form = document.getElementById("addEventForm") as HTMLElement;
  form.style.display = "block"; // Mostra il form per creare l'evento
}

// ✅ Salva l'evento dal form e lo invia al backend
async function saveEvent() {
  const title = (document.getElementById("eventTitle") as HTMLInputElement)
    .value; // Recupera il titolo dell'evento dal form
  const time = (document.getElementById("eventTime") as HTMLInputElement).value; // Recupera l'orario dell'evento dal form
  const description = (
    document.getElementById("eventDescription") as HTMLTextAreaElement
  ).value; // Recupera la descrizione dell'evento dal form

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

    await createEvent(newEvent); // 🔥 Salva l'evento nel backend
    calendar.refetchEvents(); // 🔄 Ricarica gli eventi aggiornati
    closeEventForm(); // ✅ Chiude il form dopo il salvataggio
  } else {
    alert("Completa tutti i campi prima di salvare!"); // ⚠️ Messaggio di errore se mancano campi
  }
}

// ✅ Chiude il form per la creazione dell'evento
function closeEventForm() {
  const form = document.getElementById("addEventForm") as HTMLElement;
  form.style.display = "none"; // Nasconde il form
  resetForm(); // ✅ Resetta i campi del form
}

// ✅ Resetta i campi del form
function resetForm() {
  (document.getElementById("eventTitle") as HTMLInputElement).value = ""; // Pulisce il campo del titolo
  (document.getElementById("eventTime") as HTMLInputElement).value = ""; // Pulisce il campo dell'orario
  (document.getElementById("eventDescription") as HTMLTextAreaElement).value =
    ""; // Pulisce il campo della descrizione
  selectedDate = null; // Resetta la data selezionata
}

// ✅ Aggiunge i listener per il form
document.getElementById("saveEvent")!.addEventListener("click", saveEvent); // Assegna al pulsante "Salva" la funzione `saveEvent`
document
  .getElementById("cancelEvent")!
  .addEventListener("click", closeEventForm); // Assegna al pulsante "Annulla" la funzione `closeEventForm`

// ✅ Avvia il calendario quando la pagina viene caricata
document.addEventListener("DOMContentLoaded", loadCalendar); // Chiama `loadCalendar` al caricamento della pagina
