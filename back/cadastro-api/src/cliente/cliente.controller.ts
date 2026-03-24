import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';
import { CriaClienteDTO } from './dto/criaCliente.dto';
import { AtualizaClienteDTO } from './dto/atualizaCliente.dto';

@Controller('clientes')
export class ClienteController {
  constructor(private clienteService: ClienteService) {}

  @Get()
  async listar() {
    const listaClientes = this.clienteService.listarClientes();
    return listaClientes;
  }

  @Get('buscarporcpf/:cpf')
  async bucarPorCPF(@Param('cpf') cpf: string) {
    return this.clienteService.clienteCPF(cpf);
  }

  @Post()
  async cadastrar(@Body() dados: CriaClienteDTO) {
    await this.clienteService.cadastrarCliente(dados);

    return { message: 'Posted!' };
  }

  @Put('/:cpf')
  async editar(@Param('cpf') cpf: string, @Body() dados: AtualizaClienteDTO) {
    await this.clienteService.editarCliente(cpf, dados);

    return { message: 'Editado' };
  }

  @Delete('/:cpf')
  async deletar(@Param('cpf') cpf: string) {
    await this.clienteService.deletarCliente(cpf);
  }
}
