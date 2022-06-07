import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProfileGameDto } from './dto/create-profile-game.dto';

@Injectable()
export class ProfileGameService {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    const record = this.prisma.profiles.findUnique({
      where: { id },
      select: {
        title: true,
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

    if (!record) {
      throw new NotFoundException(`Perfil com ID ${record} não encontrado`);
    }

    return record;
  }

  create(dto: CreateProfileGameDto) {
    const data: Prisma.ProfileGameCreateInput = {
      game: {
        connect: {
          id: dto.gameId,
        },
      },
      profile: {
        connect: {
          id: dto.profileId,
        },
      },
      favorite: dto.favorite,
    };

    return this.prisma.profileGame
      .create({
        data,
        select: {
          profile: {
            select: {
              id: true,
              title: true,
            },
          },
          game: {
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
          },
          favorite: true,
        },
      })
      .catch(handleError);
  }

  findOne(id: string) {
    return this.findById(id);
  }
}
