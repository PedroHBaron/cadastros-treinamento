package com.conceito.cadastros.service;

import com.conceito.cadastros.entities.Cliente;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

public class DadosCardService {
    int totalClientes;
    double idadeMedia;
    int novosClientes;

    public DadosCardService(List<Cliente> listaCLientes) {
        totalClientes = listaCLientes.size();
        idadeMedia = calcularIdadeMedia(listaCLientes);
        novosClientes = encontrarNovosClientes(listaCLientes);
    }

    private int encontrarNovosClientes(List<Cliente> lista) {
        LocalDate mesPassado = LocalDate.now().minusMonths(1);
        return lista.stream().filter(cliente -> cliente.getDataRegistro().isAfter(mesPassado))
                .toList().size();
    }

    private double calcularIdadeMedia(List<Cliente> lista) {
        LocalDate hoje = LocalDate.now();
        return lista.stream().filter(d -> d != null)
                .mapToInt(d -> Period.between(d.getDataNascimento(), hoje).getYears())
                .average()
                .orElse(0);
    }

    public int getNovosClientes() {
        return novosClientes;
    }

    public double getIdadeMedia() {
        return idadeMedia;
    }
    public int getTotalClientes() {return totalClientes;}

}
