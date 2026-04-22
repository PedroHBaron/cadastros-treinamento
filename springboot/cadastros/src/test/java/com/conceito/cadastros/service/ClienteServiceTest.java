package com.conceito.cadastros.service;

import com.conceito.cadastros.dto.DadosListagemCliente;
import com.conceito.cadastros.entities.Cliente;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ClienteServiceTest {
    List<DadosListagemCliente> clientes;

    @BeforeEach
    void setup() {
        clientes = List.of(
                new DadosListagemCliente(1L, "55222221111", "Vagner", "vagers@email.com",  "4999999999", "Machadista",
                        LocalDate.now().minusYears(4), LocalDate.now().minusYears(26)),
                new DadosListagemCliente(2L, "44222221111", "Lourdes", "lourdess@email.com",  "3999999999", "Machadeira",
                        LocalDate.now().minusYears(4), LocalDate.now().minusYears(56)),
                new DadosListagemCliente(3L, "33222221111", "Montexan", "montexan@email.com",  "2999999999", "Machadólogo",
                        LocalDate.now().minusYears(4), LocalDate.now().minusYears(16)),
                new DadosListagemCliente(4L, "22222221111", "Victor", "vetor@email.com",  "1999999999", "Machamenteiro",
                        LocalDate.now().minusYears(4), LocalDate.now().minusYears(36)),
                new DadosListagemCliente(5L, "11222221111", "Nounjuck", "labilis@email.com",  "0999999999", "Analista de machados",
                        LocalDate.now().minusYears(4), LocalDate.now().minusYears(96))
        );
    }
    @Test
    void listar() {
    }
}