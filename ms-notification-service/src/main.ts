import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { exec } from 'child_process';
import { promisify } from 'util';
import { AppModule } from './app.module';

const execAsync = promisify(exec);

async function bootstrap() {
  try {
    // Executar a migração
    console.log('Running database migrations...');
    await execAsync('npx prisma migrate deploy');
    console.log('Migrations completed successfully');

    const app = await NestFactory.create(AppModule);

    // Configuração do Swagger
    const config = new DocumentBuilder()
      .setTitle('Notification Service API')
      .setDescription('API documentation for the Notification Service')
      .setVersion('1.0')
      .addTag('notifications')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:123456@rabbitmq'],
        queue: 'notification',
        noAck: false,
        queueOptions: {
          durable: true,
        },
        prefetchCount: 1,
      },
    });

    await app.startAllMicroservices();
    await app.listen(3001);
  } catch (error) {
    console.error('Error during startup:', error);
    process.exit(1);
  }
}
bootstrap();
