import { Controller, Get } from '@nestjs/common';

@Controller('game')
export class GameController {
  @Get()
  findAll() {
    return 'Buscar todos os jogos.';
  }
}
