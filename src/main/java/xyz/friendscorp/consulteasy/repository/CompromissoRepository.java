package xyz.friendscorp.consulteasy.repository;

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

    @Query("SELECT C FROM Compromisso c JOIN c.user user WHERE user.login = ? #{principal.username} AND c.id = ?1")
    Optional<Compromisso> getCompromissoByCurrentUser(Long id);



}
