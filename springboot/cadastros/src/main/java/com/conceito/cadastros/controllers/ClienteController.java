package com.conceito.cadastros.controllers;

import com.conceito.cadastros.entities.cliente.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

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

    @GetMapping
    public ResponseEntity<List<DadosListagemCliente>> listar() {
        var clientes = repository.findAllByAtivoTrue().stream().map(DadosListagemCliente::new).toList();
        return ResponseEntity.ok(clientes);
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

