var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createEvent, deleteEvent, getEvents } from "./eventiService";
let calendar;
function getToday() {
    return new Date().toISOString().split("T")[0];
}
function loadCalendar() {
    return __awaiter(this, void 0, void 0, function* () {
        const today = getToday();
        const events = yield getEvents(`${today}T00:00`, `${today}T23:59`);
        const calendarEl = document.getElementById("calendar");
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
            events: events.map((event) => {
                var _a;
                return ({
                    id: (_a = event.id) === null || _a === void 0 ? void 0 : _a.toString(),
                    title: event.titolo,
                    start: event.dataInizio,
                    end: event.dataFine,
                    color: event.colore || "#3788d8",
                });
            }),
            dateClick: (info) => openEventForm(info.dateStr),
            eventClick: (info) => __awaiter(this, void 0, void 0, function* () {
                if (confirm(`Vuoi eliminare l'evento: ${info.event.title}?`)) {
                    yield deleteEvent(Number(info.event.id));
                    calendar.refetchEvents(); // 🔄 Aggiorna il calendario
                }
            }),
        });
        calendar.render(); // ✅ Renderizza il calendario
    });
}
const openEventForm = (date) => {
    const form = document.getElementById("addEventForm");
    form.style.display = "block";
    document.getElementById("saveEvent").onclick = () => saveEvent(date);
};
const saveEvent = (date) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const title = document.getElementById("eventTitle")
        .value;
    const startTime = document.getElementById("eventStartTime").value;
    const endTime = document.getElementById("eventEndTime")
        .value;
    const description = document.getElementById("eventDescription").value;
    if (title && startTime && endTime) {
        try {
            const newEvent = yield createEvent({
                titolo: title,
                descrizione: description,
                dataInizio: `${date}T${startTime}`,
                dataFine: `${date}T${endTime}`,
                colore: "#2196F3",
                tag: "Generale",
            });
            calendar.addEvent({
                id: (_a = newEvent.id) === null || _a === void 0 ? void 0 : _a.toString(),
                title: newEvent.titolo,
                start: newEvent.dataInizio,
                end: newEvent.dataFine,
                color: newEvent.colore,
            });
            closeEventForm();
        }
        catch (error) {
            alert("Errore nella creazione dell'evento");
        }
    }
});
const closeEventForm = () => {
    document.getElementById("addEventForm").style.display =
        "none";
};
// ✅ Carica il calendario al caricamento della pagina
document.addEventListener("DOMContentLoaded", loadCalendar);
