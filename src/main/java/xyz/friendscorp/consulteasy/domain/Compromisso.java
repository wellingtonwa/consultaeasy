package xyz.friendscorp.consulteasy.domain;

import java.io.Serializable;
import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@EqualsAndHashCode
public class Compromisso extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1l;

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @Column(nullable=false)
    private String titulo;
    private String descricao;
    private Instant inicio;
    private Instant termino;
    @Column(name="dia_todo")
    private Boolean diaTodo = false;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name="id_marcador")
    private Marcador marcador;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name="id_paciente")
    private Paciente paciente;
    @ManyToOne(optional = false)
    @JoinColumn(name="id_user")
    @JsonBackReference
    private User user;

    public Compromisso(){}

    public Compromisso(Long id, String titulo, String descricao, Instant inicio, Instant termino, Boolean diaTodo, Marcador marcador, Paciente paciente, User user){
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.inicio = inicio;
        this.termino = termino;
        this.diaTodo = diaTodo;
        this.marcador = marcador;
        this.paciente = paciente;
        this.user = user;
    }
}