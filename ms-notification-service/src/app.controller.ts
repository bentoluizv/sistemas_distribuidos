import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get server status' })
  @ApiResponse({ status: 200, description: 'Returns the server status' })
  @Get()
  getStatusSever(): string {
    return this.appService.getStatusSever();
  }
}
