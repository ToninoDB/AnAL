package com.calendar.Controller;
import com.calendar.Model.Evento;
import com.calendar.Service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/eventi")
public class EventoController {
    @Autowired
    private EventoService eventoService;   

    @GetMapping("/traDate")
    public List<Evento> getEventiTraDate(@RequestParam LocalDateTime inizioData, @RequestParam LocalDateTime fineData) {
        return eventoService.getEventi(inizioData, fineData);
    }

    @GetMapping("/{id}")
    public Optional<Evento> getEvento(@PathVariable Long id) {
        return eventoService.getEventoByID(id);
    }
}