import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteAtualizar } from '../clienteAtualizar';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlClientes = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Cliente[]>(this.urlClientes);
  }

  listarUnico(cpf: string) {
    return this.http.get<Cliente>(`${this.urlClientes}/buscarporcpf/${cpf}`);
  }

  cadastrar(dados: Cliente) {
    return this.http.post<Cliente>(this.urlClientes, dados);
  }

  atualizar(dados: ClienteAtualizar, cpf: string) {
    return this.http.put<ClienteAtualizar>(this.urlClientes + '/' + cpf, dados);
  }

  deletar(cpf: string) {
    return this.http.delete<Cliente>(`${this.urlClientes}/${cpf}`);
  }
}
