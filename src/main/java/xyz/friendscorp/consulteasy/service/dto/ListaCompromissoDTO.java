package xyz.friendscorp.consulteasy.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;
import xyz.friendscorp.consulteasy.domain.Compromisso;

import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@AllArgsConstructor
@Data
@ToString
public class ListaCompromissoDTO {

    private Long id;
    @NotNull
    private String title;
    private Boolean allDay;
    private String descricao;
    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm", iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime start;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm", iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime end;
    private String backgroundColor;
    private PacienteDTO paciente;
    private Long user;
    private MarcadorDTO marcador;

    public ListaCompromissoDTO(){}

    public ListaCompromissoDTO(Compromisso compromisso){
        this.id = compromisso.getId();
        this.title = compromisso.getTitulo();
        this.descricao = compromisso.getDescricao();
        this.allDay = compromisso.getDiaTodo();
        if (compromisso.getInicio()!=null)
        this.start = compromisso.getInicio().atZone(ZoneId.systemDefault()).toLocalDateTime();
        if (compromisso.getTermino()!=null)
        this.end = compromisso.getTermino().atZone(ZoneId.systemDefault()).toLocalDateTime();
        this.user = compromisso.getUser().getId();
        if (compromisso.getMarcador() != null) {
            this.marcador = new MarcadorDTO(compromisso.getMarcador());
            this.backgroundColor = "#"+compromisso.getMarcador().getCor();
        }
        if (compromisso.getPaciente() != null) {
            this.paciente = new PacienteDTO(compromisso.getPaciente());
        }
    }

    public LocalDateTime getStart() {
        return start;
    }

    public Instant getStartInstant() {
        return start.atZone(ZoneId.systemDefault()).toInstant();
    }

    public void setStart(LocalDateTime start) {
        this.start = start;
    }

    public LocalDateTime getEnd() {
        return end;
    }

    public Instant getEndInstant() {
        if(this.end!=null)
            return end.atZone(ZoneId.systemDefault()).toInstant();
        else
            return null;
    }

}
