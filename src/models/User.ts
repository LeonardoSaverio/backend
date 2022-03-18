import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { IsEmail, IsString, isString, Length } from 'class-validator'

import Product from './Product';

@Entity('user')
class User {
  @PrimaryColumn()
  id: string;

  @Column({ length: 40, nullable: false })
  @IsString()
  @Length(3, 40, { message: 'Nome inválido número de caracteres ultrapassados ou insuficientes.' })
  name: string;

  @Column({ length: 100, nullable: false })
  @IsEmail({ message: "E-mail obrigatório." })
  email: string;

  @Column({ nullable: true })
  @IsString()
  photo: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Product, product => product.user)
  product: Product;
}

export default User;