import { Component, computed, signal } from '@angular/core';
import { Cliente } from '../cliente';
import { FiltrosComponent } from './filtros/filtros.component';
import { ActivatedRoute, Router } from '@angular/router';

import { CardsComponent } from './cards/cards.component';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-registros',
  standalone: true,
  imports: [FiltrosComponent, CardsComponent],
  templateUrl: './registros.component.html',
  styleUrl: './registros.component.css',
})
export class RegistrosComponent {
  clientes: Cliente[] = [];

  totalCLiente = 0;
  clientesNovos = 0;
  idadeMedia = 0;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private clienteService: ClienteService,
  ) {}

  ngOnInit() {
    this.relistarClientes();
  }

  relistarClientes() {
    this.clienteService.listar().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
      this.totalCLiente = clientes.length;
      this.idadeMedia = this.calcularIdadeMediaClientes();
      this.clientesNovos = this.calcularNovosClientes();
    });
  }

  calcularIdadeMediaClientes() {
    const idades = this.clientes.reduce((a, cliente) => {
      return a + this.calcularIdade(cliente.data_nascimento);
    }, 0);

    //Evitar divisão por zero
    if (this.clientes.length <= 0) {
      return 0;
    } else {
      return idades / this.clientes.length;
    }
  }

  calcularIdade(dataNascimento: string): number {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  }

  calcularNovosClientes() {
    const hoje = new Date();
    const novosClientes = this.clientes.reduce((a, cliente) => {
      let registro = new Date(cliente.data_registro);
      //                                         mili   seg  min  h   dia
      if (hoje.getTime() - registro.getTime() <= 1000 * 60 * 60 * 24 * 30) {
        return ++a;
      } else {
        return a;
      }
    }, 0);

    return novosClientes;
  }

  aplicarFiltro(f: any) {
    switch (f.tipo) {
      case 'email':
        this.clientes = this.clientes.filter((c) =>
          c.email.toLowerCase().includes(f.valor.toLowerCase()),
        );
        break;
      case 'cpf':
        this.clientes = this.clientes.filter((c) => c.cpf == f.valor);
        break;
      case 'nome':
        this.clientes = this.clientes.filter((c) =>
          c.nome.toLowerCase().includes(f.valor.toLowerCase()),
        );
        break;
      case '':
        this.relistarClientes();
        break;
      default:
        break;
    }
  }

  onDelete(cliente: Cliente) {
    const descliente = this.clientes.filter((c) => c.cpf === cliente.cpf)[0];
    const r = prompt(
      "Para deletar um cliente você precisa escrever 'deletar' na caixa abaixo\n(Essa ação não poderá ser desfeita)",
    );
    if (r?.toLowerCase() === 'deletar') {
      this.clienteService.deletar(descliente.cpf).subscribe(() => {
        alert(`O cliente ${descliente.nome} foi deletado com sucesso`);
        this.relistarClientes();
      });
    } else {
      alert('erro, o cliente não foi deletado');
    }
  }

  onEdit(cliente: Cliente) {
    this.router.navigate([cliente.cpf], { relativeTo: this.activeRoute });
  }
}
