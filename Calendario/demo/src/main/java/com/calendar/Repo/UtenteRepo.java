package com.calendar.Repo;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.calendar.Model.Utente;

public interface UtenteRepo extends JpaRepository<Utente, Long> {
    Optional<Utente> findByUsername(String username);
    Optional<Utente> findByEmail(String email);
}