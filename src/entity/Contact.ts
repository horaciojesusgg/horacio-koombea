import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './User';
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

  @ManyToOne(() => User, user => user.contacts)
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
