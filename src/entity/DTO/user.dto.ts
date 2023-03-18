import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class RegisterUserDto {
  name: string;
  email: string;
  password: string;

}