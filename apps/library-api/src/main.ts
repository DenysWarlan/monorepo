/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {HttpStatus, Logger} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
      .setTitle('Library')
      .setDescription('The library API description')
      .setVersion('1.0')
      .build();

  const document = SwaggerModule.createDocument(app, config);

  const globalPrefix = 'api';

  SwaggerModule.setup(globalPrefix, app, document);

  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3000;

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
