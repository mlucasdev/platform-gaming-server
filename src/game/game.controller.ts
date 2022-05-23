import { Controller, Get, Post } from '@nestjs/common';

@Controller('game')
export class GameController {
  @Post()
  create() {
    return 'Criar um novo jogo.';
  }

  @Get()
  findAll() {
    return 'Buscar todos os jogos.';
  }
}
