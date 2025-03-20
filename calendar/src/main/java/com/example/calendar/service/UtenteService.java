package com.example.calendar.service;

import com.example.calendar.exception.ResourceNotFoundException;
import com.example.calendar.model.Utente;
import com.example.calendar.repository.UtenteRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UtenteService {

    @Autowired
    private UtenteRepository utenteRepo;

    // Restituisce tutti gli utenti (opzionale)
    public List<Utente> getAllUtenti() {
        return utenteRepo.findAll();
    }

    // Cerca utente tramite ID
    public Optional<Utente> getUtenteById(Long id) {
        return Optional.of(utenteRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utente non trovato con id: " + id)));
    }

    // Crea un nuovo utente (senza controllo di username o email duplicati)
    public Utente createUtente(Utente utente) {
        utente.setPassword(utente.getPassword());
        return utenteRepo.save(utente);
    }

    // Elimina un utente
    public void deleteUtente(Long id) {
        if (!utenteRepo.existsById(id)) {
            throw new ResourceNotFoundException("Utente non trovato con id: " + id);
        }
        utenteRepo.deleteById(id);
    }
}
