package xyz.friendscorp.consulteasy.repository;

import java.time.Instant;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import xyz.friendscorp.consulteasy.domain.Compromisso;

@Repository
public interface CompromissoRepository extends JpaRepository<Compromisso, Long> {

    @Query("SELECT c FROM Compromisso c")
    Page<Compromisso> getAllCompromissos(Pageable pageable);

    @Query("SELECT c FROM Compromisso c JOIN c.user user WHERE user.login = ?#{principal.username}")
    Page<Compromisso> getCompromissosByCurrentUser(Pageable pageable);

    @Query("SELECT c FROM Compromisso c JOIN c.user user WHERE c.id = ?1 AND user.login = ?#{principal.username}")
    Optional<Compromisso> getCompromissoByCurrentUser(Long id);

    @Query("SELECT c FROM Compromisso c JOIN c.user user WHERE c.inicio >= ?1 AND c.inicio <= ?2 AND user.login = ?#{principal.username}")
    Page<Compromisso> getCompromissosByDataInicio(Pageable pageable, Instant dataInicio, Instant dataFim);



}
