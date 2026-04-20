package com.conceito.cadastros.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MatematicasServiceTest {

    @Test
    void somar_DoisMaisDois_Deve_RetornarQuatro() {
        MatematicasService math = new MatematicasService();

        double t = math.somar(2, 2);

        assertEquals(4.0, t, "Conta deu errado");

    }
}