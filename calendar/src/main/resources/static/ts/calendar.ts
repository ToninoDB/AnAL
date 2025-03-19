import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "@fullcalendar/core/main.css"; // ✅ Importazione del CSS

function loadSimpleCalendar(): void {
  console.log("Caricamento calendario...");

  const calendarEl = document.getElementById("calendar") as HTMLElement;

  if (calendarEl) {
    console.log("Elemento #calendar trovato");

    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      editable: true,
      selectable: true,
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },
    });

    calendar.render(); // ✅ Renderizza il calendario
    console.log("Calendario renderizzato correttamente!");
  } else {
    console.error("Elemento #calendar NON trovato!");
  }
}

document.addEventListener("DOMContentLoaded", loadSimpleCalendar);
