package com.conceito.cadastros.entities.cliente;

import com.conceito.cadastros.dto.DadosAtualizacaoCliente;
import com.conceito.cadastros.dto.DadosCliente;
import jakarta.persistence.*;

import java.time.LocalDate;

@Table(name = "clientes")
@Entity(name = "Cliente")
public class Cliente {

    public Cliente(DadosCliente dados) {
        this.ativo = true;
        this.nome = dados.nome();
        this.email = dados.email();
        this.telefone = dados.telefone();
        this.cpf = dados.cpf();
        this.dataNascimento = dados.dataNascimento();
        this.profissao = dados.profissao();
        this.termos = dados.termos();
        this.dataRegistro = dados.dataRegistro();
        this.ultimaAtualizacao = dados.ultimaAtualizacao();
    }

    protected Cliente(){}

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    private String telefone;
    private String cpf;
    private Boolean ativo;
    private LocalDate dataNascimento;
    private String profissao;
    private Boolean termos;
    private LocalDate dataRegistro;
    private LocalDate ultimaAtualizacao;

    public Long getId() {
        return this.id;
    }
    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getCpf() {
        return cpf;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public String getProfissao() {
        return profissao;
    }

    public Boolean getTermos() {
        return termos;
    }

    public LocalDate getDataRegistro() {
        return dataRegistro;
    }

    public LocalDate getUltimaAtualizacao() {
        return ultimaAtualizacao;
    }

    public void excluir() {
        this.ativo = false;
    }

    public void atualizarInformacoes(DadosAtualizacaoCliente dados) {
        if (dados.nome() != null) {
            this.nome = dados.nome();
        }
        if (dados.telefone() != null) {
            this.telefone = dados.telefone();
        }
        if (dados.profissao() != null) {
            this.profissao = dados.profissao();
        }

        this.ultimaAtualizacao = dados.ultimaAtualizacao();
    }
}
