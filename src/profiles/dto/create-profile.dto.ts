import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUrl } from "class-validator"

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nome do Perfil.',
    example: 'Barack Obama',
  })
  title: string

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty({
    description: 'Url da imagem do perfil.',
    example: 'https://imagemdoperfil.jpg',
  })
  imageURL: string
}
