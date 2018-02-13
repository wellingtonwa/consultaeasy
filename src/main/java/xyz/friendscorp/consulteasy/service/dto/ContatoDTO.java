/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package xyz.friendscorp.consulteasy.service.dto;

import java.time.Instant;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import xyz.friendscorp.consulteasy.domain.Contato;

/**
 *
 * @author wellington
 */
@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
public class ContatoDTO {
    
    private Long id;
    private String codigoArea;
    @NotNull
    private String contato;
    @NotNull
    private String tipoContato;
    private Long idPaciente;
    
    private String createdBy;
    private Instant createdDate;
    private String lastModifiedBy;
    private Instant lastModifiedDate;

    public ContatoDTO() {
    }

    public ContatoDTO(Contato contato) {
        this.codigoArea = contato.getCodigoArea();
        this.contato = contato.getContato();
        this.createdBy = contato.getCreatedBy();
        this.createdDate = contato.getCreatedDate();
        this.id = contato.getId();
        this.lastModifiedBy = contato.getLastModifiedBy();
        this.lastModifiedDate = contato.getLastModifiedDate();
        this.tipoContato = contato.getTipoContato().toString();
        this.idPaciente = contato.getPaciente().getId();
    }

    @Override
    public String toString() {
        return "ContatoDTO{" + "id=" + id + ", codigoArea=" + codigoArea + ", contato=" + contato + ", tipoContato=" + tipoContato + ", idPaciente=" + idPaciente + ", createdBy=" + createdBy + ", createdDate=" + createdDate + ", lastModifiedBy=" + lastModifiedBy + ", lastModifiedDate=" + lastModifiedDate + '}';
    }
    
}
