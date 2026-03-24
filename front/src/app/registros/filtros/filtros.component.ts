import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BotaoComponent } from '../../utils/botao/botao.component';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [FormsModule, BotaoComponent],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css',
})
export class FiltrosComponent {
  nome = '';
  email = '';
  cpf = '';

  filtro = output<{ tipo: 'email' | 'cpf' | 'nome' | ''; valor: string }>();

  filtrar() {
    if (!this.nome && !this.cpf && !this.email) {
      alert('pelo menos uma das caixas precisa estar preenchida!');
      return;
    }

    if (this.email) {
      this.filtro.emit({ tipo: 'email', valor: this.email });
    } else if (this.cpf) {
      this.filtro.emit({ tipo: 'cpf', valor: this.cpf });
    } else {
      this.filtro.emit({ tipo: 'nome', valor: this.nome });
    }

    this.nome = '';
    this.email = '';
    this.cpf = '';
  }

  limparFiltros() {
    this.filtro.emit({ tipo: '', valor: '' });
  }
}
