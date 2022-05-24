import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameService } from './game.service';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto): CreateGameDto {
    const randomId: number = Math.floor(Math.random() * (999999 - 1)) + 1;
    return this.gameService.create(randomId, createGameDto);
  }

  @Get()
  findAll(): CreateGameDto[] {
    return this.gameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): CreateGameDto {
    return this.gameService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateGameDto: UpdateGameDto,
  ): CreateGameDto {
    return this.gameService.update(id, updateGameDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): object {
    return this.gameService.delete(id);
  }
}
