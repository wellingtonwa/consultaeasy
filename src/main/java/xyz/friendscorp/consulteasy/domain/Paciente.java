package xyz.friendscorp.consulteasy.domain;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import lombok.EqualsAndHashCode;

import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
@EqualsAndHashCode
public class Paciente extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1l;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nome_completo", nullable=false)
    @NotNull
    private String nomeCompleto;
    private String cpf;
    @Column(name="data_nascimento")
    private Instant dataNascimento;
    
    public Paciente(){}

    public Paciente(Long id, String nomeCompleto, String cpf, Instant dataNascimento) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento.atStartOfDay(ZoneId.systemDefault()).toInstant();
    }

    @Override
    public String toString() {
        return "Paciente{" + "id=" + id + ", nomeCompleto=" + nomeCompleto + ", cpf=" + cpf + ", dataNascimento=" + dataNascimento + ", createBy=" + this.getCreatedBy() + '}';
    }
    
    
}