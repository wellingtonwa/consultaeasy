package xyz.friendscorp.consulteasy.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
    
    @ManyToOne(optional = false)
    @JoinColumn(name = "id_user")
    @JsonBackReference
    private User user;
    
    @OneToMany(mappedBy = "paciente", orphanRemoval = true)
    private Set<Contato> contatos = new HashSet<>();
    
    
    public Paciente(){}

    public Paciente(Long id, String nomeCompleto, String cpf, Instant dataNascimento, User user) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.user = user;
    }

    
    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento.atStartOfDay(ZoneId.systemDefault()).toInstant();
    }
    
    
}