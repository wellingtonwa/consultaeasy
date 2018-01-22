package xyz.friendscorp.consulteasy.service.dto;


import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.ZoneId;

import xyz.friendscorp.consulteasy.domain.Paciente;

public class PacienteDTO {

    private Long id;
    private String nomeCompleto;
    private String cpf;
    @DateTimeFormat(pattern = "yyyy-MM-dd", iso = DateTimeFormat.ISO.DATE)
    private LocalDate dataNascimento;

    public PacienteDTO() {
    }

    public PacienteDTO(Paciente p) {
        this.id = p.getId();
        this.nomeCompleto = p.getNomeCompleto();
        this.cpf = p.getCpf();
        this.dataNascimento = p.getDataNascimento().atZone(ZoneId.systemDefault()).toLocalDate();
    }

    public PacienteDTO(Long id, String nomeCompleto, String cpf, LocalDate dataNascimento) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
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