package xyz.friendscorp.consulteasy.service.dto;


import java.time.Instant;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.ZoneId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import xyz.friendscorp.consulteasy.domain.Paciente;

@Getter
@Setter
@AllArgsConstructor
public class PacienteDTO {

    private Long id;
    private String nomeCompleto;
    private String cpf;
    @DateTimeFormat(pattern = "yyyy-MM-dd", iso = DateTimeFormat.ISO.DATE)
    private LocalDate dataNascimento;
    private String createdBy;
    private Instant createdDate;
    private String lastModifiedBy;
    private Instant lastModifiedDate;
    
    public PacienteDTO() {
    }

    public PacienteDTO(Paciente p) {
        this.id = p.getId();
        this.nomeCompleto = p.getNomeCompleto();
        this.cpf = p.getCpf();
        this.dataNascimento = p.getDataNascimento().atZone(ZoneId.systemDefault()).toLocalDate();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    
    
}