import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Profile } from './entities/profile.entity';

@ApiTags('profile')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo Perfil.',
  })
  create(@Body() dto: CreateProfileDto) {
    return this.profilesService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Buscar todos os Perfis.',
  })
  findAll(): Promise<Profile[]> {
    return this.profilesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar um Perfil pelo ID.',
  })
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um Perfil pelo ID.',
  })
  update(@Param('id') id: string, @Body() dto: UpdateProfileDto) {
    return this.profilesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um Perfil pelo ID.',
  })
  delete(@Param('id') id: string): Promise<void> {
    return this.profilesService.delete(id);
  }
}
