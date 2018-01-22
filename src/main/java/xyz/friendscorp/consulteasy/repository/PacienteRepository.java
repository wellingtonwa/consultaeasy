package xyz.friendscorp.consulteasy.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import xyz.friendscorp.consulteasy.domain.Paciente;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    
    public Optional<List<Paciente>> findByNomeCompleto(String nomeCompleto);
    
}