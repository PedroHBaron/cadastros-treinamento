import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { Repository } from 'typeorm';
import { CriaClienteDTO } from './dto/criaCliente.dto';
import { AtualizaClienteDTO } from './dto/atualizaCliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clientesRepository: Repository<Cliente>,
  ) {}

  async listarClientes() {
    const clientes = await this.clientesRepository.find();
    return clientes;
  }

  async clienteCPF(cpf) {
    return (await this.clientesRepository.find()).filter(
      (c) => c.cpf === cpf,
    )[0];
  }

  async editarCliente(cpf: string, dados: AtualizaClienteDTO) {
    await this.clientesRepository.update(cpf, dados);
  }

  async deletarCliente(cpf: string) {
    console.log(cpf);
    await this.clientesRepository.delete(cpf);
  }

  async cadastrarCliente(dados: CriaClienteDTO) {
    const cliente = new Cliente();
    cliente.cpf = dados.cpf;
    cliente.data_nascimento = dados.data_nascimento;
    cliente.data_registro = dados.data_registro;
    cliente.email = dados.email;
    cliente.nome = dados.nome;
    cliente.profissao = dados.profissao;
    cliente.telefone = dados.telefone;
    cliente.termos = dados.termos;
    cliente.ultimaAtualizacao = dados.ultimaAtualizacao;

    await this.clientesRepository.save(cliente);
  }

  async verificarCPFUnico(cpf: string): Promise<boolean> {
    const clienteLista = this.clientesRepository.find();
    const cpfachado = (await clienteLista).filter((c) => c.cpf === cpf);

    return cpfachado[0] === undefined;
  }

  async verificarCPF(cpf: string): Promise<boolean> {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) return false;

    if (/^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
  }
}
