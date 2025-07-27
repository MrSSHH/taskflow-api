import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { DueDate } from './dueDate.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @JoinTable()
  @ManyToMany(() => DueDate, (dueDate) => dueDate.tasks)
  dueDates: DueDate[];

  @CreateDateColumn()
  createdDate: Date;
}
