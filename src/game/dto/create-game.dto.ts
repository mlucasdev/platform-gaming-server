import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nome do Jogo.',
    example: 'Fifa 2022',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty({
    description: 'Url da imagem da capa do jogo.',
    example:
      'https://image.api.playstation.com/vulcan/img/rnd/202111/0822/syCdM5vjxZqsHgHDdT3XZUcF.jpg',
  })
  coverImageUrl: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  @ApiProperty({
    description: 'Descrição para o jogo.',
    example:
      'FIFA 22 é um jogo eletrônico de simulação de futebol desenvolvido e publicado pela Electronic Arts. O jogo foi anunciado no dia 11 de julho de 2021 e lançado no dia 1 de outubro de 2021 para PlayStation 5, Xbox Series X/S, Google Stadia, Microsoft Windows, PlayStation 4, Xbox One e PC. ',
  })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Ano de lançamento do jogo.',
    example: '2022',
  })
  year: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Nota do IMDb para o jogo.',
    example: 5,
  })
  imdbScore: number;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty({
    description: 'Url do trailer do jogo.',
    example: 'https://www.youtube.com/watch?v=vLj-27T-SEQ',
  })
  trailerYoutubeUrl: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty({
    description: 'Url de uma game play do jogo.',
    example: 'https://www.youtube.com/watch?v=OXCULaCzB0E',
  })
  gameplayYoutubeUrl: string;
}
