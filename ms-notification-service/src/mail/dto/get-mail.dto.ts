import { ApiProperty } from '@nestjs/swagger';

export class GetMailDto {
  @ApiProperty({
    description: 'ID do usuário para buscar os emails',
    example: 'user123',
    required: true
  })
  idUser: string;
}