import { createEvent, deleteEvent, getEvents } from "./eventiService";

let calendar: any;

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

async function loadCalendar() {
  const today = getToday();
  const events = await getEvents(`${today}T00:00`, `${today}T23:59`);

  const calendarEl = document.getElementById("calendar")!;
  calendarEl.innerHTML = "";

  calendar = new window.FullCalendar.Calendar(calendarEl, {
    plugins: [
      window.FullCalendar.dayGridPlugin,
      window.FullCalendar.timeGridPlugin,
      window.FullCalendar.interactionPlugin,
    ],
    initialView: "timeGridDay",
    initialDate: today,
    editable: true,
    selectable: true,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "timeGridDay,dayGridMonth",
    },
    events: events.map((event: any) => ({
      id: event.id?.toString(),
      title: event.titolo,
      start: event.dataInizio,
      end: event.dataFine,
      color: event.colore || "#3788d8",
    })),
    dateClick: (info: { dateStr: string }) => openEventForm(info.dateStr),
    eventClick: async (info: { event: any }) => {
      if (confirm(`Vuoi eliminare l'evento: ${info.event.title}?`)) {
        await deleteEvent(Number(info.event.id));
        calendar.refetchEvents(); // 🔄 Aggiorna il calendario
      }
    },
  });

  calendar.render(); // ✅ Renderizza il calendario
}

const openEventForm = (date: string) => {
  const form = document.getElementById("addEventForm") as HTMLElement;
  form.style.display = "block";

  document.getElementById("saveEvent")!.onclick = () => saveEvent(date);
};

const saveEvent = async (date: string) => {
  const title = (document.getElementById("eventTitle") as HTMLInputElement)
    .value;
  const startTime = (
    document.getElementById("eventStartTime") as HTMLInputElement
  ).value;
  const endTime = (document.getElementById("eventEndTime") as HTMLInputElement)
    .value;
  const description = (
    document.getElementById("eventDescription") as HTMLTextAreaElement
  ).value;

  if (title && startTime && endTime) {
    try {
      const newEvent = await createEvent({
        titolo: title,
        descrizione: description,
        dataInizio: `${date}T${startTime}`,
        dataFine: `${date}T${endTime}`,
        colore: "#2196F3",
        tag: "Generale",
      });

      calendar.addEvent({
        id: newEvent.id?.toString(),
        title: newEvent.titolo,
        start: newEvent.dataInizio,
        end: newEvent.dataFine,
        color: newEvent.colore,
      });

      closeEventForm();
    } catch (error) {
      alert("Errore nella creazione dell'evento");
    }
  }
};

const closeEventForm = () => {
  (document.getElementById("addEventForm") as HTMLElement).style.display =
    "none";
};

// ✅ Carica il calendario al caricamento della pagina
document.addEventListener("DOMContentLoaded", loadCalendar);
