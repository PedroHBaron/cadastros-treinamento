import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { ClienteAtualizar } from '../clienteAtualizar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    TableModule,
    FloatLabelModule,
    CalendarModule,
    CheckboxModule,
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponent {
  clientes: Cliente[] = [];
  cliente = new Cliente(0, '', '', '', '', 0, '', false);

  id = '';

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private clienteService: ClienteService,
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((urlParams) => {
      this.id = urlParams['id'];

      if (this.id !== 'new') {
        this.clienteService
          .listarUnico(parseInt(this.id))
          .subscribe((cliente: Cliente) => {
            this.cliente = cliente;
          });
      }
    });
  }

  cadastrar() {
    console.log(this.cliente);
    if (this.id === 'new') {
      this.clienteService.cadastrar(this.cliente).subscribe({
        next: (res) => {
          alert('Novo cliente cadastrado!');
          //this.voltar();
        },
        error: (err) => {
          const message = err.message;
          alert('Não foi possível realizar o cadastro. Motivo: ' + message);
          console.log(err);
          return;
        },
      });
    } else {
      const novosDados = new ClienteAtualizar(
        this.cliente.id,
        this.cliente.nome,
        this.cliente.dataNascimento,
        this.cliente.email,
        this.cliente.telefone,
        this.cliente.profissao,
        this.cliente.termos,
      );

      this.clienteService.atualizar(novosDados, Number(this.id)).subscribe({
        next: (res) => {
          alert('Cliente editado com sucesso!');
          //this.voltar();
        },
        error: (err) => {
          alert('Não foi possível realizar a edição!');
          console.log(err.message);
          return;
        },
      });
    }
  }

  voltar() {
    this.router.navigate(['../'], { relativeTo: this.activeRoute });
  }
}
