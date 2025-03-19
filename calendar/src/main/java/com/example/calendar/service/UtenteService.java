package com.example.calendar.service;

import com.example.calendar.model.Utente;
import com.example.calendar.repository.UtenteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UtenteService {

    @Autowired
    private UtenteRepository utenteRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Utente> getAllUtenti() {
        return utenteRepo.findAll();
    }

    public Optional<Utente> getUtenteById(Long id) {
        return utenteRepo.findById(id);
    }

    public Utente createUtente(Utente utente) {
        utente.setPassword(passwordEncoder.encode(utente.getPassword())); // Hashing della password
        return utenteRepo.save(utente);
    }

    public void deleteUtente(Long id) {
        utenteRepo.deleteById(id);
    }
}
