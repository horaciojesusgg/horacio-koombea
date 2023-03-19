import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Contact } from './Contact'
import { User } from './User';
@Entity()
export class ContactFile {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  fileName: string;

  @Column('bytea')
  content: Buffer;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @Column()
  status: string;

  @Column({nullable: true})
  errors: string;

  @ManyToOne(() => User, user => user.contactFiles)
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
