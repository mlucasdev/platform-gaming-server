import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProfileGameDto } from './dto/create-profile-game.dto';
import { ProfileGameService } from './profile-game.service';

@ApiTags('profile-game')
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

  @Get('homepage/:id')
  @ApiOperation({
    summary: 'Buscar todos os jogos favoritos do Perfil pelo ID',
  })
  homePage(@Param('id') id: string) {
    return this.profileGameService.homePage(id);
  }
}
