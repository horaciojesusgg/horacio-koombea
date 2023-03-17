import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
