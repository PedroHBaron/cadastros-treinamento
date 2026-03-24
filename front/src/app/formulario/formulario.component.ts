import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../cliente';
import { BotaoComponent } from '../utils/botao/botao.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { ClienteAtualizar } from '../clienteAtualizar';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule, BotaoComponent],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponent {
  clientes: Cliente[] = [];
  cliente = new Cliente('', '', '', '', 0, '', false);

  cpf = '';

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private clienteService: ClienteService,
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((urlParams) => {
      this.cpf = urlParams['cpf'];

      if (this.cpf !== 'new') {
        this.clienteService
          .listarUnico(this.cpf)
          .subscribe((cliente: Cliente) => {
            this.cliente = cliente;
          });
      }
    });
  }

  cadastrar() {
    if (this.cpf === 'new') {
      this.clienteService.cadastrar(this.cliente).subscribe({
        next: (res) => {
          alert('Novo cliente cadastrado!');
          this.voltar();
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
        this.cliente.nome,
        this.cliente.data_nascimento,
        this.cliente.email,
        this.cliente.telefone,
        this.cliente.profissao,
        this.cliente.termos,
      );

      this.clienteService.atualizar(novosDados, this.cpf).subscribe({
        next: (res) => {
          alert('Cliente editado com sucesso!');
          this.voltar();
        },
        error: (err) => {
          alert('Não foi possível realizar a edição!');
          console.log(err);
          return;
        },
      });
    }
  }

  voltar() {
    this.router.navigate(['../'], { relativeTo: this.activeRoute });
  }
}
