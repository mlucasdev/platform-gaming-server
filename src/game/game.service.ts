import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateGameDto): Promise<Game> {
    const data: Game = { ...dto };
    return this.prisma.games.create({ data });
  }

  findAll(): Promise<Game[]> {
    return this.prisma.games.findMany({});
  }

  findOne(id: string): Promise<Game> {
    return this.prisma.games.findUnique({ where: { id } });
  }

  // update(id: string, dto: UpdateGameDto): Promise<Game> {
  //   const data: Partial<Game> = { ...dto };
  //   return this.prisma.games.update({
  //     where: { id },
  //     data,
  //   });
  // }

  // async delete(id: string) {
  //   await this.prisma.games.delete({ where: { id } });
  // }
}
