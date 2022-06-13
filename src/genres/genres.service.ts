import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateGenreDto): Promise<Genre> {
    const data: Genre = { ...dto };
    return this.prisma.genres.create({ data }).catch(handleError);
  }

  async findAll() {
    const genders = await this.prisma.genres.findMany({
      select: {
        id: true,
        name: true,
        games: {
          select: {
            game: {
              select: {
                id: true,
                title: true,
                coverImageUrl: true,
              },
            },
          },
        },
      },
    });
    if (genders.length == 0) {
      throw new NotFoundException(`Nada foi encontrado.`);
    }
    return genders;
  }

  findOne(id: string): Promise<Genre> {
    return this.findById(id);
  }

  async update(id: string, dto: UpdateGenreDto): Promise<Genre> {
    await this.findById(id);
    const data: UpdateGenreDto = { ...dto };
    return this.prisma.genres
      .update({ where: { id }, data })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.genres.delete({ where: { id } });
    throw new HttpException('', 204);
  }

  async findById(id: string): Promise<Genre> {
    const record = await this.prisma.genres.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        games: {
          select: {
            game: true,
          },
        },
      },
    });
    if (!record) {
      throw new NotFoundException(`Registro com o Id '${id}' não encontrado.`);
    }
    return record;
  }
}
