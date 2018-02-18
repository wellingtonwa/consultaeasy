/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package xyz.friendscorp.consulteasy.domain;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**
 *
 * @author wellington
 */
@Entity
public class Contato extends AbstractAuditingEntity implements Serializable {
    
    private static final long serialVersionUID = 1l;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "codigo_area")
    private String codigoArea;
    @Column(nullable = false)
    private String contato;
    @Column(name = "tipo_contato", nullable = false)
    @Enumerated(EnumType.STRING)
    private EnumTipoContato tipoContato;
    @ManyToOne
    @JoinColumn(name = "id_paciente")
    @JsonBackReference
    private Paciente paciente;

    public Contato() {
    }

    public Contato(Long id, String codigoArea, String contato, EnumTipoContato tipoContato, Paciente paciente) {
        this.id = id;
        this.codigoArea = codigoArea;
        this.contato = contato;
        this.tipoContato = tipoContato;
        this.paciente = paciente;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoArea() {
        return codigoArea;
    }

    public void setCodigoArea(String codigoArea) {
        this.codigoArea = codigoArea;
    }

    public String getContato() {
        return contato;
    }

    public void setContato(String contato) {
        this.contato = contato;
    }

    public EnumTipoContato getTipoContato() {
        return tipoContato;
    }

    public void setTipoContato(EnumTipoContato tipoContato) {
        this.tipoContato = tipoContato;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 83 * hash + Objects.hashCode(this.codigoArea);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Contato other = (Contato) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }
    
    
}
