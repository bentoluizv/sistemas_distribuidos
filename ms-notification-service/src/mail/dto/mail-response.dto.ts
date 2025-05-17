import { ApiProperty } from '@nestjs/swagger';

export class MailResponseDto {
  @ApiProperty({
    description: 'ID do email',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'ID do usuário',
    example: 'user123'
  })
  idUser: string;

  @ApiProperty({
    description: 'Email de destino',
    example: 'user@example.com'
  })
  mailDestination: string;

  @ApiProperty({
    description: 'Conteúdo do email',
    example: 'Número do pedido: 12345\nValor do pedido: 100.50'
  })
  mailContent: string;

  @ApiProperty({
    description: 'Tipo do email',
    enum: ['orderConfirmation', 'paymentConfirmation'],
    example: 'orderConfirmation'
  })
  mailType: string;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-01-01T00:00:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização',
    example: '2024-01-01T00:00:00.000Z'
  })
  updatedAt: Date;
}