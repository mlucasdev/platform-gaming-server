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
      '["4306080b-e8be-46de-a591-192dce96ff10", "c4446e0a-93a8-4af2-8c63-606833e367a7"]',
  })
  games: string[];
}
