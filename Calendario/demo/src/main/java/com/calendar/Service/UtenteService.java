package com.calendar.Service;
import com.calendar.Model.Utente;
import com.calendar.Repo.UtenteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UtenteService {

    @Autowired
    private UtenteRepo utenteRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Utente> getAllUtenti() {
        return utenteRepo.findAll();
    }

    public Optional<Utente> getUtenteById(Long id) {
        return utenteRepo.findById(id);
    }

    public Optional<Utente> getUtenteByUsername(String username) {
        return utenteRepo.findByUsername(username);
    }

    public Optional<Utente> getUtenteByEmail(String email) {
        return utenteRepo.findByEmail(email);
    }

    public Utente createUtente(Utente utente) {
        utente.setPassword(passwordEncoder.encode(utente.getPassword())); // Hashing della password
        return utenteRepo.save(utente);
    }

    public void deleteUtente(Long id) {
        utenteRepo.deleteById(id);
    }
}
