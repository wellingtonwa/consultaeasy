package xyz.friendscorp.consulteasy.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
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
        return (Compromisso) compromissoRepository.save(this.getCompromissoFromDTO(compromissoDTO));
    }

    public Page<Compromisso> getCompromissos(Pageable pageable) {
        return compromissoRepository.getCompromissosByCurrentUser(pageable);
    }

    public Optional<Compromisso> updateComprimisso(CompromissoDTO compromissoDTO){
        System.out.println(">>>>>> " + compromissoDTO);
        return Optional.of(compromissoRepository.getOne(compromissoDTO.getId()))
            .map(compromisso -> {
                compromisso.setTitulo(compromissoDTO.getTitle());
                compromisso.setInicio(compromissoDTO.getStartInstant());
                compromisso.setTermino(compromissoDTO.getEndInstant());
                compromisso.setDescricao(compromissoDTO.getDescricao());
                compromisso.setDiaTodo(compromissoDTO.getAllDay());
                if(compromissoDTO.getMarcador()!=null){
                    compromisso.setMarcador(marcadorRepository.getOne(compromissoDTO.getMarcador()));
                }
                if(compromissoDTO.getPaciente()!=null && compromissoDTO.getPaciente()>0L){
                    compromisso.setPaciente(pacienteRepository.getOne(compromissoDTO.getPaciente()));
                } else if(compromissoDTO.getPaciente()!=null && compromissoDTO.getPaciente()==0L){
                    compromisso.setPaciente(null);
                }
                return compromisso;
            });
    }

    public Compromisso getCompromisso(Long idCompromisso){
        return compromissoRepository.getOne(idCompromisso);
    }

    public Boolean deleteCompromisso(Long id){
        Optional<Compromisso> opCompromisso = compromissoRepository.getCompromissoByCurrentUser(id);
        if(opCompromisso.isPresent()){
            compromissoRepository.delete(opCompromisso.get());
            return true;
        }
        return false;
    }

    public Page<Compromisso> getCompromissosByDataInicio(Pageable pageable, Instant dataInicio) {
        Instant dataHoraInicio = LocalDateTime.ofInstant(dataInicio, ZoneOffset.ofHours(0))
            .withHour(0).withMinute(0).withSecond(0).atZone(ZoneOffset.ofHours(0)).toInstant();
        Instant dataHoraFim = LocalDateTime.ofInstant(dataInicio, ZoneOffset.ofHours(0))
            .withHour(23).withMinute(59).withSecond(59).atZone(ZoneOffset.ofHours(0)).toInstant();
        System.out.println(dataHoraInicio);
        System.out.println(dataHoraFim);
        return compromissoRepository.getCompromissosByDataInicio(pageable, dataHoraInicio, dataHoraFim);
    }

}
