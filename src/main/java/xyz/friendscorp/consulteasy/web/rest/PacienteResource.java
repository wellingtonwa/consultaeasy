package xyz.friendscorp.consulteasy.web.rest;

import com.codahale.metrics.annotation.Timed;

import io.github.jhipster.web.util.ResponseUtil;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
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

import xyz.friendscorp.consulteasy.domain.Contato;
import xyz.friendscorp.consulteasy.domain.Paciente;
import xyz.friendscorp.consulteasy.repository.PacienteRepository;
import xyz.friendscorp.consulteasy.service.PacienteService;
import xyz.friendscorp.consulteasy.service.dto.ContatoDTO;
import xyz.friendscorp.consulteasy.service.dto.PacienteDTO;
import xyz.friendscorp.consulteasy.web.rest.errors.BadRequestAlertException;
import xyz.friendscorp.consulteasy.web.rest.util.HeaderUtil;
import xyz.friendscorp.consulteasy.web.rest.util.PaginationUtil;

@RestController
@RequestMapping(path = "/api")
public class PacienteResource {

    private PacienteService pacienteService;
    private PacienteRepository pacienteRepository;
    private final Logger log = LoggerFactory.getLogger(PacienteResource.class);

    public PacienteResource(PacienteService pacienteService, PacienteRepository pacienteRepository) {
        this.pacienteService = pacienteService;
        this.pacienteRepository = pacienteRepository;
    }

    @GetMapping(path = "/paciente")
    @Timed
    public ResponseEntity<List<PacienteDTO>> getAllPacientes(Pageable pageable){
        final Page<PacienteDTO> page = pacienteService.getAllPacientes(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/paciente");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @PostMapping(path = "/paciente")
    @Timed
    public ResponseEntity<Paciente> createPaciente(@Valid @RequestBody PacienteDTO pacienteDTO) throws URISyntaxException {
        log.debug("REST request to save User : {}", pacienteDTO);

        if(pacienteDTO.getId()!=null){
            throw new BadRequestAlertException("Um novo paciente não pode ter um ID", "pacienteResource", "idexists");
        } else if(pacienteRepository.findByNomeCompleto(pacienteDTO.getNomeCompleto().toLowerCase()).isPresent()) {
            throw new BadRequestAlertException("Já existe um paciente com o nome informado", "pacienteResource", "nameexists");
        }
        Paciente novoPaciente = pacienteService.createPaciente(pacienteDTO);
        return ResponseEntity.created(new URI("/api/paciente/"+novoPaciente.getId()))
                .headers(HeaderUtil.createAlert("pacienteManagement.created", novoPaciente.getId().toString()))
                .body(novoPaciente);
    }

    @GetMapping(path = "/paciente/{paciente}")
    public ResponseEntity<PacienteDTO> getPaciente(@PathVariable Paciente paciente){
        return new ResponseEntity(pacienteService.getPaciente(paciente.getId()), HttpStatus.OK);
    }

    @GetMapping(path = "/paciente/{paciente}/contato/{contato}")
    public ResponseEntity<ContatoDTO> getContato(@PathVariable Paciente paciente, @PathVariable Contato contato){
        Optional<Contato> optContato = pacienteService.getContato(paciente.getId(), contato.getId());
        if(optContato.isPresent()){
            return new ResponseEntity<>(optContato.map(ContatoDTO::new).get(), HttpStatus.OK);
        } else {
            throw new BadRequestAlertException("Contato não encontrado!", "pacienteManagement", "contatonotexist");
        }
    }

    @GetMapping(path = "/paciente/{paciente}/contato")
    public ResponseEntity<List<ContatoDTO>> getContatos(@PathVariable Paciente paciente, Pageable pageable){
        Page<ContatoDTO> page = pacienteService.getContatos(paciente.getId(), pageable).map(ContatoDTO::new);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/paciente/"+paciente.getId().toString()+"/contato");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @PutMapping(path = "/paciente")
    @Timed
    public ResponseEntity<PacienteDTO> updateUser(@Valid @RequestBody PacienteDTO pacienteDTO) {
        log.debug("REST request to update User : {}", pacienteDTO);

        Optional<PacienteDTO> updatedAluno = pacienteService.updatePaciente(pacienteDTO);

        return ResponseUtil.wrapOrNotFound(updatedAluno,
            HeaderUtil.createAlert("alunoManagement.updated", pacienteDTO.getId().toString()));
    }
    
    @DeleteMapping(path = "/paciente/{id}")
    @Timed
    public ResponseEntity<Void> deletePaciente(@PathVariable Long id) {
        log.debug("REST request to delete Paciente: {}", id);
        pacienteRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createAlert( "userManagement.deleted", id.toString())).build();
    }
    
}
