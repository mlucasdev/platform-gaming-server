import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateProfileDto): Promise<Profile> {
    const data: Profile = { ...dto };
    return this.prisma.profiles.create({ data }).catch(handleError);
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

  async update(id: string, dto: UpdateProfileDto): Promise<Profile> {
    await this.findById(id);
    const data: Partial<Profile> = { ...dto };
    return this.prisma.profiles
      .update({
        where: { id },
        data,
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
