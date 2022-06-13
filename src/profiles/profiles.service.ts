import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  private profileSelect = {
    id: true,
    title: true,
    imageURL: true,
    user: {
      select: {
        id: true,
        name: true,
      },
    },
  };

  async create(userId: string, dto: CreateProfileDto) {
    const data: Prisma.ProfilesCreateInput = {
      title: dto.title,
      imageURL: dto.imageURL,
      user: {
        connect: {
          id: userId,
        },
      },
    };

    return await this.prisma.profiles
      .create({
        data,
        select: this.profileSelect,
      })
      .catch(handleError);
  }

  async findAll(userId: string) {
    const profiles = await this.prisma.users.findUnique({
      where: { id: userId },
      select: {
        profile: {
          select: {
            id: true,
            title: true,
            imageURL: true,
          },
        },
      },
    });
    if (!profiles) {
      throw new NotFoundException(`Nada foi encontrado.`);
    }
    return profiles;
  }

  findOne(profileId: string, userId: string) {
    return this.findById(profileId, userId);
  }

  async update(profileId: string, userId: string, dto: UpdateProfileDto) {
    await this.findById(profileId, userId);
    const data: Partial<Prisma.ProfilesCreateInput> = {
      title: dto.title,
      imageURL: dto.imageURL,
      user: {
        connect: {
          id: userId,
        },
      },
    };
    return this.prisma.profiles
      .update({
        where: { id: profileId },
        data,
        select: this.profileSelect,
      })
      .catch(handleError);
  }

  async delete(id: string, userId: string) {
    await this.findById(id, userId);
    await this.prisma.profiles.delete({ where: { id } });
    throw new HttpException('', 204);
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

    const record = await this.prisma.profiles.findUnique({
      where: { id: profileId },
      select: {
        id: true,
        title: true,
        imageURL: true,
        user: {
          select: {
            name: true,
          },
        },
        games: {
          select: {
            game: {
              select: {
                id: true,
                title: true,
                coverImageUrl: true,
                description: true,
                year: true,
                imdbScore: true,
                trailerYouTubeUrl: true,
                gameplayYouTubeUrl: true,
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

    return record;
  }
}
