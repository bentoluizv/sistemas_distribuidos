import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreditCardService } from './credit-card.service';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';

@ApiTags('credit-card')
@Controller('credit-card')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @Post('send')
  @ApiOperation({ summary: 'Processar pagamento com cartão de crédito' })
  @ApiResponse({
    status: 201,
    description: 'Pagamento processado com sucesso',
    type: CreateCreditCardDto
  })
  async send(@Body() data: CreateCreditCardDto) {
    return await this.creditCardService.create(data);
  }
}
