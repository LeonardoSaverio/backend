import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { IsLatitude, IsLongitude, Length } from 'class-validator';

import Product from './Product';

@Entity('address')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 2, nullable: false, type: 'char' })
  @Length(2, 2, { message: "UF inválida." })
  uf: string;

  @Column({ length: 60, nullable: false })
  @Length(2, 60, { message: 'Cidade Inválida.' })
  city: string;

  @Column({ length: 200, nullable: false })
  @Length(2, 200, { message: 'Rua Inválida.' })
  street: string;

  @Column({ nullable: false, type: 'numeric' })
  number: number;

  @Column({ nullable: false, type: 'numeric' })
  @IsLatitude({ message: 'Latitude inválida.' })
  lat: number;

  @Column({ nullable: false, type: 'numeric' })
  @IsLongitude({ message: 'Longitude inválida.' })
  long: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Product, product => product.address, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}

export default Address;