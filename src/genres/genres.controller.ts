import {
  Body, Controller, Delete, Get, Param, Patch, Post, UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';
import { GenreService } from './genres.service';

@ApiTags('genre')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('genres')
export class GendersController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo Gênero.',
  })
  create(@Body() dto: CreateGenreDto): Promise<Genre> {
    return this.genreService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Buscar todos os Gêneros.',
  })
  findAll(): Promise<Genre[]> {
    return this.genreService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar um Gênero pelo ID.',
  })
  findOne(@Param('id') id: string): Promise<Genre> {
    return this.genreService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um Gênero pelo ID.',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateGenreDto,
  ): Promise<Genre> {
    return this.genreService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um Gênero pelo ID.',
  })
  delete(@Param('id') id: string) {
    return this.genreService.delete(id);
  }
}
