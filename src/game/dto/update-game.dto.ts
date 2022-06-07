import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  Length,
} from 'class-validator';

export class UpdateGameDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nome do Jogo.',
    example: 'Fifa 2020',
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
  @Length(10, 1000)
  @ApiProperty({
    description: 'Descrição para o jogo.',
    example:
      'FIFA 20 é um jogo eletrônico de futebol desenvolvido e publicado pela EA Sports, lançado mundialmente em 19 de setembro de 2019. Este é o vigésimo sétimo título da série FIFA e o quarto a usar o mecanismo de jogo da Frostbite para Xbox One, PS4 e PC.',
  })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Ano de lançamento do jogo.',
    example: 2020,
  })
  year: number;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 1,
  })
  @ApiProperty({
    description: 'Nota do IMDb para o jogo.',
    example: 3,
  })
  imdbScore: number;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty({
    description: 'Url do trailer do jogo.',
    example: 'https://www.youtube.com/watch?v=vLj-27T-SEQ',
  })
  trailerYouTubeUrl: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty({
    description: 'Url de uma game play do jogo.',
    example: 'https://www.youtube.com/watch?v=OXCULaCzB0E',
  })
  gameplayYouTubeUrl: string;

  @IsUUID(undefined, { each: true })
  @ApiProperty({
    description:
      'Lista com os IDs dos gêneros para adicionar ao jogo. (Não envie um gênero que ele já tenha)',
    example:
      '["79cce380-eede-4248-a365-94a96d90c31b", "46374d2d-f3bd-4177-b4ca-20a0bd1c95d3"]',
  })
  genres: string[];
}
