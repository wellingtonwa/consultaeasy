package xyz.friendscorp.consulteasy.service;

import java.time.ZoneId;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import xyz.friendscorp.consulteasy.domain.Paciente;
import xyz.friendscorp.consulteasy.repository.PacienteRepository;
import xyz.friendscorp.consulteasy.service.dto.PacienteDTO;

@Service
@Transactional
public class PacienteService {

    private PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    public Paciente createPaciente(PacienteDTO pacienteDto){
        Paciente paciente = new Paciente(null, pacienteDto.getNomeCompleto(), pacienteDto.getCpf(), pacienteDto.getDataNascimento().atStartOfDay(ZoneId.systemDefault()).toInstant());
        paciente = pacienteRepository.save(paciente);
        return paciente;
    }

    public Page<PacienteDTO> getAllPacientes(Pageable pageable){
        return pacienteRepository.findAll(pageable).map(PacienteDTO::new);
    }

    public PacienteDTO getPaciente(Long id){
        return new PacienteDTO(pacienteRepository.getOne(id));
    }

    public Optional<PacienteDTO> updatePaciente(PacienteDTO pacienteDTO) {
        return Optional.of(pacienteRepository.getOne(pacienteDTO.getId()))
            .map(paciente -> {
                paciente.setNome(pacienteDTO.getNome());
                paciente.setDataNascimento(pacienteDTO.getDataNascimento());
                return paciente;
            })
            .map(PacienteDTO::new);
    }
}
