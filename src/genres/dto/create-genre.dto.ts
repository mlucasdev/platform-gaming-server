import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateGenreDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nome do Gênero.',
    example: 'FPS',
  })
  name: string;

  @IsUUID(undefined, { each: true })
  @ApiProperty({
    description: 'Lista com os IDs dos jogos.',
    example:
      '["4166e304-5d5f-446a-aec9-98b9879f9800", "77d8a231-35cc-454b-a2ab-61afefb699d5"]',
  })
  games: string[];
}
