package com.calendar.Model;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Evento{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "utente_id", nullable = false)
    private Utente utente;

    @Column(nullable = false)
    private String impegno;

    @Column(nullable = false)
    private LocalDateTime inizioData;

    @Column(nullable = false)
    private LocalDateTime fineData;

    public Evento(Utente utente, String impegno, LocalDateTime inizioData, LocalDateTime fineData) {
        this.utente = utente;
        this.impegno = impegno;
        this.inizioData = inizioData;
        this.fineData = fineData;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Utente getUtente() {
        return utente;
    }

    public void setUtente(Utente utente) {
        this.utente = utente;
    }

    public String getTipoImpegno() {
        return impegno;
    }

    public void setImpegno(String impegno) {
        this.impegno = impegno;
    }

    public LocalDateTime getInizioData() {
        return inizioData;
    }

    public void setInizioData(LocalDateTime inizioData) {
        this.inizioData = inizioData;
    }

    public LocalDateTime getFineData() {
        return fineData;
    }

    public void setFineData(LocalDateTime fineData) {
        this.fineData = fineData;
    }
}

