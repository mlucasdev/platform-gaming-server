import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { GameService } from './game.service';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo jogo.',
  })
  create(@Body() dto: CreateGameDto): Promise<Game> {
    return this.gameService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Buscar todos os jogos.',
  })
  findAll(): Promise<Game[]> {
    return this.gameService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar um jogo pelo id.',
  })
  findOne(@Param('id') id: string): Promise<Game> {
    return this.gameService.findOne(id);
  }

  // @Patch(':id')
  // @ApiOperation({
  //   summary: 'Editar um jogo pelo id.',
  // })
  // update(
  //   @Param('id') id: string,
  //   @Body() updateGameDto: UpdateGameDto,
  // ): Promise<Game> {
  //   return this.gameService.update(id, updateGameDto);
  // }

  // @Delete(':id')
  // @ApiOperation({
  //   summary: 'Deletar um jogo pelo id.',
  // })
  // delete(@Param('id') id: string) {
  //   this.gameService.delete(id);
  // }
}
