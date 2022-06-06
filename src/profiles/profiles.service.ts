import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  profileSelect = {
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

  create(dto: CreateProfileDto) {
    const data: Prisma.ProfilesCreateInput = {
      title: dto.title,
      imageURL: dto.imageURL,
      user: {
        connect: {
          id: dto.userId,
        },
      },
    };

    return this.prisma.profiles
      .create({
        data,
        select: this.profileSelect,
      })
      .catch(handleError);
  }

  async findAll(): Promise<Profile[]> {
    const profiles = await this.prisma.profiles.findMany();
    if (profiles.length == 0) {
      throw new NotFoundException(`Nada foi encontrado.`);
    }
    return profiles;
  }

  findOne(id: string): Promise<Profile> {
    return this.findById(id);
  }

  async update(id: string, dto: UpdateProfileDto) {
    await this.findById(id);
    const data: Partial<Prisma.ProfilesCreateInput> = {
      title: dto.title,
      imageURL: dto.imageURL,
      user: {
        connect: {
          id: dto.userId,
        },
      },
    };
    return this.prisma.profiles
      .update({
        where: { id },
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

  async findById(id: string): Promise<Profile> {
    const record = await this.prisma.profiles.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }
    return record;
  }
}
