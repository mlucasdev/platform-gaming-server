import {
  HttpException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateUserDto): Promise<User> {
    const data: User = { ...dto };
    return this.prisma.users.create({ data }).catch(this.handleError);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.users.findMany();
    if (users.length == 0) {
      throw new NotFoundException(`Nada foi encontrado.`);
    }
    return users;
  }

  findOne(id: string): Promise<User> {
    return this.findById(id);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findById(id);
    const data: Partial<User> = { ...dto };
    return this.prisma.users
      .update({ where: { id }, data })
      .catch(this.handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.users.delete({ where: { id } });
    throw new HttpException('', 204);
  }

  async findById(id: string): Promise<User> {
    const record = await this.prisma.users.findUnique({ where: { id } });
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