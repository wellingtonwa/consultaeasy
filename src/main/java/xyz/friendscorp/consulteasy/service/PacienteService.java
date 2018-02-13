package xyz.friendscorp.consulteasy.service;

import java.time.ZoneId;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import xyz.friendscorp.consulteasy.domain.Contato;
import xyz.friendscorp.consulteasy.domain.Paciente;
import xyz.friendscorp.consulteasy.repository.ContatoRepository;
import xyz.friendscorp.consulteasy.repository.PacienteRepository;
import xyz.friendscorp.consulteasy.service.dto.PacienteDTO;

@Service
@Transactional
public class PacienteService {

    private PacienteRepository pacienteRepository;
    private ContatoRepository contatoRepository;
    private UserService userService;

    public PacienteService(PacienteRepository pacienteRepository, UserService userService) {
        this.pacienteRepository = pacienteRepository;
        this.userService = userService;
    }

    public Paciente createPaciente(PacienteDTO pacienteDto){
        Paciente paciente = new Paciente(null, pacienteDto.getNomeCompleto(), pacienteDto.getCpf(), pacienteDto.getDataNascimento().atStartOfDay(ZoneId.systemDefault()).toInstant(), userService.getUserWithAuthorities().get());
        paciente = pacienteRepository.save(paciente);
        return paciente;
    }

    public Page<PacienteDTO> getAllPacientes(Pageable pageable){
        return pacienteRepository.findAllByUser(pageable).map(PacienteDTO::new);
    }

    @Transactional
    public PacienteDTO getPaciente(Long id){
        return new PacienteDTO(pacienteRepository.getOne(id));
    }

    public Optional<PacienteDTO> updatePaciente(PacienteDTO pacienteDTO) {
        return Optional.of(pacienteRepository.getOne(pacienteDTO.getId()))
            .map(paciente -> {
                paciente.setNomeCompleto(pacienteDTO.getNomeCompleto());
                paciente.setDataNascimento(pacienteDTO.getDataNascimento());
                return paciente;
            })
            .map(PacienteDTO::new);
    }
    
    public Page<Contato> getContatos(Long idPaciente, Pageable pageable) {
        return contatoRepository.getContatosByIdPaciente(idPaciente, pageable);
    }
    
    public Optional<Contato> getContato(Long idContato, Long idPaciente) {
        return contatoRepository.getContato(idContato, idPaciente);
    }
    
}
