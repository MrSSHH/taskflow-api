import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity('Users')
@Unique(['googleId'])
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  googleId: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  picture?: string;

  @Column({ type: 'text', nullable: true })
  jwtRefreshToken: string | null;

  @OneToMany(() => Task, (task) => task.user, { cascade: true })
  tasks: Task[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
