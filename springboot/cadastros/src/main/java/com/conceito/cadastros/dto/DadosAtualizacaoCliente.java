package com.conceito.cadastros.dto;

import jakarta.validation.constraints.NotNull;

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
