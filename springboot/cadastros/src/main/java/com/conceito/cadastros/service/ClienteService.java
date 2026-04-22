package com.conceito.cadastros.service;

import com.conceito.cadastros.dto.DadosAtualizacaoCliente;
import com.conceito.cadastros.dto.DadosCliente;
import com.conceito.cadastros.dto.DadosListagemCliente;
import com.conceito.cadastros.entities.Cliente;
import com.conceito.cadastros.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    public Page<DadosListagemCliente> listar(@RequestParam(required = false) String nome,
                                             @RequestParam(required = false) String cpf,
                                             @RequestParam(required = false) String email,
                                             @RequestParam(required = false) String telefone,
                                             @RequestParam(required = false) String profissao,
                                             @RequestParam(required = false) LocalDate dataRegistro,
                                             Pageable pageable) {

        Specification<Cliente> spec = (root, query, cb) -> cb.conjunction();

        spec = spec.and((root, query, cb) ->
                cb.isTrue(root.get("ativo"))
        );
        if (nome != null && !nome.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("nome")), "%" + nome.toLowerCase() + "%"));
        }
        if (cpf != null && !cpf.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("cpf"), cpf)
            );
        }
        if (email != null && !email.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("email")), "%" + email.toLowerCase() + "%"));
        }
        if (telefone != null && !telefone.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("telefone")), "%" + telefone + "%"));
        }
        if (profissao != null && !profissao.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("profissao")), "%" + profissao.toLowerCase() + "%"));
        }
        if (dataRegistro != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("dataRegistro"), dataRegistro)
            );
        }

        return repository.findAll(spec, pageable).map(DadosListagemCliente::new);
    }

    public DadosCardService gerarCards() {
        List<Cliente> clientesAtivos = repository.findAllByAtivoTrue();
        return new DadosCardService(clientesAtivos);
    }

    public DadosListagemCliente listarUnico(Long id) {
        return new DadosListagemCliente(repository.getReferenceById(id));
    }

    public DadosCliente atualizar(Long id, DadosAtualizacaoCliente dados) {
        var cliente = repository.getReferenceById(id);
        cliente.atualizarInformacoes(dados);
        return new DadosCliente(cliente);
    }

    public void excluir(Long id) {
        var cliente = repository.getReferenceById(id);
        cliente.excluir();
    }
}
