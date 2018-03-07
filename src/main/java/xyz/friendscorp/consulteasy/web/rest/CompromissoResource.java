package xyz.friendscorp.consulteasy.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.codahale.metrics.annotation.Timed;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import io.github.jhipster.web.util.ResponseUtil;
import xyz.friendscorp.consulteasy.domain.Compromisso;
import xyz.friendscorp.consulteasy.service.CompromissoService;
import xyz.friendscorp.consulteasy.service.dto.CompromissoDTO;
import xyz.friendscorp.consulteasy.web.rest.util.HeaderUtil;

@Controller
@RequestMapping("/api")
public class CompromissoResource {

    private final Logger log = LoggerFactory.getLogger(CompromissoResource.class);

    private CompromissoService compromissoService;

    public CompromissoResource(CompromissoService compromissoService) {
        this.compromissoService = compromissoService;
    }

    @GetMapping("/compromisso")
    public ResponseEntity<List<CompromissoDTO>> getAllCompromissos(Pageable pageable) {
        List<CompromissoDTO> lista = this.compromissoService.getCompromissos(pageable).map(CompromissoDTO::new).getContent();
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping("/compromisso/{idCompromisso}")
    public ResponseEntity<CompromissoDTO> getCompromisso(@PathVariable Long idCompromisso) {
        return new ResponseEntity<>(new CompromissoDTO(this.compromissoService.getCompromisso(idCompromisso)), HttpStatus.OK);
    }

    @PostMapping(path="/compromisso")
    @Timed
    public ResponseEntity<Compromisso> createCompromisso(@Valid @RequestBody CompromissoDTO compromissoDTO) throws URISyntaxException{
        log.debug("REST request to save Compromisso : {}", compromissoDTO);
        Compromisso compromisso = this.compromissoService.createCompromisso(compromissoDTO);
        return ResponseEntity.created(new URI("/api/compromisso/"+compromisso.getId()))
        .headers(HeaderUtil.createAlert("compromissoManagement.created", compromisso.getId().toString()))
        .body(compromisso);
    }

    @PutMapping("/compromisso")
    public ResponseEntity<CompromissoDTO> updateCompromisso(@Valid @RequestBody CompromissoDTO compromissoDTO){

        Optional<CompromissoDTO> updatedCompromisso = compromissoService.updateComprimisso(compromissoDTO)
        .map(CompromissoDTO::new);

        return ResponseUtil.wrapOrNotFound(updatedCompromisso, HeaderUtil.createAlert("compromissoManagement.updated", compromissoDTO.getId().toString()));
    }
}
