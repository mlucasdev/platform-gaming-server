import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateProfileGameDto } from './dto/create-profile-game.dto';
import { ProfileGameService } from './profile-game.service';

@Controller('profile-game')
export class ProfileGameController {
  constructor(private readonly profileGameService: ProfileGameService) {}

  @Post()
  @ApiOperation({
    summary: 'Adicionar um jogo a um perfil e definir se é um jogo favorito',
  })
  create(@Body() dto: CreateProfileGameDto) {
    return this.profileGameService.create(dto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Listar todos os jogos do perfil pelo ID',
  })
  findOne(@Param('id') id: string) {
    return this.profileGameService.findOne(id);
  }
}
