import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nome do Usuário.',
    example: 'Cristiano Ronaldo',
  })
  name: string;

  @IsString()
  @IsEmail()
  @Length(5, 50)
  @ApiProperty({
    description: 'Email do usuário.',
    example: 'cristianoronaldo@gmail.com',
  })
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'Senha do usuário.',
    example: 'Abcd@1234',
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'A confirmação da senha deve ser igual a senha.',
    example: 'Abcd@1234',
  })
  confirmPassword: string;

  @IsString()
  @Length(11, 11)
  @ApiProperty({
    description: 'CPF do usuário.',
    example: '99312312399',
  })
  cpf: string;

  isAdmin: boolean;
}
