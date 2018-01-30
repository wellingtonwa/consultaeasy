/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package xyz.friendscorp.consulteasy.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import xyz.friendscorp.consulteasy.domain.Marcador;

/**
 *
 * @author welli
 */
@Repository
public interface MarcadorRepository extends JpaRepository<Marcador, Long>{
    
    
    @Query("SELECT marcador FROM Marcador marcador JOIN marcador.user user WHERE user.login = ?#{principal.username}")
    public Page<Marcador> findAllByCurrentUser(Pageable pageable);
    
    public Optional<Marcador> findOneByNome(String nome);
    
}
