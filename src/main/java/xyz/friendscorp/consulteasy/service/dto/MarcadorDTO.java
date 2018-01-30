/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package xyz.friendscorp.consulteasy.service.dto;

import java.time.Instant;
import java.util.Objects;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import xyz.friendscorp.consulteasy.domain.Marcador;

/**
 *
 * @author wellington
 */
@Getter
@Setter
@AllArgsConstructor
public class MarcadorDTO {
    
    private Long id;
    @NotNull
    private String nome;
    private String cor;
    
    private String createdBy;
    private Instant createdDate;
    private String lastModifiedBy;
    private Instant lastModifiedDate;

    public MarcadorDTO() {
    }
    
    public MarcadorDTO(Marcador marcador){
        this.id = marcador.getId();
        this.nome = marcador.getNome();
        this.cor = marcador.getCor();
        this.createdBy = marcador.getCreatedBy();
        this.createdDate = marcador.getCreatedDate();
        this.lastModifiedBy = marcador.getLastModifiedBy();
        this.lastModifiedDate = marcador.getLastModifiedDate();
    }
    
    @Override
    public int hashCode() {
        int hash = 7;
        hash = 41 * hash + Objects.hashCode(this.nome);
        hash = 41 * hash + Objects.hashCode(this.cor);
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
        final MarcadorDTO other = (MarcadorDTO) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "MarcadorDTO{" + "id=" + id + ", nome=" + nome + ", cor=" + cor + ", createdBy=" + createdBy + ", createdDate=" + createdDate + ", lastModifiedBy=" + lastModifiedBy + ", lastModifiedDate=" + lastModifiedDate + '}';
    }
    
    
}
