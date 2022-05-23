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
  title: string;

  @IsNotEmpty()
  @IsString()
  coverImageUrl: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  year: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  imdbScore: number;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  trailerYoutubeUrl: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  gameplayYoutubeUrl: string;
}
