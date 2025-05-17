import { ApiProperty } from '@nestjs/swagger';

export class MailResponseDto {
  @ApiProperty({ description: 'ID do usuário' })
  idUser: string;

  @ApiProperty({ description: 'Email de destino' })
  mailDestination: string;

  @ApiProperty({ description: 'Conteúdo do email' })
  mailContent: string;

  @ApiProperty({
    description: 'Tipo do email',
    enum: ['orderConfirmation', 'paymentConfirmation'],
  })
  mailType: string;
}

export class MailQueryDto {
  @ApiProperty({ description: 'ID do usuário para filtrar as notificações' })
  idUser: string;
}
