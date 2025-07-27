import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { PaginationDto } from 'src/common/dto/pagination-query.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DueDate } from './entities/dueDate.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(DueDate)
    private readonly dueDateRepository: Repository<DueDate>,
  ) {}

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.taskRepository.find({
      relations: ['dueDate'],
      take: limit,
      skip: offset,
    });
  }

  async create(createTaskDto: CreateTaskDto) {
    const dueDates = await Promise.all(
      createTaskDto.dueDates.map((dueDate) => this.preloadDueDates(dueDate)),
    );
    const task = this.taskRepository.create({
      ...createTaskDto,
      dueDates,
    });
    return this.taskRepository.save(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const dueDates =
      updateTaskDto.dueDates &&
      (await Promise.all(
        updateTaskDto.dueDates.map((dueDate) => this.preloadDueDates(dueDate)),
      ));
    const task = await this.taskRepository.preload({
      id: id,
      ...updateTaskDto,
      dueDates,
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

  private async preloadDueDates(dueDateStr: string): Promise<DueDate> {
    const preloadDueDate = await this.dueDateRepository.findOne({
      where: { dueDates: dueDateStr },
    });
    if (preloadDueDate) {
      return preloadDueDate;
    }
    const dueDate = this.dueDateRepository.create({ dueDates: dueDateStr });
    return this.dueDateRepository.save(dueDate);
  }
}
