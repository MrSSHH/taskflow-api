import { Injectable, NotFoundException } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { PaginationDto } from 'src/common/dto/pagination-query.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getOverdueAmt(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const [tasks, totalTasks] = await this.taskRepository.findAndCount({
      where: { dueDate: LessThan(new Date().toISOString()) },
      order: { dueDate: 'ASC' },
    });
    return { Overdue: totalTasks };
  }
  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.taskRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async create(createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create({
      ...createTaskDto,
    });
    return this.taskRepository.save(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.preload({
      id: id,
      ...updateTaskDto,
    });
    if (task == undefined) {
      throw new NotFoundException(`Task #${id} not found`);
    }

    return this.taskRepository.save(task);
  }

  async remove(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }

    return this.taskRepository.remove(task);
  }
}
