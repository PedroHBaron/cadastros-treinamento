export class Cliente {
  public readonly dataRegistro = new Date().toLocaleDateString('en-CA');
  public ultimaAtualizacao = new Date().toLocaleDateString('en-CA');

  constructor(
    public id: number,
    public nome: string,
    public readonly cpf: string,
    public readonly dataNascimento: string,
    public email: string,
    public telefone: number,
    public profissao: string,
    public readonly termos: boolean,
  ) {}
}
