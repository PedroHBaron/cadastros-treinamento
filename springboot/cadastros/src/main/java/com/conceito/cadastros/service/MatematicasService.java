package com.conceito.cadastros.service;

import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class MatematicasService {
    public double somar(double a, double b) {
        return a + b;
    }
    public double subtrair(double a, double b) {
        return a - b;
    }
    public double multiplicar(double a, double b) {
        return a * b;
    }
    public double dividir(double a, double b) {
        if (b == 0) {
            throw new ArithmeticException("Divisão por zero!");
        }
        return a / b;
    }
    public double media(double[] a) {
        if(a.length == 0) {
            throw new ArithmeticException("Lista para média está vazia!");
        }
        return Arrays.stream(a).average().orElseThrow();
    }
}
