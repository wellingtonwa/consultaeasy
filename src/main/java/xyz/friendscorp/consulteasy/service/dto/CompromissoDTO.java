package xyz.friendscorp.consulteasy.service.dto;

import java.time.Instant;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.ToString;
import xyz.friendscorp.consulteasy.domain.Compromisso;

@AllArgsConstructor
@ToString
public class CompromissoDTO {

    private Long id;
    @NotNull
    private String title;
    private Boolean allDay;
    private String descricao;
    private Instant start;
    private Instant end;
    private String backgroundColor;
    private Long paciente;
    private Long user;
    private Long marcador;

    public CompromissoDTO(){}

    public CompromissoDTO(Compromisso compromisso){
        this.id = compromisso.getId();
        this.title = compromisso.getTitulo();
        this.descricao = compromisso.getDescricao();
        this.allDay = compromisso.getDiaTodo();
        this.start = compromisso.getInicio();
        this.end = compromisso.getTermino();
        this.user = compromisso.getUser().getId();
        if (compromisso.getMarcador() != null) {
            this.marcador = compromisso.getMarcador().getId();
            this.backgroundColor = compromisso.getMarcador().getCor();
        }
        if (compromisso.getPaciente() != null) {
            this.paciente = compromisso.getPaciente().getId();
            this.title += compromisso.getPaciente().getNomeCompleto();
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getAllDay() {
        return allDay;
    }

    public void setAllDay(Boolean allDay) {
        this.allDay = allDay;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Instant getStart() {
        return start;
    }

    public void setStart(Instant start) {
        this.start = start;
    }

    public Instant getEnd() {
        return end;
    }

    public void setEnd(Instant end) {
        this.end = end;
    }

    public String getBackgroundColor() {
        return backgroundColor;
    }

    public void setBackgroundColor(String backgroundColor) {
        this.backgroundColor = backgroundColor;
    }

    public Long getPaciente() {
        return paciente;
    }

    public void setPaciente(Long paciente) {
        this.paciente = paciente;
    }

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public Long getMarcador() {
        return marcador;
    }

    public void setMarcador(Long marcador) {
        this.marcador = marcador;
    }

}
