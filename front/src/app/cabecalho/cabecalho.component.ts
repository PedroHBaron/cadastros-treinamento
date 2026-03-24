import { Component, signal } from '@angular/core';
import { BotaoComponent } from "../utils/botao/botao.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [BotaoComponent],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent {

  constructor(private router: Router, private activeRoute: ActivatedRoute) {

  }

  registrarCliente() {
    this.router.navigate(['cliente', 'new']);
  }

  ola() {
    alert("ola");
  }
}
