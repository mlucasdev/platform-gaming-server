import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameService } from './game.service';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo jogo.',
  })
  create(@Body() createGameDto: CreateGameDto): CreateGameDto {
    const randomId: number = Math.floor(Math.random() * (999999 - 1)) + 1;
    return this.gameService.create(randomId, createGameDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Buscar todos os jogos.',
  })
  findAll(): CreateGameDto[] {
    return this.gameService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar um jogo pelo id.',
  })
  findOne(@Param('id') id: number): CreateGameDto {
    return this.gameService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Editar um jogo pelo id.',
  })
  update(
    @Param('id') id: number,
    @Body() updateGameDto: UpdateGameDto,
  ): CreateGameDto {
    return this.gameService.update(id, updateGameDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um jogo pelo id.',
  })
  delete(@Param('id') id: number): object {
    return this.gameService.delete(id);
  }
}
