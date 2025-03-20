package com.example.calendar.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.calendar.exception.ResourceNotFoundException;
import com.example.calendar.model.Evento;
import com.example.calendar.repository.EventoRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class EventoService {

    private final EventoRepository eventoRepository;

    // Carica eventi tra due date
    public List<Evento> getEventi(LocalDateTime start, LocalDateTime end) {
        return eventoRepository.findByDataInizioBetween(start, end);
    }

    // Crea evento
    public Evento createEvento(Evento evento) {
        if (evento.getDataInizio().isAfter(evento.getDataFine())) {
            throw new IllegalArgumentException("Data di inizio deve essere precedente alla data di fine");
        }

        return eventoRepository.save(evento);
    }

    // Elimina evento tramite ID
    public void deleteEvento(Long id) {
        if (!eventoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Evento non trovato con id: " + id);
        }
        eventoRepository.deleteById(id);
    }
}
