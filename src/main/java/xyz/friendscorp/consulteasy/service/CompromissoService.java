package xyz.friendscorp.consulteasy.service;

import java.time.ZoneId;
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
import xyz.friendscorp.consulteasy.service.dto.CompromissoDTO;

@Service
@Transactional
public class CompromissoService {

    private CompromissoRepository compromissoRepository;
    private PacienteRepository pacienteRepository;
    private MarcadorRepository marcadorRepository;
    private UserService userService;

    public CompromissoService(CompromissoRepository compromissoRepository, PacienteRepository pacienteRepository,
    MarcadorRepository marcadorRepository, 
    UserService userService) {
        this.compromissoRepository = compromissoRepository;;
        this.userService = userService;
        this.pacienteRepository = pacienteRepository;
        this.marcadorRepository = marcadorRepository;
    }
    
    public Compromisso getCompromissoFromDTO(CompromissoDTO compromissoDTO){
        Paciente paciente = null;
        Marcador marcador = null;
        if(compromissoDTO.getPaciente()!=null)
            paciente = pacienteRepository.getOne(compromissoDTO.getPaciente());
        if(compromissoDTO.getMarcador()!=null)
            marcador = marcadorRepository.getOne(compromissoDTO.getMarcador());
        User user = userService.getUserWithAuthorities().get();
        System.out.println(user);
        Compromisso compromisso = new Compromisso(compromissoDTO.getId()
        , compromissoDTO.getTitle(), compromissoDTO.getDescricao()
        , compromissoDTO.getStart().atZone(ZoneId.systemDefault()).toInstant()
        , compromissoDTO.getEndInstant()
        , compromissoDTO.getAllDay(), marcador
        , paciente, user);
        return compromisso;
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
                compromisso.setInicio(compromissoDTO.getStart().atZone(ZoneId.systemDefault()).toInstant());
                compromisso.setTermino(compromissoDTO.getEndInstant());
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
