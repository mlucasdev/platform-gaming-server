import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async homePage(profileId: string, userId: string) {
    await this.findById(profileId, userId);
    const allGamesProfile = await this.prisma.profiles.findUnique({
      where: { id: profileId },
      select: {
        games: {
          select: {
            favorite: true,
            game: {
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
            },
          },
        },
      },
    });

    const genres = await this.prisma.genres.findMany({
      select: {
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

    const favoritesGames = allGamesProfile.games.filter(
      (game) => game.favorite == true,
    );

    return [{ favoritesGames }, { allGamesProfile }, { genres }];
  }

  async findById(profileId: string, userId: string) {
    const profileUser = await this.prisma.users.findUnique({
      where: { id: userId },
      select: {
        profile: {
          where: {
            id: profileId,
          },
        },
      },
    });

    if (profileUser.profile.length === 0) {
      throw new UnauthorizedException(
        `Perfil com ID ${profileId} não encontrado na sua conta.`,
      );
    }
  }
}
