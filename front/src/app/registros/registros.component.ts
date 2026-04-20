import { Component } from '@angular/core';
import { Cliente } from '../entities/cliente';
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
import { Card } from '../entities/card';

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

  totalCliente = 0;
  totalClienteCard = 0;
  novosClientes = 0;
  idadeMedia = 0;

  page = 0;
  size = 2;
  params: any = {};

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.relistarClientes(this.params);
    this.relistarCards();
  }

  relistarClientes(params: any) {
    this.clienteService
      .listar(this.page, this.size, params)
      .subscribe((res: any) => {
        this.clientes = res.content;
        this.params = {};
        this.totalCliente = res.totalElements;
      });
  }

  relistarCards() {
    this.clienteService.gerarCards().subscribe((cards: Card) => {
      this.totalClienteCard = cards.totalClientes;
      this.idadeMedia = Number(cards.idadeMedia.toFixed(2));
      this.novosClientes = cards.novosClientes;
    });
  }

  onPageChange(event: any) {
    this.page = event.first / event.rows;
    this.size = event.rows;

    if (event.filters) {
      Object.keys(event.filters).forEach((campo) => {
        const filtro = event.filters[campo];

        if (!filtro?.value) return;

        if (campo === 'dataRegistro') {
          const data = filtro.value;
          this.params[campo] = data.toISOString().split('T')[0];
        } else {
          this.params[campo] = filtro.value;
        }
      });
    }

    if (event.sortField) {
      const direction = event.sortOrder === 1 ? 'asc' : 'desc';
      this.params.sort = `${event.sortField},${direction}`;
    }

    this.relistarClientes(this.params);
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
          this.relistarClientes(this.params);
          this.relistarCards();
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

  onEdit(cliente: Cliente) {
    this.router.navigate([cliente.id], { relativeTo: this.activeRoute });
  }
}
