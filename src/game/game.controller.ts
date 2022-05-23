import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    const randomId: number = Math.floor(Math.random() * (999999 - 1)) + 1;
    return this.gameService.create(randomId, createGameDto);
  }

  @Get()
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.gameService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateGameDto: UpdateGameDto) {
    return this.gameService.update(id, updateGameDto);
  }
}
