import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nome do Usuário.',
    example: 'Nayane Sousa',
  })
  name: string;

  @IsString()
  @IsEmail()
  @Length(5, 50)
  @ApiProperty({
    description: 'Email do usuário.',
    example: 'nayane@gmail.com',
  })
  email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: 'Senha do usuário.',
    example: 'abcd1234',
  })
  password: string;

  @IsString()
  @Length(11,11)
  @ApiProperty({
    description: 'CPF do usuário.',
    example: '12312312399',
  })
  cpf: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Usuário Admin ou não.',
    example: false,
  })
  isAdmin: boolean;
}
