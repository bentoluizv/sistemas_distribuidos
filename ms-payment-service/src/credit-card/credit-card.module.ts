import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaService } from 'src/prisma.service';
import { CreditCardController } from './credit-card.controller';
import { CreditCardService } from './credit-card.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:123456@rabbitmq'],
          queue: 'notification',
          noAck: true,
          queueOptions: {
            durable: true,
          },
          prefetchCount: 1,
        },
      },
    ]),
  ],
  controllers: [CreditCardController],
  providers: [CreditCardService, PrismaService],
})
export class CreditCardModule {}
