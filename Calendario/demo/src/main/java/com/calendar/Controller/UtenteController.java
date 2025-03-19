package com.calendar.Controller;
import com.calendar.Model.Utente;
import com.calendar.Service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/utenti")
public class UtenteController {

    @Autowired
    private UtenteService utenteService;

    @GetMapping
    public List<Utente> getAllUtenti() {
        return utenteService.getAllUtenti();
    }

    @GetMapping("/{id}")
    public Optional<Utente> getUtenteById(@PathVariable Long id) {
        return utenteService.getUtenteById(id);
    }

    @PostMapping
    public Utente createUtente(@RequestBody Utente utente) {
        return utenteService.createUtente(utente);
    }

    @DeleteMapping("/{id}")
    public void deleteUtente(@PathVariable Long id) {
        utenteService.deleteUtente(id);
    }

    @PostMapping("/login")
    public Utente login(@RequestBody Utente utente) {
        Optional<Utente> foundUtente = utenteService.getUtenteByUsername(utente.getUsername());
        if (foundUtente.isPresent()) {
            return foundUtente.get();
        } else {
            foundUtente = utenteService.getUtenteByEmail(utente.getEmail());
            return foundUtente.orElse(null);
        }
    }
}