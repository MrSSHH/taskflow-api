import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { DueDate } from './entities/dueDate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, DueDate])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
