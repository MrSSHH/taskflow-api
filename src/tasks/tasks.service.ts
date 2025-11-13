import { Injectable, NotFoundException } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { PaginationDto } from 'src/common/dto/pagination-query.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    private userService: UsersService,
  ) {}

  async getOverdueAmt(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const [tasks, totalTasks] = await this.taskRepository.findAndCount({
      where: { dueDate: LessThan(new Date().toISOString()) },
      order: { dueDate: 'ASC' },
    });
    return { Overdue: totalTasks };
  }
  async findAll(paginationDto: PaginationDto, refreshToken: string) {
    const user = await this.userService.findByRefreshToken(refreshToken);
    if (!user) throw new NotFoundException(`User #${refreshToken} not found`);

    const { limit = 10, offset = 0 } = paginationDto;

    return await this.taskRepository.find({
      where: { user: { id: user.id } },
      take: limit,
      skip: offset,
      relations: ['user'],
    });
  }
  async getRefreshTokenFromReq(req: Request) {
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader?.split(' ')[1];
    return refreshToken;
  }

  async create(createTaskDto: CreateTaskDto, refreshToken: string) {
    const user = await this.userService.findByRefreshToken(refreshToken);
    if (!user) throw new NotFoundException(`User #${refreshToken} not found`);

    const task = this.taskRepository.create({
      ...createTaskDto,
      user: user,
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
