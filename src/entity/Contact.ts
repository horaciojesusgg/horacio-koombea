import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  address: string;

  @Column()
  creditCardNumber: string;

  @Column()
  creditCardNetwork: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
