import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProfileGameDto } from './dto/create-profile-game.dto';

@Injectable()
export class ProfileGameService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProfileGameDto) {
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

    return await this.prisma.profileGame
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

  async findAllFavorites(id: string) {
    const allGamesProfile = await this.prisma.profiles.findUnique({
      where: { id },
      select: {
        games: {
          select: {
            favorite: true,
            game: true,
          },
        },
      },
    });

    const favoritesGames = allGamesProfile.games.filter(
      (element) => element.favorite == true,
    );

    return favoritesGames;
  }
}
