/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package xyz.friendscorp.consulteasy.web.rest;

import io.github.jhipster.web.util.ResponseUtil;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xyz.friendscorp.consulteasy.domain.Marcador;
import xyz.friendscorp.consulteasy.repository.MarcadorRepository;
import xyz.friendscorp.consulteasy.service.MarcadorService;
import xyz.friendscorp.consulteasy.service.dto.MarcadorDTO;
import xyz.friendscorp.consulteasy.web.rest.errors.BadRequestAlertException;
import xyz.friendscorp.consulteasy.web.rest.util.HeaderUtil;

/**
 *
 * @author wellington
 */
@RestController
@RequestMapping("/api")
public class MarcadorResource {
    
    private final MarcadorService marcadorService;
    private final MarcadorRepository marcadorRepository;

    public MarcadorResource(MarcadorService marcadoService, MarcadorRepository marcadorRepository) {
        this.marcadorService = marcadoService;
        this.marcadorRepository = marcadorRepository;
    }
    
    @GetMapping("/marcador")
    public ResponseEntity<List<MarcadorDTO>> getAll(Pageable pageable) {
        return new ResponseEntity<>(marcadorService.findAll(pageable).getContent(), HttpStatus.OK);
    }
    
    @GetMapping("/marcador/{marcador}")
    public ResponseEntity<MarcadorDTO> getMarcador(@PathVariable Marcador marcador){
        return new ResponseEntity<>(marcadorService.getMarcador(marcador.getId()), HttpStatus.OK);
    }
    
    @PostMapping("/marcador")
    public ResponseEntity<Marcador> createMarcador(@Valid @RequestBody MarcadorDTO marcadorDTO){
        
        Optional<Marcador> checkNome = marcadorRepository.findOneByNome(marcadorDTO.getNome());
        if(checkNome.isPresent()
                && !checkNome.get().getId().equals(marcadorDTO.getId())){
            throw  new BadRequestAlertException("Já existe um marcador com o mesmo nome cadastrado", "marcadorResource", "nameexists");
        }
        
        return new ResponseEntity<>(marcadorService.createMarcador(marcadorDTO), HttpStatus.OK);
    }
    
    @PutMapping("/marcador")
    public ResponseEntity<MarcadorDTO> updateMarcador(@Valid @RequestBody MarcadorDTO marcadorDTO){
        Optional<MarcadorDTO> updatedMarcador = marcadorService.updateMarcador(marcadorDTO);
        
        return ResponseUtil.wrapOrNotFound(updatedMarcador
                , HeaderUtil.createAlert("marcadorManagement.updated"
                , updatedMarcador.get().getId().toString()));
    }
    
    @DeleteMapping("/marcador/{id}")
    public ResponseEntity<Void> deleteMarcador(@PathVariable Long id){
        marcadorRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createAlert( "marcadorManagement.deleted", id.toString())).build();
    }
}
