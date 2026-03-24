import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CPFValido } from '../validators/cpf.validator';
import { CPFUnico } from '../validators/cpfUnico.validator';

export class CriaClienteDTO {
  @IsString()
  @IsNotEmpty()
  @CPFValido({ message: 'CPF inválido!' })
  @CPFUnico({ message: 'CPF já cadastrado!' })
  cpf: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  data_nascimento: string;

  @IsString()
  @IsNotEmpty()
  ultimaAtualizacao: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;

  @IsString()
  @IsNotEmpty()
  profissao: string;

  @IsBoolean()
  @IsNotEmpty()
  termos: boolean;

  @IsString()
  @IsNotEmpty()
  data_registro: string;
}
