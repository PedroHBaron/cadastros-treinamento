package com.conceito.cadastros.dto;

import com.conceito.cadastros.entities.Cliente;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDate;

public record DadosCliente(
        @NotBlank
        String nome,
        @NotBlank
        @Email
        String email,

        @NotNull
        String telefone,

        @NotBlank(message = "CPF não pode ser vazio")
        @CPF(message = "CPF inválido!")
        String cpf,

        @NotNull
        LocalDate dataNascimento,
        @NotNull
        String profissao,

        @NotNull
        Boolean termos,

        LocalDate dataRegistro,
        LocalDate ultimaAtualizacao
        ) {
    public DadosCliente(Cliente cliente) {
        this(cliente.getNome(), cliente.getEmail(), cliente.getTelefone(), cliente.getCpf(),
                cliente.getDataNascimento(), cliente.getProfissao(), cliente.getTermos(),
                cliente.getDataRegistro(), cliente.getUltimaAtualizacao());
    }
}
