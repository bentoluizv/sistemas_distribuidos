/* eslint-disable @typescript-eslint/no-floating-promises */

import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

const fastifyAdapter = new FastifyAdapter();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, fastifyAdapter);
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

bootstrap();
