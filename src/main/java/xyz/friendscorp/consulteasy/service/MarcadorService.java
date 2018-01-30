/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package xyz.friendscorp.consulteasy.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import xyz.friendscorp.consulteasy.domain.Marcador;
import xyz.friendscorp.consulteasy.repository.MarcadorRepository;
import xyz.friendscorp.consulteasy.service.dto.MarcadorDTO;

/**
 * 
 * @author wellington
 */
@Service
@Transactional
public class MarcadorService {
    
    private final MarcadorRepository marcadorRepository;
    private final UserService userService;

    public MarcadorService(MarcadorRepository marcadorRepository, UserService userService) {
        this.marcadorRepository = marcadorRepository;
        this.userService = userService;
    }
    
    public Page<MarcadorDTO> findAll(Pageable pageable){
        return marcadorRepository.findAll(pageable).map(MarcadorDTO::new);
    }
    
    public Marcador createMarcador(MarcadorDTO marcadorDTO){
        Marcador marcador = new Marcador(null, marcadorDTO.getNome(), marcadorDTO.getCor(), userService.getUserWithAuthorities().get());
        marcador = marcadorRepository.save(marcador);
        return marcador;
    }
    
    public MarcadorDTO getMarcador(Long id){
        return Optional.of(marcadorRepository.getOne(id)).map(MarcadorDTO::new).get();
    }
    
    public Optional<MarcadorDTO> updateMarcador(MarcadorDTO marcadorDTO){
        return Optional.of(marcadorRepository.getOne(marcadorDTO.getId()))
                .map(m -> {
                    m.setNome(marcadorDTO.getNome());
                    m.setCor(marcadorDTO.getCor());
                    return m;
                }).map(MarcadorDTO::new);
    }
}
