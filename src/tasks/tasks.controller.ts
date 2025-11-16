import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { PaginationDto } from 'src/common/dto/pagination-query.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(@Req() req, @Query() paginationDto: PaginationDto) {
    const refreshToken = await this.tasksService.getRefreshTokenFromReq(req);
    console.log(
      `[TasksController.findAll] Using refresh token: ${refreshToken}`,
    );
    return this.tasksService.findAll(paginationDto, refreshToken);
  }

  @Get('overdue')
  async getOverdueAmt(
    @Query() paginationDto: PaginationDto,
    @Req() req: Request,
  ) {
    const refreshToken = await this.tasksService.getRefreshTokenFromReq(req);
    console.log(
      `[TasksController.getOverdueAmt] Refresh token extracted: ${refreshToken}`,
    );
    return this.tasksService.getOverdueAmt(paginationDto, refreshToken);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    const refreshToken = await this.tasksService.getRefreshTokenFromReq(req);
    console.log(
      `[TasksController.create] Creating task for refresh token: ${refreshToken}`,
    );
    return this.tasksService.create(createTaskDto, refreshToken);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    console.log(`[TasksController.update] Updating task ID: ${id}`);
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    console.log(`[TasksController.delete] Deleting task ID: ${id}`);
    return this.tasksService.remove(id);
  }
}
