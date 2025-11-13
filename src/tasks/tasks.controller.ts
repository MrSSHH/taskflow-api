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
    return this.tasksService.findAll(paginationDto, refreshToken);
  }
  @Get('overdue')
  getOverdueAmt(@Query() paginationDto: PaginationDto) {
    return this.tasksService.getOverdueAmt(paginationDto);
  }
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    const refreshToken = await this.tasksService.getRefreshTokenFromReq(req);
    console.log(
      'Refresh token received on tasks.controller.ts <:34>:',
      refreshToken,
    );

    return this.tasksService.create(createTaskDto, refreshToken);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.tasksService.remove(id);
  }
}
