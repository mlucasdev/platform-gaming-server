import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User> {
    const record = await this.prisma.users.findUnique({
      where: { id },
      select: this.userSelect,
    });
    if (!record) {
      throw new NotFoundException(`Registro com o Id '${id}' não encontrado.`);
    }
    return record;
  }

  private userSelect = {
    id: true,
    name: true,
    email: true,
    password: false,
    cpf: true,
    isAdmin: false,
  };

  confirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }
  }

  async create(dto: CreateUserDto): Promise<User> {
    this.confirmPassword(dto.password, dto.confirmPassword);

    delete dto.confirmPassword;

    const data: User = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    };
    data.isAdmin = false;

    return this.prisma.users
      .create({ data, select: this.userSelect })
      .catch(handleError);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.users.findMany({ select: this.userSelect });
    if (users.length == 0) {
      throw new NotFoundException(`Nada foi encontrado.`);
    }
    return users;
  }

  findOne(id: string): Promise<User> {
    return this.findById(id);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    if (dto.password) {
      this.confirmPassword(dto.password, dto.confirmPassword);
    }
    delete dto.confirmPassword;

    await this.findById(id);
    const data: Partial<User> = { ...dto };

    if (data.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }
    return this.prisma.users
      .update({ where: { id }, data, select: this.userSelect })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.users.delete({ where: { id } });
    throw new HttpException('', 204);
  }
}
