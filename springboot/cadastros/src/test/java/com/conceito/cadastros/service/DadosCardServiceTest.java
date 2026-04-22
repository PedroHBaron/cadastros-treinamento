package com.conceito.cadastros.service;

import com.conceito.cadastros.entities.Cliente;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class DadosCardTest {
    List<Cliente> clientes = List.of(
        new Cliente(true, "Vagner", "vagers@email.com", "55222221111", "11788944950", "2000-02-20", "Machadista", false, "2020-05-30", "2022-08-14")
    );
    @BeforeEach
    void setup() {

    }
    @Test
    void getNovosClientes() {
    }

    @Test
    void getIdadeMedia() {
    }

    @Test
    void getTotalClientes() {
    }
}