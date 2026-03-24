import { Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { RegistrosComponent } from './registros/registros.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cliente',
    pathMatch: 'full',
  },
  {
    path: 'cliente',
    children: [
      {
        path: '',
        component: RegistrosComponent,
      },
      {
        path: ':cpf',
        component: FormularioComponent,
      },
    ],
  },
];
