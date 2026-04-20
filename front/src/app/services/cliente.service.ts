import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../entities/cliente';
import { ClienteAtualizar } from '../entities/clienteAtualizar';
import { Card } from '../entities/card';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlClientes = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient) {}

  //Metódos GET ------------------------

  listar(page: number, size: number, params: any) {
    return this.http.get<Cliente[]>(
      `${this.urlClientes}?page=${page}&size=${size}`,
      { params },
    );
  }

  listarUnico(id: number) {
    return this.http.get<Cliente>(`${this.urlClientes}/buscarporid/${id}`);
  }

  gerarCards() {
    return this.http.get<Card>(`${this.urlClientes}/cards`);
  }

  //Resto ----------

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
