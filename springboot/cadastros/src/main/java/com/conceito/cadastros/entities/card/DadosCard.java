package com.conceito.cadastros.entities.card;

import com.conceito.cadastros.entities.cliente.Cliente;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

public class DadosCard {
    int totalClientes;
    double idadeMedia;
    int novosClientes;

    public DadosCard(List<Cliente> listaCLientes) {
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
