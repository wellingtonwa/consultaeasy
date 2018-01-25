package xyz.friendscorp.consulteasy.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import xyz.friendscorp.consulteasy.domain.Paciente;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    
    @Query("SELECT p FROM Paciente p JOIN p.user u WHERE u.login = ?#{principal.username}")
    public Page<Paciente> findAllByUser(Pageable pageable);
    @Query("DELETE FROM Paciente p WHERE p IN (SELECT pac FROM Paciente pac JOIN pac.user u WHERE pac.id = ?1 AND u.login = ?#{principal.username})")
    public void deleteById(Long id);
    public Optional<List<Paciente>> findByNomeCompleto(String nomeCompleto);
    
}