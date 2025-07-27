import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unrecognized properties
      forbidNonWhitelisted: true, // throws if unrecognized fields are present
      transform: true, // auto-transform payloads to DTO types
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
