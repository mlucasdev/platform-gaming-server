import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserIsAdmin } from 'src/auth/user-is-admin.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameService } from './game.service';

@ApiTags('game')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo jogo.',
  })
  create(@UserIsAdmin() @Body() dto: CreateGameDto) {
    return this.gameService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Buscar todos os jogos.',
  })
  findAll(@UserIsAdmin() user: User) {
    return this.gameService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar um jogo pelo ID.',
  })
  findOne(@UserIsAdmin() user: User, @Param('id') id: string) {
    return this.gameService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um jogo pelo ID.',
  })
  update(
    @UserIsAdmin() user: User,
    @Param('id') id: string,
    @Body() dto: UpdateGameDto,
  ) {
    return this.gameService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um jogo pelo ID.',
  })
  delete(@UserIsAdmin() @Param('id') id: string): Promise<void> {
    return this.gameService.delete(id);
  }
}
