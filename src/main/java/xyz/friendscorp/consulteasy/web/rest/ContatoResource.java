/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package xyz.friendscorp.consulteasy.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xyz.friendscorp.consulteasy.domain.Contato;
import xyz.friendscorp.consulteasy.service.ContatoService;
import xyz.friendscorp.consulteasy.service.dto.ContatoDTO;
import xyz.friendscorp.consulteasy.web.rest.util.HeaderUtil;

/**
 *
 * @author wellington
 */
@RestController
@RequestMapping(path = "/api")
public class ContatoResource {
    
    private ContatoService contatoService;
    private final Logger log = LoggerFactory.getLogger(PacienteResource.class);

    public ContatoResource(ContatoService contatoService) {
        this.contatoService = contatoService;
    }
    
    @GetMapping(path = "/contato/paciente/{idPaciente}")
    public ResponseEntity<List<ContatoDTO>> getContatosPaciente(@PathVariable Long idPaciente) {
        System.out.println("Entrou na pesquisa de contatos");
        return new ResponseEntity<>(contatoService.findAll(idPaciente), HttpStatus.OK);
    }
    
    @GetMapping(path =  "/contato/{idContato}")
    public ResponseEntity<ContatoDTO> getContato(@PathVariable Long idContato) {
        return new ResponseEntity<>(new ContatoDTO(contatoService.getContato(idContato)), HttpStatus.OK);
    }
    
    @PostMapping(path = "/contato/{idPaciente}")
    public ResponseEntity<ContatoDTO> createEntity(@PathVariable Long idPaciente, @RequestBody ContatoDTO contatoDTO) throws URISyntaxException{
        Contato novoContato = contatoService.createContato(contatoDTO);
        
        return ResponseEntity.created(new URI("/api/contato/"+novoContato.getId()))
                .headers(HeaderUtil.createAlert("pacienteManagement.contatoCreated", novoContato.getId().toString()))
                .body(new ContatoDTO(novoContato));
    }

    @DeleteMapping(path = "/contato/{idContato}")
    public ResponseEntity<Void> deleteEntity(@PathVariable Long idContato) {
        log.debug("REST request to delete Contato: {}", idContato);
        this.contatoService.deleteContato(idContato);
        return ResponseEntity.ok().headers(HeaderUtil.createAlert("contatoManagement.deleted", idContato.toString())).build();
    }
}
