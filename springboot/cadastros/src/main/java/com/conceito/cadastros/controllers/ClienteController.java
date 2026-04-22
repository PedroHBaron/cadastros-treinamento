package com.conceito.cadastros.controllers;

import com.conceito.cadastros.dto.DadosAtualizacaoCliente;
import com.conceito.cadastros.dto.DadosCliente;
import com.conceito.cadastros.dto.DadosListagemCliente;
import com.conceito.cadastros.entities.Cliente;
import com.conceito.cadastros.service.ClienteService;
import com.conceito.cadastros.service.DadosCardService;
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

    @Autowired
    private ClienteService service;

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

        return ResponseEntity.ok(service.listar(nome, cpf, email, telefone, profissao, dataRegistro, pageable));
    }

    @GetMapping("/cards")
    public ResponseEntity<DadosCardService> gerarCards() {
        return ResponseEntity.ok(service.gerarCards());
    }

    @GetMapping("/buscarporid/{id}")
    public ResponseEntity<DadosListagemCliente> listarUnico(@PathVariable Long id) {
        return ResponseEntity.ok(service.listarUnico(id));
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<DadosCliente> atualizar(@PathVariable Long id, @RequestBody DadosAtualizacaoCliente dados) {
        return ResponseEntity.ok(service.atualizar(id, dados));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<ResponseBody> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }

}

