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
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';

@ApiTags('profile')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo Perfil.',
  })
  create(@LoggedUser() user: User, @Body() dto: CreateProfileDto) {
    return this.profilesService.create(user.id, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Buscar todos os Perfis.',
  })
  findAll(@LoggedUser() user: User) {
    return this.profilesService.findAll(user.id);
  }

  @Get(':profileId')
  @ApiOperation({
    summary: 'Buscar um Perfil pelo ID.',
  })
  findOne(@Param('profileId') profileId: string, @LoggedUser() user: User) {
    return this.profilesService.findOne(profileId, user.id);
  }

  // @Patch(':profileId')
  // @ApiOperation({
  //   summary: 'Editar um Perfil pelo ID.',
  // })
  // update(
  //   @Param('profileId') profileId: string,
  //   @LoggedUser() user: User,
  //   @Body() dto: UpdateProfileDto,
  // ) {
  //   return this.profilesService.update(profileId, user.id, dto);
  // }

  // @Delete(':id')
  // @ApiOperation({
  //   summary: 'Deletar um Perfil pelo ID.',
  // })
  // delete(@Param('id') id: string): Promise<void> {
  //   return this.profilesService.delete(id);
  // }
}
