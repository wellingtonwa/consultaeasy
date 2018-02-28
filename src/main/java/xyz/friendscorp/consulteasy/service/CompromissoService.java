package xyz.friendscorp.consulteasy.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import xyz.friendscorp.consulteasy.domain.Compromisso;
import xyz.friendscorp.consulteasy.repository.CompromissoRepository;

@Service
@Transactional
public class CompromissoService {

    private CompromissoRepository compromissoRepository;

    public void createCompromisso(Compromisso compromisso){

    }
}