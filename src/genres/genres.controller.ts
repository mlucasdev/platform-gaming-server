import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GendersService } from './genres.service';
import { CreateGenderDto } from './dto/create-genre.dto';
import { UpdateGenderDto } from './dto/update-genre.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Gender } from './entities/genre.entity';

@ApiTags('gender')
@Controller('genders')
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo Gênero.',
  })
  create(@Body() dto: CreateGenderDto): Promise<Gender> {
    return this.gendersService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Buscar todos os Gêneros.',
  })
  findAll(): Promise<Gender[]> {
    return this.gendersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar um Gênero pelo ID.',
  })
  findOne(@Param('id') id: string): Promise<Gender> {
    return this.gendersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um Gênero pelo ID.',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateGenderDto,
  ): Promise<Gender> {
    return this.gendersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um Gênero pelo ID.',
  })
  delete(@Param('id') id: string) {
    return this.gendersService.delete(id);
  }
}
