import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const record = await this.prisma.games.findUnique({
      where: { id },
      include: {
        genres: {
          select: {
            genre: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }
    return record;
  }

  imdbScoreVerify(dto: CreateGameDto | UpdateGameDto): void {
    if (dto.imdbScore < 0 || dto.imdbScore > 5) {
      throw new BadRequestException(`IMDB Score deve ser entre 0 e 5.`);
    }
  }

  create(dto: CreateGameDto) {
    this.imdbScoreVerify(dto);

    const data: Prisma.GamesCreateInput = {
      ...dto,
      genres: {
        createMany: {
          data: dto.genres.map((genreId) => ({ genreId: genreId })),
        },
      },
    };

    return this.prisma.games
      .create({
        data,
        include: {
          genres: {
            select: {
              genre: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      })
      .catch(handleError);
  }

  async findAll() {
    const games = await this.prisma.games.findMany({
      select: {
        id: true,
        title: true,
        coverImageUrl: true,
        genres: {
          select: {
            genre: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    if (games.length == 0) {
      throw new NotFoundException(`Nada foi encontrado.`);
    }
    return games;
  }

  findOne(id: string) {
    return this.findById(id);
  }

  async update(id: string, dto: UpdateGameDto) {
    await this.findById(id);
    this.imdbScoreVerify(dto);

    const data: Partial<Prisma.GamesUpdateInput> = {
      ...dto,
      genres: {
        createMany: {
          data: dto.genres.map((genreId) => ({ genreId: genreId })),
        },
      },
    };

    return this.prisma.games
      .update({
        where: { id },
        data,
        include: {
          genres: {
            select: {
              genre: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.games.delete({ where: { id } });
    throw new HttpException('', 204);
  }
}
