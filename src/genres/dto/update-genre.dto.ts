import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateGenreDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nome do Gênero.',
    example: 'FPS',
  })
  name?: string;
}
