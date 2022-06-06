import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nome do Perfil.',
    example: 'Barack Obama',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty({
    description: 'Url da imagem do perfil.',
    example: 'https://imagemdoperfil.jpg',
  })
  imageURL: string;

  @IsUUID()
  @ApiProperty({
    description: 'ID do usuário que está criando um perfil',
    example: 'e64bc6b6-d8a9-485a-a9c8-231322de1fca',
  })
  userId: string;
}
