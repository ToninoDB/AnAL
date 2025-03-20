package com.example.calendar.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.Collections;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.calendar.exception.ResourceNotFoundException;
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

    @GetMapping
    public ResponseEntity<List<Evento>> getEventi(
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end) {

        try {
            LocalDateTime startDate = (start != null) ? LocalDateTime.parse(start)
                    : LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);

            LocalDateTime endDate = (end != null) ? LocalDateTime.parse(end)
                    : startDate.withHour(23).withMinute(59).withSecond(59);

            List<Evento> eventi = eventoService.getEventi(startDate, endDate);
            return ResponseEntity.ok(eventi);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }
    }

    @PostMapping
    public ResponseEntity<Evento> creaEvento(@RequestBody Evento evento) {
        try {
            Evento nuovoEvento = eventoService.createEvento(evento);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuovoEvento);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvento(@PathVariable Long id) {
        try {
            eventoService.deleteEvento(id);
            return ResponseEntity.ok("Evento eliminato con successo");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
