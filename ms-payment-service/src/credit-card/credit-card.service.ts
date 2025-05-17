import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreditCard, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CreditCardService {
  private readonly logger = new Logger(CreditCardService.name);

  constructor(
    private prisma: PrismaService,
    @Inject('NOTIFICATION_SERVICE') private client: ClientProxy,
  ) {}

  async create(data: Prisma.CreditCardCreateInput): Promise<CreditCard> {
    const creditCard = await this.prisma.creditCard.create({
      data: { ...data },
    });

    this.sendRegisterPaymentNotification(JSON.stringify(creditCard));

    this.processPayment(creditCard);

    return creditCard;
  }

  async processPayment(payment: CreditCard) {
    setTimeout(
      () => this.sendConfirmationPaymentNotification(JSON.stringify(payment)),
      10000,
    );
  }

  sendRegisterPaymentNotification(message: string) {
    try {
      this.client.emit('register', {
        id: randomUUID(),
        data: { notification: message },
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  sendConfirmationPaymentNotification(message: string) {
    try {
      this.client.emit('confirmation', {
        id: randomUUID(),
        data: { notification: message },
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  async sendNotification(data: any) {
    try {
      await this.client.emit('register', {
        data: {
          notification: JSON.stringify(data),
        },
      }).toPromise();

      await this.client.emit('confirmation', {
        data: {
          notification: JSON.stringify(data),
        },
      }).toPromise();
    } catch (error) {
      this.logger.error(`Error sending notification: ${error.message}`);
      throw error;
    }
  }
}
