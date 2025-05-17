import { ApiProperty } from '@nestjs/swagger';

export class CreateCreditCardDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: 'user123'
  })
  idUser: string;

  @ApiProperty({
    description: 'Número do pedido',
    example: 12345
  })
  orderNumber: number;

  @ApiProperty({
    description: 'Valor do pedido',
    example: 100.50
  })
  orderValue: number;
}