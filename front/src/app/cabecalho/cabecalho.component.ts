import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [ButtonModule, RippleModule],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css',
})
export class CabecalhoComponent {
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {}

  registrarCliente() {
    this.router.navigate(['cliente', 'new']);
  }

  ola() {
    alert('ola');
  }
}
