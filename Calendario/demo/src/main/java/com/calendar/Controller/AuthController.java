package com.calendar.Controller;

import com.calendar.Model.Utente;
import com.calendar.Security.JwtUtil;
import com.calendar.Service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UtenteService utenteService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public String login(@RequestBody Utente utente) {
        Optional<Utente> user = utenteService.getUtenteByUsername(utente.getUsername());

        if (user.isPresent() && passwordEncoder.matches(utente.getPassword(), user.get().getPassword())) {
            return jwtUtil.generateToken(user.get().getUsername()); // Restituisce il token JWT
        } else {
            return "Login fallito";
        }
    }
}