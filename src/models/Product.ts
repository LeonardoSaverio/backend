import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne } from 'typeorm';
import { IsBoolean, IsDecimal, isDecimal, IsNumber, IsPhoneNumber } from 'class-validator';

import User from './User';
import Address from './Address';

@Entity('product')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120, nullable: false })
  name: string;

  @Column({ length: 60, nullable: false })
  brand: string;

  @Column({ length: 60, nullable: false })
  type: string;

  @Column({ nullable: false, type: 'numeric' })
  price: number

  @Column({ nullable: true })
  description: string

  @Column({ length: 20, nullable: false })
  @IsPhoneNumber('BR', { message: 'Número de telefone inválido.' })
  phone: string;

  @Column("varchar", { array: true })
  images: string[];

  @Column("boolean", { default: false })
  @IsBoolean({ message: 'Insira um valor booleano em status' })
  status: boolean

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Address, address => address.product)
  address: Address;

  @ManyToOne(() => User, user => user.product, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

}

export default Product;