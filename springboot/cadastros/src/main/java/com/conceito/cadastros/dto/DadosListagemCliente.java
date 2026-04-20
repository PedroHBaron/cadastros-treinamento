package com.conceito.cadastros.dto;

import com.conceito.cadastros.entities.Cliente;

import java.time.LocalDate;

public record DadosListagemCliente(
        Long id,

        String cpf,

        String nome,

        String email,

        String telefone,

        String profissao,

        LocalDate dataRegistro,

        LocalDate dataNascimento
) {
    public DadosListagemCliente(Cliente cliente) {
        this(cliente.getId(), cliente.getCpf(), cliente.getNome(), cliente.getEmail(), cliente.getTelefone(), cliente.getProfissao(),
                cliente.getDataRegistro(), cliente.getDataNascimento());
    }
}