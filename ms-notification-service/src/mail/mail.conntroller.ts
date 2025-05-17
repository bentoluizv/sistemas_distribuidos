import { Controller, Get, Logger, Query } from '@nestjs/common';
import {
    Ctx,
    MessagePattern,
    Payload,
    RmqContext,
} from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Mail, MailType } from '@prisma/client';
import { MailQueryDto, MailResponseDto } from './dto/mail.dto';
import { MailService } from './mail.service';
import DataMessage from './types/message';

@ApiTags('notifications')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  private readonly logger = new Logger(MailController.name);

  @ApiOperation({ summary: 'Get mail notifications by user ID' })
  @ApiQuery({ name: 'idUser', description: 'User ID to filter notifications' })
  @ApiResponse({
    status: 200,
    description: 'Returns the list of notifications for the user',
    type: [MailResponseDto],
  })
  @Get('get')
  async getMail(@Query() query: MailQueryDto): Promise<Mail[] | null> {
    return await this.mailService.getMailByIdUser({ idUser: query.idUser });
  }

  @MessagePattern('register')
  async readRegisterPayment(
    @Payload() payload: any,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      this.logger.log(`data: ${JSON.stringify(payload)}`);

      const dataMessage: DataMessage = JSON.parse(payload.data.notification);

      await this.mailService.sendMail(dataMessage, MailType.orderConfirmation);
      await this.mailService.persistNotification(
        dataMessage,
        MailType.orderConfirmation,
      );

      channel.ack(originalMessage);
    } catch (ex) {
      this.logger.error(`Error processing register message: ${ex.message}`);
      channel.nack(originalMessage, false, true);
    }
  }

  @MessagePattern('confirmation')
  async readConfimationPayment(
    @Payload() payload: any,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      const dataMessage: DataMessage = JSON.parse(payload.data.notification);

      await this.mailService.sendMail(
        dataMessage,
        MailType.paymentConfirmation,
      );
      await this.mailService.persistNotification(
        dataMessage,
        MailType.paymentConfirmation,
      );

      channel.ack(originalMessage);
    } catch (ex) {
      this.logger.error(`Error processing confirmation message: ${ex.message}`);
      channel.nack(originalMessage, false, true);
    }
  }
}
