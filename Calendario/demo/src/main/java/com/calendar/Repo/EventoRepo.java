package com.calendar.Repo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import com.calendar.Model.Evento;

public interface EventoRepo extends JpaRepository<Evento, Long> {
    List<Evento> findByInizioDataBetween(LocalDateTime start, LocalDateTime end);

    /*
    Se si volessero ricercare degli eventi correlati ad un utente specifico 
     
    List<Evento> findByUtenteId(Long utenteId);
    
    */
}