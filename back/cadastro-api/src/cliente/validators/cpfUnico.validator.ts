import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ClienteService } from '../cliente.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class CPFUnicoValidator implements ValidatorConstraintInterface {
  constructor(private clienteService: ClienteService) {}

  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const cpfVerificar = await this.clienteService.verificarCPFUnico(value);

    return cpfVerificar;
  }
}

export const CPFUnico = (opcaoesDeValidacao: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcaoesDeValidacao,
      constraints: [],
      validator: CPFUnicoValidator,
    });
  };
};
