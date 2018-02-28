package xyz.friendscorp.consulteasy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import xyz.friendscorp.consulteasy.domain.Compromisso;

@Repository
public interface CompromissoRepository extends JpaRepository<Compromisso, Long> {

}