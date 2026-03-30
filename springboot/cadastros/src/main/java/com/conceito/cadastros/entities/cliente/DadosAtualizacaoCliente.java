package com.conceito.cadastros.entities.cliente;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDate;

public record DadosAtualizacaoCliente(
        @NotNull
        Long id,

        String nome,

        String telefone,

        String profissao,

        LocalDate ultimaAtualizacao
) {
}
