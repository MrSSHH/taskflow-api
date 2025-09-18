import { Optional } from '@nestjs/common';
import { IsDateString, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly body: string;

  @Optional()
  @IsDateString(undefined)
  readonly dueDate: string;
}
