/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package xyz.friendscorp.consulteasy.repository;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import xyz.friendscorp.consulteasy.domain.Contato;

/**
 *
 * @author wellington
 */
@Repository
public interface  ContatoRepository extends JpaRepository<Contato, Long> {
    
    @Query("SELECT contato FROM Contato contato JOIN contato.paciente pac JOIN pac.user user WHERE user.login = ?#{principal.username} AND pac.id = ?1")
    public Page<Contato> getContatosByIdPaciente(Long idPaciente, Pageable pageable);
    @Query("SELECT contato FROM Contato contato JOIN contato.paciente pac JOIN pac.user user WHERE user.login = ?#{principal.username} AND pac.id = ?1")
    public List<Contato> getAllContatosByPacienteId(Long idPaciente);
    @Query("SELECT contato FROM Contato contato JOIN contato.paciente pac JOIN pac.user user WHERE user.login = ?#{principal.username} AND pac.id = ?2 AND contato.id = ?1")
    public Optional<Contato> getContato(Long idContato, Long idPaciente);
    @Query("SELECT contato FROM Contato contato JOIN contato.paciente pac JOIN pac.user user WHERE user.login = ?#{principal.username} AND contato.id = ?1")
    public Contato getContatoForCurrentUser(Long id);
}
