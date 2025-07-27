import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'benji',
      password: 'pass123',
      database: 'mydb',
      autoLoadEntities: true,
      synchronize: true, // Remove when going production mode
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
