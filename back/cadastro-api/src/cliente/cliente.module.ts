import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';
import { CPFValidator } from './validators/cpf.validator';
import { CPFUnicoValidator } from './validators/cpfUnico.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [ClienteController],
  providers: [ClienteService, CPFValidator, CPFUnicoValidator],
})
export class ClienteModule {}
