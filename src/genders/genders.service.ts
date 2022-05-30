import {
  HttpException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from './entities/gender.entity';

@Injectable()
export class GendersService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateGenderDto): Promise<Gender> {
    const data: Gender = { ...dto };
    return this.prisma.genders.create({ data }).catch(this.handleError);
  }

  async findAll(): Promise<Gender[]> {
    const genders = await this.prisma.genders.findMany();
    if (genders.length == 0) {
      throw new NotFoundException(`Nada foi encontrado.`);
    }
    return genders;
  }

  findOne(id: string): Promise<Gender> {
    return this.findById(id);
  }

  async update(id: string, dto: UpdateGenderDto): Promise<Gender> {
    await this.findById(id);
    const data: Partial<Gender> = { ...dto };
    return this.prisma.genders
      .update({ where: { id }, data })
      .catch(this.handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.genders.delete({ where: { id } });
    throw new HttpException('', 204);
  }

  async findById(id: string): Promise<Gender> {
    const record = await this.prisma.genders.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(`Registro com o Id '${id}' não encontrado.`);
    }
    return record;
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro ocorreu ao executar a operação.',
    );
  }
}
