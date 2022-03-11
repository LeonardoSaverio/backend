import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsLatitude, IsLongitude, Length, IsNumber } from 'class-validator';

import User from './User';

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

  @Column({ nullable: false, type: 'numeric' })
  @IsNumber()
  number: number

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

  @OneToOne(() => User, user => user.address, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

}

export default Address;