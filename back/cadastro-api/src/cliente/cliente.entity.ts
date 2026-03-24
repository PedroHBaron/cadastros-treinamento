import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'clientes' })
export class Cliente {
  @PrimaryColumn()
  cpf: string;

  @Column({ name: 'nome', length: 60, nullable: false })
  nome: string;

  @Column({ name: 'data_nascimento', nullable: false, type: 'date' })
  data_nascimento: string;

  @Column({ name: 'email', nullable: false, length: 60 })
  email: string;

  @Column({ name: 'telefone', length: 20, nullable: false })
  telefone: string;

  @Column({ name: 'profissao', length: 50, nullable: false })
  profissao: string;

  @Column({ name: 'termos', nullable: false })
  termos: boolean;

  @CreateDateColumn({ name: 'data_registro', type: 'date' })
  data_registro: string;

  @UpdateDateColumn({ name: 'ultima_atualizacao', type: 'date' })
  ultimaAtualizacao: string;
}
