package com.example.calendar.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.calendar.model.Evento;
import com.example.calendar.repository.EventoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventoService {
    private final EventoRepository eventoRepository;

    public List<Evento> getEventi(LocalDateTime start, LocalDateTime end) {
        return eventoRepository.findByDataInizioBetween(start, end);
    }

    public Evento createEvento(Evento evento) {
        return eventoRepository.save(evento);
    }

    public void deleteEvento(Long id) {
        eventoRepository.deleteById(id);
    }
}
