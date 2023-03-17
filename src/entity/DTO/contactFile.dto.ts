import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export default class ContactFileDto {
  fileName: string;
  content: Buffer;
  mimetype: string;
  size: number;
  status: string;
}
