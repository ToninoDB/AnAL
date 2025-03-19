package com.calendar.Service;

import com.calendar.Model.Evento;
import com.calendar.Repo.EventoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EventoService {
    @Autowired
    private EventoRepo eventoRepo;

    public List<Evento> getEventi(LocalDateTime inizioData, LocalDateTime fineData) {
        return eventoRepo.findByInizioDataBetween(inizioData, fineData);
    }
    public Optional<Evento> getEventoByID(Long id) {
        return eventoRepo.findById(id);
    }
}
