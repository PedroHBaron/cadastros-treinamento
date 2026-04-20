package com.conceito.cadastros.controllers;

import com.conceito.cadastros.dto.DadosAtualizacaoCliente;
import com.conceito.cadastros.dto.DadosCliente;
import com.conceito.cadastros.dto.DadosListagemCliente;
import com.conceito.cadastros.entities.Cliente;
import com.conceito.cadastros.service.DadosCard;
import com.conceito.cadastros.repositories.ClienteRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping ("clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository repository;

    @PostMapping
    @Transactional
    public ResponseEntity<DadosCliente> cadastrar(@RequestBody @Valid DadosCliente dados, UriComponentsBuilder uriBuilder) {
        var cliente = new Cliente(dados);
        repository.save(cliente);

        var uri = uriBuilder.path("/clientes/{id}").buildAndExpand(cliente.getId()).toUri();

        return ResponseEntity.created(uri).body(new DadosCliente(cliente));
    }

    // Métodos GET -----------------------

    @GetMapping
    public ResponseEntity<Page<DadosListagemCliente>> listar(
            @RequestParam(required = false) String nome,
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

        if (nome != null) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("nome")), "%" + nome.toLowerCase() + "%"));
        }
        if (cpf != null && !cpf.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("cpf"), cpf)
            );
        }

        if (email != null) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("email")), "%" + email.toLowerCase() + "%"));
        }

        if (telefone != null) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("telefone")), "%" + telefone + "%"));
        }

        if (profissao != null) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("profissao")), "%" + profissao.toLowerCase() + "%"));
        }

        if (dataRegistro != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("dataRegistro"), dataRegistro)
            );
        }

        Page<DadosListagemCliente> clientes = repository.findAll(spec, pageable).map(DadosListagemCliente::new);
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/cards")
    public ResponseEntity<DadosCard> gerarCards() {
        List<Cliente> clientesAtivos = repository.findAllByAtivoTrue();
        DadosCard cards = new DadosCard(clientesAtivos);
        return ResponseEntity.ok(cards);
    }

    @GetMapping("/buscarporid/{id}")
    public ResponseEntity<DadosListagemCliente> listarUnico(@PathVariable Long id) {
        Cliente cliente = repository.getReferenceById(id);
        return ResponseEntity.ok(new DadosListagemCliente(cliente));
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<DadosCliente> atualizar(@PathVariable Long id, @RequestBody DadosAtualizacaoCliente dados) {
        var cliente = repository.getReferenceById(id);
        cliente.atualizarInformacoes(dados);
        return ResponseEntity.ok(new DadosCliente(cliente));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<ResponseBody> excluir(@PathVariable Long id) {
        var cliente = repository.getReferenceById(id);
        cliente.excluir();
        return ResponseEntity.noContent().build();
    }

}

