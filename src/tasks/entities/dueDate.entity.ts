import { Column, Entity, PrimaryGeneratedColumn  } from 'typeorm';

@Entity()
export class DueDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dueDates: string;

}
