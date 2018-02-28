package xyz.friendscorp.consulteasy.service.dto;

import java.time.Instant;

import afu.org.checkerframework.checker.compilermsgs.qual.CompilerMessageKey;
import lombok.Getter;
import lombok.Setter;
import xyz.friendscorp.consulteasy.domain.Compromisso;

@Getter
@Setter
public class CompromissoDTO {

    private Long id;
    private String title;
    private String descricao;
    private Instant start;
    private Instant end;
    private String backgroundColor;

    public CompromissoDTO(Compromisso compromisso){
        this.id = compromisso.getId();
        this.title = compromisso.getTitulo();
        this.descricao = compromisso.getDescricao();
        this.start = compromisso.getInicio();
        this.end = compromisso.getTermino();
        if(compromisso.getMarcador() != null){
            this.backgroundColor = compromisso.getMarcador().getCor();
        }
    }
}