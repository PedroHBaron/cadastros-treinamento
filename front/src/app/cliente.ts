export class Cliente {
  public readonly data_registro = new Date().toLocaleDateString('en-CA');
  public ultimaAtualizacao = new Date().toLocaleDateString('en-CA');

  constructor(
    public nome: string,
    public readonly cpf: string,
    public readonly data_nascimento: string,
    public email: string,
    public telefone: number,
    public profissao: string,
    public readonly termos: boolean,
  ) {}
}
