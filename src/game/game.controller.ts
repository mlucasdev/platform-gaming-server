import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @Get()
  findAll() {
    return this.gameService.findAll();
  }
}
