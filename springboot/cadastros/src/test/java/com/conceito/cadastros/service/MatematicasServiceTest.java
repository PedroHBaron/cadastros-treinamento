package com.conceito.cadastros.service;

import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;

class MatematicasServiceTest {
    @BeforeAll
    static void comecar() {
        System.out.println("Estartou");
    }

    MatematicasService math;

    @BeforeEach
    void beach(){
        math = new MatematicasService();
        System.out.println("Começando o teste");
    }

    @AfterEach
    void aeach() {
        System.out.println("Terminando o teste");
    }

    @AfterAll
    static void fim() {
        System.out.println("Cabou");
    }



    @Test
    @DisplayName("Test: 2 + 2 = 4")
    void somar_DoisMaisDois_Deve_RetornarQuatro() {

        double t = math.somar(2, 2);

        assertEquals(4.0, t, () -> "2 + 2 precisa ser 4");
    }

    @Test
    @DisplayName("Test: 4 - 2 = 2")
    void subtrair_QuatroMenosDois_Deve_RetornarDois() {

        double t = math.subtrair(4, 2);

        assertEquals(2.0, t, () -> "4 - 2 precisa ser 2!");
    }

    @Test
    @DisplayName("Test: 3 * 3 = 9")
    void multiplicar_TresVezesTres_Deve_RetornarNove() {
        double t = math.multiplicar(3, 3);

        assertEquals(9.0, t, () -> "3 * 3 precisa ser 9!");
    }

    @Test
    @DisplayName("Test: 16 / 8 = 2")
    void dividir_DezesseisPorOito_Deve_RetornarDois() {

        double t = math.dividir(16, 8);

        assertEquals(2.0, t, () -> "8 / 16 precisa ser 2!");
    }

    @Test
    @DisplayName("Test: Divisão por zero")
    void dividirPorZero_Deve_RetornarException() {
        assertThrows(ArithmeticException.class, () -> math.dividir(2, 0), () -> "Divisão por zero deve retornar uma exception");
    }

    @Test
    @DisplayName("Test: média de [1,2,3,4,5] = 3")
    void mediaDe_1_2_3_4_5_DeveSer3() {

        double[] lista = new double[] {1,2,3,4,5};

        double media = math.media(lista);

        assertEquals(3.0, media, () -> "A média da lista [1,2,3,4,5] deve ser 3!");
    }

    @Test
    @DisplayName("Test: Lista vazia para média")
    void mediaDe_ListaVazia_DeveRetornarExeception() {
        assertThrows(ArithmeticException.class, () -> math.media(new double[]{}), () -> "Média de lista vazia deve retornar uma exception!");
    }
}