var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getEvents(start, end) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`/api/eventi?start=${start}&end=${end}`);
        if (!response.ok)
            throw new Error("Errore nel recupero degli eventi");
        return yield response.json();
    });
}
export function createEvent(event) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("/api/eventi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
        });
        if (!response.ok)
            throw new Error("Errore nella creazione dell'evento");
        return yield response.json();
    });
}
export function deleteEvent(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`/api/eventi/${id}`, {
            method: "DELETE",
        });
        if (!response.ok)
            throw new Error("Errore nella cancellazione dell'evento");
    });
}
