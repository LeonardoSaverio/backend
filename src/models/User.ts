import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import bcrypt from 'bcryptjs';
import { IsEmail, IsPhoneNumber, Length } from 'class-validator'

import Address from './Address';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 40, nullable: false })
  @Length(3, 40, { message: 'Nome inválido número de caracteres ultrapassados ou insuficientes.' })
  name: string;

  @Column({ length: 100, nullable: false })
  @IsEmail({}, { message: "E-mail obrigatório." })
  email: string;

  @Column({ length: 20, nullable: false })
  @IsPhoneNumber('BR', { message: 'Número de telefone inválido.' })
  phone: string;

  @Column({ nullable: false })
  @Length(8, 40, { message: 'Preencha uma senha de no minímo 8 digitos.' })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Address, address => address.user)
  address: Address;
}

export default User;