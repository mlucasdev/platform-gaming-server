import { Controller, Get, Post } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post()
  create() {
    return this.gameService.create();
  }

  @Get()
  findAll() {
    return this.gameService.findAll();
  }
}
