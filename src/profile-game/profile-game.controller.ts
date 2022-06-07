import { Body, Controller, Post } from '@nestjs/common';
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
}
