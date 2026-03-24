import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CPFValido } from '../validators/cpf.validator';
import { CPFUnico } from '../validators/cpfUnico.validator';

export class AtualizaClienteDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  data_nascimento: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  ultimaAtualizacao: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  telefone: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  profissao: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  termos: boolean;
}
