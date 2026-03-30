import { Component } from '@angular/core';
import { Cliente } from '../cliente';
import { ActivatedRoute, Router } from '@angular/router';

import { CardsComponent } from './cards/cards.component';
import { ClienteService } from '../services/cliente.service';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-registros',
  standalone: true,
  imports: [
    CardsComponent,
    TableModule,
    IconFieldModule,
    InputIconModule,
    ButtonDirective,
    Ripple,
    ButtonModule,
    RippleModule,
    DatePipe,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService, MessageService],
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
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
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
      return a + this.calcularIdade(cliente.dataNascimento);
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
      let registro = new Date(cliente.dataRegistro);
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
      case 'id':
        this.clientes = this.clientes.filter((c) => c.id == f.valor);
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

  onDelete(event: Event, cliente: Cliente) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Você tem certeza que quer remover este cliente?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmado',
          detail: 'Cliente excluido',
        });
        this.clienteService.deletar(cliente.id).subscribe(() => {
          this.relistarClientes();
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejeitado',
          detail: 'Operação cancelada',
        });
      },
    });
  }

  // onDelete(cliente: Cliente) {
  //   const descliente = this.clientes.filter((c) => c.id === cliente.id)[0];
  //   const r = prompt(
  //     "Para deletar um cliente você precisa escrever 'deletar' na caixa abaixo\n(Essa ação não poderá ser desfeita)",
  //   );
  //   if (r?.toLowerCase() === 'deletar') {
  //     this.clienteService.deletar(descliente.id).subscribe(() => {
  //       alert(`O cliente ${descliente.nome} foi deletado com sucesso`);
  //       this.relistarClientes();
  //     });
  //   } else {
  //     alert('erro, o cliente não foi deletado');
  //   }
  // }

  onEdit(cliente: Cliente) {
    this.router.navigate([cliente.id], { relativeTo: this.activeRoute });
  }
}
