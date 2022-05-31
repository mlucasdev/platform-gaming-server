import {
  HttpException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenderDto } from './dto/create-genre.dto';
import { UpdateGenderDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateGenderDto): Promise<Genre> {
    const data: Genre = { ...dto };
    return this.prisma.genres.create({ data }).catch(this.handleError);
  }

  async findAll(): Promise<Genre[]> {
    const genders = await this.prisma.genres.findMany();
    if (genders.length == 0) {
      throw new NotFoundException(`Nada foi encontrado.`);
    }
    return genders;
  }

  findOne(id: string): Promise<Genre> {
    return this.findById(id);
  }

  async update(id: string, dto: UpdateGenderDto): Promise<Genre> {
    await this.findById(id);
    const data: Partial<Genre> = { ...dto };
    return this.prisma.genres
      .update({ where: { id }, data })
      .catch(this.handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.genres.delete({ where: { id } });
    throw new HttpException('', 204);
  }

  async findById(id: string): Promise<Genre> {
    const record = await this.prisma.genres.findUnique({ where: { id } });
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
