package com.conceito.cadastros.service;

import com.conceito.cadastros.entities.Cliente;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.util.List;

class DadosCardServiceTest {
    List<Cliente> clientes;
    DadosCardService service;

    @BeforeEach
    void setup() {
        clientes = List.of(
            new Cliente(true, "Vagner", "vagers@email.com", "55222221111", "11788944950", LocalDate.now().minusYears(26),
                    "Machadista", false, LocalDate.now().minusYears(4), LocalDate.now().minusMonths(8)),
            new Cliente(true, "Richarlison", "richas@email.com", "55333331111", "12345678910", LocalDate.now().minusYears(23),
                    "Mimico de rua", true, LocalDate.now(), LocalDate.now())
        );
        service = new DadosCardService(clientes);
    }
    @Test
    @DisplayName("Total clientes deve ser 2")
    void testGetTotalClientes_DeveRetornarDois() {
        int total = service.getTotalClientes();

        assertEquals(2, total, () -> "A lista de clientes deve retornar 2!");
    }

    @Test
    @DisplayName("Idade média dos clientes deve ser 24.5")
    void testGetIdadeMedia_DeveRetornar_VinteEQuatroVirgulaCinco() {
        double idadeMedia = service.getIdadeMedia();

        assertEquals(24.5, idadeMedia, () -> "A idade média deve ser 24.5!");
    }

    @Test
    @DisplayName("A quantidade de novos clientes deve ser 1")
    void testGetNovosClientes_DeveRetornarUm() {
        int novosClientes = service.getNovosClientes();

        assertEquals(1, novosClientes , () -> "A quantidade de novos clientes deve ser 1!");
    }
}