package xyz.friendscorp.consulteasy.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import xyz.friendscorp.consulteasy.domain.Compromisso;
import xyz.friendscorp.consulteasy.domain.Marcador;
import xyz.friendscorp.consulteasy.domain.Paciente;
import xyz.friendscorp.consulteasy.domain.User;
import xyz.friendscorp.consulteasy.repository.CompromissoRepository;
import xyz.friendscorp.consulteasy.repository.MarcadorRepository;
import xyz.friendscorp.consulteasy.repository.PacienteRepository;
import xyz.friendscorp.consulteasy.repository.UserRepository;
import xyz.friendscorp.consulteasy.service.dto.CompromissoDTO;
import xyz.friendscorp.consulteasy.service.dto.MarcadorDTO;

@Service
@Transactional
public class CompromissoService {

    private CompromissoRepository compromissoRepository;
    private PacienteRepository pacienteRepository;
    private MarcadorRepository marcadorRepository;
    private UserRepository userRepository;
    
    public Compromisso getCompromissoFromDTO(CompromissoDTO compromissoDTO){
        Paciente paciente = pacienteRepository.getOne(compromissoDTO.getPaciente());
        Marcador marcador = marcadorRepository.getOne(compromissoDTO.getMarcador());
        User user = userRepository.getOne(compromissoDTO.getUser());
        Compromisso compromisso = new Compromisso(compromissoDTO.getId()
        , compromissoDTO.getTitle(), compromissoDTO.getDescricao()
        , compromissoDTO.getStart(), compromissoDTO.getEnd()
        , compromissoDTO.getAllDay(), marcador
        , paciente, user);
        return compromisso;
    }
    
    public CompromissoService(CompromissoRepository compromissoRepository, PacienteRepository pacienteRepository,
    MarcadorRepository marcadorRepository, UserRepository userRepository) {
        this.compromissoRepository = compromissoRepository;;
        this.userRepository = userRepository;
        this.pacienteRepository = pacienteRepository;
        this.marcadorRepository = marcadorRepository;
    }
    
    public Compromisso createCompromisso(CompromissoDTO compromissoDTO){
        return (Compromisso) this.compromissoRepository.save(this.getCompromissoFromDTO(compromissoDTO));
    }

    public Page<Compromisso> getCompromissos(Pageable pageable) {
        return this.compromissoRepository.getAllCompromissos(pageable);
    }

    public Optional<Compromisso> updateComprimisso(CompromissoDTO compromissoDTO){
        return Optional.of(compromissoRepository.getOne(compromissoDTO.getId()))
            .map(compromisso -> {
                compromisso.setTitulo(compromissoDTO.getTitle());
                compromisso.setInicio(compromissoDTO.getStart());
                compromisso.setTermino(compromissoDTO.getEnd());
                compromisso.setDescricao(compromissoDTO.getDescricao());
                compromisso.setDiaTodo(compromissoDTO.getAllDay());
                if(compromissoDTO.getMarcador()!=null){
                    compromisso.setMarcador(marcadorRepository.getOne(compromissoDTO.getMarcador()));
                }
                if(compromissoDTO.getPaciente()!=null){
                    compromisso.setPaciente(pacienteRepository.getOne(compromissoDTO.getPaciente()));
                }
                return compromisso;
            });
    }

}