import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateGameDto): Promise<Game> {
    this.imdbScoreVerify(dto);
    const data: Game = { ...dto };
    return this.prisma.games.create({ data }).catch(handleError);
  }

  async findAll(): Promise<Game[]> {
    const games = await this.prisma.games.findMany();
    if (games.length == 0) {
      throw new NotFoundException(`Nada foi encontrado.`);
    }
    return games;
  }

  findOne(id: string): Promise<Game> {
    return this.findById(id);
  }

  async update(id: string, dto: UpdateGameDto): Promise<Game> {
    await this.findById(id);
    this.imdbScoreVerify(dto);
    const data: Partial<Game> = { ...dto };
    return this.prisma.games
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.games.delete({ where: { id } });
    throw new HttpException('', 204);
  }

  async findById(id: string): Promise<Game> {
    const record = await this.prisma.games.findUnique({ where: { id } });
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
}
