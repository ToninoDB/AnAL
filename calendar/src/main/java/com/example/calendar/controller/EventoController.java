package com.example.calendar.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.calendar.model.Evento;
import com.example.calendar.service.EventoService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/eventi")
@RequiredArgsConstructor
public class EventoController {

    private final EventoService eventoService;
    // private final DateTimeFormatter formatter =
    // DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");

    @GetMapping
    public List<Evento> getEventi(
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end) {
        // ✅ Se start ed end sono null → Imposta la data odierna di default
        LocalDateTime startDate = (start != null) ? LocalDateTime.parse(start)
                : LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);

        LocalDateTime endDate = (end != null) ? LocalDateTime.parse(end)
                : startDate.withHour(23).withMinute(59).withSecond(59);

        return eventoService.getEventi(startDate, endDate);
    }

    @PostMapping
    public Evento creaEvento(@RequestBody Evento evento) {
        return eventoService.createEvento(evento);
    }

    @DeleteMapping("/{id}")
    public void deleteEvento(@PathVariable Long id) {
        eventoService.deleteEvento(id);
    }

}
