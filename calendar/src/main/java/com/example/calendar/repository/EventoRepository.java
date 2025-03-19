package com.example.calendar.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.calendar.model.Evento;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
    List<Evento> findByDataInizioBetween(LocalDateTime start, LocalDateTime end);
}
