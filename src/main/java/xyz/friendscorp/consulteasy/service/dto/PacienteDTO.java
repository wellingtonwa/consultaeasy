package xyz.friendscorp.consulteasy.service.dto;


import java.time.Instant;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.ZoneId;
import lombok.AllArgsConstructor;

import xyz.friendscorp.consulteasy.domain.Paciente;

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
        this.createdBy = p.getCreatedBy();
        this.createdDate = p.getCreatedDate();
        this.lastModifiedBy = p.getLastModifiedBy();
        this.lastModifiedDate = p.getLastModifiedDate();
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }
    
    public Instant getDataNascimentoInstant() {
        return dataNascimento.atStartOfDay(ZoneId.systemDefault()).toInstant();
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

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    @Override
    public String toString() {
        return "PacienteDTO{" + "id=" + id + ", nomeCompleto=" + nomeCompleto + ", cpf=" + cpf + ", dataNascimento=" + dataNascimento + ", createdBy=" + createdBy + ", createdDate=" + createdDate + ", lastModifiedBy=" + lastModifiedBy + ", lastModifiedDate=" + lastModifiedDate + '}';
    }

    
}