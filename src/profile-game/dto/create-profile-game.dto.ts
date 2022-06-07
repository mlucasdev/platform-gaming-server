import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';

export class CreateProfileGameDto {
  @IsUUID()
  @ApiProperty({
    description: 'ID do jogo que terá relação com o perfil',
    example: '2e1f48a4-ba15-44cf-b091-f0df1d57b3a7',
  })
  gameId: string;

  @IsUUID()
  @ApiProperty({
    description: 'ID do jogo que terá relação com o perfil',
    example: '929e3f1c-646d-4366-823a-709d12c53e84',
  })
  profileId: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Identificar se o jogo vai ser favoritado',
    example: false,
  })
  favorite: boolean;
}
