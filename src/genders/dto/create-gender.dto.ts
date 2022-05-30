import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenderDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nome do Gênero.',
    example: 'FPS',
  })
  name: string;
}
