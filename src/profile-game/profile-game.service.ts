import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProfileGameDto } from './dto/create-profile-game.dto';

@Injectable()
export class ProfileGameService {
  constructor(private readonly prisma: PrismaService) {}

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
          profile: {
            select: {
              id: true,
              title: true,
            },
          },
          favorite: true,
        },
      })
      .catch(handleError);
  }
}
