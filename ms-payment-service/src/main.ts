import { NestFactory } from '@nestjs/core';
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

    await app.startAllMicroservices();
    const config = new DocumentBuilder()
      .setTitle('Payment example')
      .setDescription('The payment API description')
      .setVersion('1.0')
      .addTag('payment')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
    await app.listen(3000);
  } catch (error) {
    console.error('Error during startup:', error);
    process.exit(1);
  }
}
bootstrap();
