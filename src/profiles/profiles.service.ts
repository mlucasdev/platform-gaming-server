import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
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

  findOne(id: string) {
    return this.findById(id);
  }

  async update(profileId: string, userId: string, dto: UpdateProfileDto) {
    await this.findById(profileId);
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

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.profiles.delete({ where: { id } });
    throw new HttpException('', 204);
  }

  async findById(id: string) {
    const record = await this.prisma.profiles.findUnique({
      where: { id },
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

    if (!record) {
      throw new NotFoundException(`Perfil com ID ${record} não encontrado`);
    }

    return record;
  }
}
