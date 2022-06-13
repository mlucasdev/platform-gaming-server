import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateProfileGameDto } from './dto/create-profile-game.dto';
import { ProfileGameService } from './profile-game.service';

@ApiTags('profile-game')
@UseGuards(AuthGuard())
@ApiBearerAuth()
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

  @Get('homepage/:profileId')
  @ApiOperation({
    summary: 'Buscar todos os jogos favoritos do Perfil pelo ID',
  })
  homePage(@Param('profileId') profileId: string, @LoggedUser() user: User) {
    return this.profileGameService.homePage(profileId, user.id);
  }
}
