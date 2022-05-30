import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from './entities/gender.entity';

@Injectable()
export class GendersService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateGenderDto): Promise<Gender> {
    const data: Gender = { ...dto };
    return this.prisma.genders.create({ data });
  }

  findAll(): Promise<Gender[]> {
    return this.prisma.genders.findMany();
  }

  findOne(id: string) {
    return `This action returns a #${id} gender`;
  }

  update(id: string, dto: UpdateGenderDto) {
    return `This action updates a #${id} gender`;
  }

  remove(id: string) {
    return `This action removes a #${id} gender`;
  }
}
