import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteAtualizar } from '../clienteAtualizar';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlClientes = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Cliente[]>(this.urlClientes);
  }

  listarUnico(id: number) {
    return this.http.get<Cliente>(`${this.urlClientes}/buscarporid/${id}`);
  }

  cadastrar(dados: Cliente) {
    return this.http.post<Cliente>(this.urlClientes, dados);
  }

  atualizar(dados: ClienteAtualizar, id: number) {
    return this.http.put<ClienteAtualizar>(this.urlClientes + '/' + id, dados);
  }

  deletar(id: number) {
    return this.http.delete<Cliente>(`${this.urlClientes}/${id}`);
  }
}
