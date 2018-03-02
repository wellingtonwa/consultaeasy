package xyz.friendscorp.consulteasy.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import xyz.friendscorp.consulteasy.domain.Compromisso;

@Repository
public interface CompromissoRepository extends JpaRepository<Compromisso, Long> {

    @Query("SELECT c FROM Compromisso c")
    public Page<Compromisso> getAllCompromissos(Pageable pageable);

}