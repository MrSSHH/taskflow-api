import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class DueDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dueDates: string;

  @ManyToMany(() => Task, (task) => task.dueDates)
  tasks: Task[];
}
