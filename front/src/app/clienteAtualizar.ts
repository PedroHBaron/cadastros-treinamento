export class ClienteAtualizar {
  public ultimaAtualizacao = new Date().toLocaleDateString('en-CA');

  constructor(
    public id: number,
    public nome: string,
    public readonly data_nascimento: string,
    public email: string,
    public telefone: number,
    public profissao: string,
    public readonly termos: boolean,
  ) {}
}
